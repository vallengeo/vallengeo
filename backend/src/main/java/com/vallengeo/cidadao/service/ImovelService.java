package com.vallengeo.cidadao.service;

import com.vallengeo.cidadao.model.*;
import com.vallengeo.cidadao.payload.request.ProcessoImovelRequest;
import com.vallengeo.cidadao.payload.response.*;
import com.vallengeo.cidadao.payload.response.cadastro.ProcessoResponse;
import com.vallengeo.cidadao.payload.response.cadastro.imovel.ImovelResponse;
import com.vallengeo.cidadao.payload.response.cadastro.imovel.RepresentanteResponse;
import com.vallengeo.cidadao.repository.ImovelRepository;
import com.vallengeo.cidadao.repository.RelProcessoSituacaoProcessoRepository;
import com.vallengeo.cidadao.service.mapper.ImovelMapper;
import com.vallengeo.cidadao.service.mapper.RepresentanteMapper;
import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.core.util.Paginacao;
import com.vallengeo.core.util.SecurityUtils;
import com.vallengeo.global.payload.request.wkhtml.ParamsHtmlRequest;
import com.vallengeo.global.payload.request.wkhtml.ParamsRequest;
import com.vallengeo.global.service.WkhtmlService;
import com.vallengeo.portal.service.PessoaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.geotools.geojson.geom.GeometryJSON;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.*;

import static com.vallengeo.core.util.Constants.NOT_FOUND;
import static com.vallengeo.core.util.Paginacao.montarPaginacaoPageRequest;
import static com.vallengeo.core.util.SecurityUtils.getJwtToken;

@Slf4j
@Service
@RequiredArgsConstructor
public class ImovelService {
    @Value("${server.api}")
    private String SERVER_URL;
    private final ImovelRepository repository;
    private final RelProcessoSituacaoProcessoRepository relProcessoSituacaoProcessoRepository;
    private final ProcessoService processoService;
    private final RepresentanteService representanteService;
    private final InformacaoImovelService informacaoImovelService;
    private final CaracterizacaoImovelService caracterizacaoImovelService;
    private final PessoaService pessoaService;
    private final DocumentoService documentoService;
    private final HistoricoAnotacaoConsideracaoTecnicaService historicoAnotacaoConsideracaoTecnicaService;
    private final WkhtmlService wkhtmlService;
    private final NotificacaoService notificacaoService;

    public Paginacao.PaginacaoOutput<ProcessoListagemSimplificadoResponse> buscarTodosCadastrados(String pesquisa, Paginacao.PaginacaoInput paginacaoInput, HttpServletRequest request) {
        identificarOrdenacaoPaginacao(paginacaoInput);
        Page<Imovel> page = repository.findAllByGrupoId(SecurityUtils.extractGrupoId(request), pesquisa, montarPaginacaoPageRequest(paginacaoInput));

        List<ProcessoListagemSimplificadoResponse> processos = new ArrayList<>();

        page.getContent().forEach(imovel -> {
            ImovelResponse imovelResponse = ImovelMapper.INSTANCE.toResponse(imovel);

            processos.add(
                    new ProcessoListagemSimplificadoResponse(
                            FichaImovelResponse.builder()
                                    .id(imovel.getId())
                                    .inscricaoImobiliaria(imovel.getInscricaoImobiliaria())
                                    .informacaoImovel(imovelResponse.getInformacaoImovel())
                                    .caracterizacaoImovel(imovelResponse.getCaracterizacaoImovel())
                                    .geometria(imovelResponse.getGeometria())
                                    .processo(montaFichaProcesso(imovel.getProcesso().getId()))
                                    .representantes(montaRepresentantesPeloImovel(imovel))
                                    .build()
                    )
            );
        });

        return new Paginacao.PaginacaoOutput<>(processos, page);
    }

    public List<MapaImovelResponse> buscarDadosMapaImovel(HttpServletRequest request) {
        List<MapaImovelResponse> output = new ArrayList<>();

        ImovelMapper.INSTANCE.toResponse(repository.findAllByGrupoId(SecurityUtils.extractGrupoId(request))).forEach(imovel -> {
            output.add(MapaImovelResponse
                    .builder()
                    .id(imovel.getId())
                    .inscricaoImobiliaria(imovel.getInscricaoImobiliaria())
                    .idProcesso(imovel.getProcesso().getId())
                    .informacaoImovel(imovel.getInformacaoImovel())
                    .geometria(imovel.getGeometria())
                    .build()
            );
        });


        return output;
    }

    @Transactional
    public ProcessoResponse cadastrar(ProcessoImovelRequest input) {

        Processo processo = processoService.cadastrar(input.idGrupo());

        List<Representante> representantes = representanteService.cadastrar(input.imovel().getRepresentantes());
        InformacaoImovel informacaoImovel = informacaoImovelService.cadastrar(input.imovel().getInformacaoImovel());
        CaracterizacaoImovel caracterizacaoImovel = caracterizacaoImovelService.cadastrar(input.imovel().getCaracterizacaoImovel());

        Imovel imovel = repository.save(Imovel.builder()
                .geometria(input.imovel().getGeorreferenciamento().getGeometria())
                .processo(processo)
                .representantes(representantes)
                .informacaoImovel(informacaoImovel)
                .caracterizacaoImovel(caracterizacaoImovel)
                .inscricaoImobiliaria(montaInscricaoImobiliaria(caracterizacaoImovel))
                .build());

        notificacaoService.cadastrar(imovel.getId());

        return new ProcessoResponse(processo.getId(), processo.getProtocolo(), ImovelMapper.INSTANCE.toResponse(imovel));
    }

    @Transactional
    public ProcessoResponse editar(UUID processoId, ProcessoImovelRequest input) {
        Processo processo = processoService.editar(processoId, input.idGrupo());
        Imovel imovel = buscarImovelPeloProcessoId(processoId);

        List<Representante> representantes = representanteService.cadastrar(input.imovel().getRepresentantes());
        InformacaoImovel informacaoImovel = informacaoImovelService.cadastrar(input.imovel().getInformacaoImovel());
        CaracterizacaoImovel caracterizacaoImovel = caracterizacaoImovelService.cadastrar(input.imovel().getCaracterizacaoImovel());

        imovel.setGeometria(input.imovel().getGeorreferenciamento().getGeometria());
        imovel.setRepresentantes(representantes);
        imovel.setInformacaoImovel(informacaoImovel);
        imovel.setCaracterizacaoImovel(caracterizacaoImovel);
        imovel.setInscricaoImobiliaria(montaInscricaoImobiliaria(caracterizacaoImovel));

        notificacaoService.cadastrar(imovel.getId());

        return new ProcessoResponse(processo.getId(), processo.getProtocolo(), ImovelMapper.INSTANCE.toResponse(imovel));
    }

    public ProtocoloResponse buscaProtocolo(UUID processoId) {
        Imovel imovel = buscarImovelPeloProcessoId(processoId);
        return ProtocoloResponse.builder()
                .id(imovel.getId())
                .inscricaoImobiliaria(imovel.getInscricaoImobiliaria())
                .processo(montaFichaProcesso(processoId))
                .historicos(historicoAnotacaoConsideracaoTecnicaService.historicoPorProcessoId(processoId))
                .build();
    }

    public FichaImovelResponse fichaImovel(UUID processoId) {
        Imovel imovel = buscarImovelPeloProcessoId(processoId);

        ImovelResponse imovelResponse = ImovelMapper.INSTANCE.toResponse(imovel);

        return FichaImovelResponse.builder()
                .id(imovel.getId())
                .inscricaoImobiliaria(imovel.getInscricaoImobiliaria())
                .informacaoImovel(imovelResponse.getInformacaoImovel())
                .caracterizacaoImovel(imovelResponse.getCaracterizacaoImovel())
                .geometria(imovelResponse.getGeometria())
                .processo(montaFichaProcesso(processoId))
                .representantes(montaRepresentantesPeloImovel(imovel))
                .documentosEnviados(documentoService.buscarDocumentoEnviadoPeloProcesso(processoId))
                .build();
    }

    public FichaImovelAnalistaResponse fichaImovelAnalista(UUID processoId) {
        Imovel imovel = buscarImovelPeloProcessoId(processoId);

        ImovelResponse imovelResponse = ImovelMapper.INSTANCE.toResponse(imovel);

        return FichaImovelAnalistaResponse.builder()
                .id(imovel.getId())
                .inscricaoImobiliaria(imovel.getInscricaoImobiliaria())
                .informacaoImovel(imovelResponse.getInformacaoImovel())
                .caracterizacaoImovel(imovelResponse.getCaracterizacaoImovel())
                .geometria(imovelResponse.getGeometria())
                .processo(montaFichaProcesso(processoId))
                .representantes(montaRepresentantesPeloImovel(imovel))
                .documentosEnviados(documentoService.buscarDocumentoEnviadoPeloProcesso(processoId))
                .historicos(historicoAnotacaoConsideracaoTecnicaService.historicoPorProcessoId(processoId))
                .build();

    }

    public ByteArrayResource fichaImovelImprimir(UUID processoId, HttpServletRequest request) {
        buscarImovelPeloProcessoId(processoId);
        ParamsRequest data = prepararParametrosPDF(processoId, request);
        byte[] pdfBytes = wkhtmlService.pdf(data);

        return new ByteArrayResource(pdfBytes);
    }

    public ModelAndView fichaImovelModelAndView(UUID processoId) {
        FichaImovelResponse ficha = fichaImovel(processoId);

        ModelAndView modelAndView = new ModelAndView();

        /* visao geral */
        modelAndView.addObject("protocolo", ficha.getProcesso().getProtocolo());
        modelAndView.addObject("inscricaoImobiliaria", ficha.getInscricaoImobiliaria());
        modelAndView.addObject("ultimaAtualizacao", ficha.getProcesso().getUltimaAtualizacaoFormatada());
        modelAndView.addObject("situacao", ficha.getProcesso().getSituacao());

        /* geometria */
        modelAndView.addObject("geometria", new GeometryJSON(15).toString(ficha.getGeometria()));

        /* representantes */
        modelAndView.addObject("representantes", ficha.getRepresentantes());

        /* caracterização */
        modelAndView.addObject("caracterizacaoImovel", ficha.getCaracterizacaoImovel());

        modelAndView.setViewName("ficha/main");
        return modelAndView;
    }

    private Imovel buscarImovelPeloProcessoId(UUID processoId) {
        return repository.findByProcessoId(processoId).orElseThrow(
                () -> new ValidatorException("Imóvel vinculado ao processo " + processoId + NOT_FOUND, HttpStatus.NOT_FOUND)
        );
    }

    private String montaInscricaoImobiliaria(CaracterizacaoImovel caracterizacaoImovel) {
        return caracterizacaoImovel.getSetor()
                + "." + caracterizacaoImovel.getQuadra() +
                "." + caracterizacaoImovel.getLote() +
                "." + caracterizacaoImovel.getUnidade();
    }

    private com.vallengeo.cidadao.payload.response.ProcessoResponse montaFichaProcesso(UUID processoId) {
        List<RelProcessoSituacaoProcesso> relProcessoSituacaoProcessos = relProcessoSituacaoProcessoRepository.findAllByProcessoIdAndAtivoIsTrue(processoId);
        relProcessoSituacaoProcessos.sort(Comparator.comparing(RelProcessoSituacaoProcesso::getDataAcao).reversed());

        RelProcessoSituacaoProcesso relProcessoSituacaoProcesso = relProcessoSituacaoProcessos.stream().findFirst().orElseThrow(
                () -> new ValidatorException("Processo " + processoId + NOT_FOUND, HttpStatus.NOT_FOUND)
        );

        Processo processo = relProcessoSituacaoProcesso.getProcesso();

        return com.vallengeo.cidadao.payload.response.ProcessoResponse.builder()
                .id(processo.getId())
                .protocolo(processo.getProtocolo())
                .dataCadastro(processo.getDataCadastro())
                .ultimaAtualizacao(relProcessoSituacaoProcesso.getDataAcao())
                .Situacao(relProcessoSituacaoProcesso.getSituacaoProcesso().getDescricao())
                .build();
    }

    private List<RepresentanteResponse> montaRepresentantesPeloImovel(Imovel imovel) {
        List<RepresentanteResponse> response = new ArrayList<>();
        imovel.getRepresentantes().forEach(representante -> pessoaService.buscarPorId(representante.getId()).ifPresent(pessoaResponse -> {
            RepresentanteResponse representanteResponse = RepresentanteMapper.INSTANCE.toResponse(pessoaResponse);
            representanteResponse.setContato(RepresentanteMapper.INSTANCE.toResponse(representante).getContato());
            response.add(representanteResponse);
        }));

        return response;
    }

    private ParamsRequest prepararParametrosPDF(UUID processoId, HttpServletRequest request) {
        String header = getHtmlHeader();
        String headerDir = "/tmp/header";
        String headerPath = headerDir + "/titulo.html";

        ParamsHtmlRequest paramsHtmlDTOHeader = ParamsHtmlRequest.builder()
                .html(header)
                .path(headerDir)
                .type("/titulo.html")
                .build();

        wkhtmlService.saveHtml(paramsHtmlDTOHeader);

        LinkedHashMap<String, Object> options = new LinkedHashMap<>();
        options.put("--custom-header", "Authorization Bearer " + getJwtToken(request));
        options.put("--orientation", "Portrait");
        options.put("--footer-spacing", 10);
        options.put("--header-html", headerPath);
        options.put("--cache-dir", "/tmp/");
        options.put("--run-script", "window.setInterval(function(){finalizarPdf();},70000);");

        ParamsRequest params = new ParamsRequest();
        params.setUrl(SERVER_URL + "/ficha-imobiliaria-html?id=" + processoId);
        params.setOptions(options);

        return params;

    }

    private String getHtmlHeader() {
        return "<!DOCTYPE html>" +
                "<html lang=\"en\">" +
                "<head>" +
                "    <meta charset=\"UTF-8\">" +
                "    <title>Title</title>" +
                "  <style>\n" +
                "    .header {" +
                "      width: 100%;" +
                "      height: 40px;" +
                "    }" +
                "  </style>" +
                "</head>" +
                "<body>" +
                "  <div class=\"header\">" +
                "  </div>" +
                "</body>" +
                "</html>";
    }

    private static void identificarOrdenacaoPaginacao(Paginacao.PaginacaoInput paginacaoInput) {
        String ordenacao = paginacaoInput.getOrdernarPor();
        if (Objects.isNull(ordenacao)) {
            paginacaoInput.setOrdernarPor("p.data_cadastro");
            return;
        }

        if (ordenacao.equalsIgnoreCase("data_cadastro")) {
            paginacaoInput.setOrdernarPor("p.data_cadastro");
        }

    }
}
