package com.vallengeo.cidadao.service;

import com.vallengeo.cidadao.enumeration.SituacaoProcessoEnum;
import com.vallengeo.cidadao.model.Processo;
import com.vallengeo.cidadao.payload.request.*;
import com.vallengeo.cidadao.payload.response.RelatorioResponse;
import com.vallengeo.cidadao.payload.response.TipoDocumentoResponse;
import com.vallengeo.cidadao.payload.response.TotalizadorProcessoResponse;
import com.vallengeo.cidadao.payload.response.UltimoProcessoResponse;
import com.vallengeo.cidadao.payload.response.cadastro.ProcessoResponse;
import com.vallengeo.cidadao.repository.ProcessoRepository;
import com.vallengeo.cidadao.repository.projection.RelatorioProjetion;
import com.vallengeo.cidadao.repository.projection.TotalizadorProcessoProjection;
import com.vallengeo.cidadao.service.mapper.ProcessoMapper;
import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.core.util.Paginacao;
import com.vallengeo.core.util.SecurityUtils;
import com.vallengeo.global.payload.request.wkhtml.ParamsHtmlRequest;
import com.vallengeo.global.payload.request.wkhtml.ParamsRequest;
import com.vallengeo.global.service.WkhtmlService;
import com.vallengeo.portal.repository.GrupoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

import static com.vallengeo.core.helpers.DateHelpers.convertDateToLocalDateTime;
import static com.vallengeo.core.util.Constants.CAMPO_OBRIGATORIO;
import static com.vallengeo.core.util.Constants.NOT_FOUND;
import static com.vallengeo.core.util.Paginacao.montarPaginacaoPageRequest;
import static com.vallengeo.core.util.SecurityUtils.getJwtToken;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProcessoService {
    @Value("${server.url}")
    private String SERVER_URL;

    private final ProcessoRepository repository;
    private final GrupoRepository grupoRepository;
    private final RelProcessoSituacaoProcessoService relProcessoSituacaoProcessoService;
    private final TipoDocumentoService tipoDocumentoService;
    private final HistoricoAnotacaoConsideracaoTecnicaService historicoAnotacaoConsideracaoTecnicaService;
    private final WkhtmlService wkhtmlService;
    public static final String LOG_PREFIX = "[PROCESSO] - ";


    public List<Processo> buscarTodosPeloGrupoId(HttpServletRequest request) {
        return repository.findAllByGrupoIdOrderByDataCadastroDesc(SecurityUtils.extractGrupoId(request));
    }

    public Processo cadastrar(@NotBlank(message = CAMPO_OBRIGATORIO) String idGrupo) {
        log.info(LOG_PREFIX + "Iniciando cadastro do processo");

        Processo processo = repository.save(
                Processo.builder()
                        .grupo(grupoRepository.findById(UUID.fromString(idGrupo)).orElseThrow(() -> new ValidatorException("Grupo " + idGrupo + NOT_FOUND, HttpStatus.NOT_FOUND)))
                        .protocolo(gerarCodigoProtocolo())
                        .dataCadastro(convertDateToLocalDateTime(new Date()))
                        .usuario(SecurityUtils.getUserSession())
                        .build()
        );

        // cadastrar relação processo com situação do processo
        relProcessoSituacaoProcessoService.cadastrar(processo.getId(), SituacaoProcessoEnum.PENDENTE_UPLOAD_ARQUIVO);

        log.info(LOG_PREFIX + "cadastro do processo realizado em memória");
        return processo;
    }

    public Processo editar(@NotNull(message = CAMPO_OBRIGATORIO) UUID id, @NotBlank(message = CAMPO_OBRIGATORIO) String idGrupo) {
        log.info(LOG_PREFIX + "Iniciando editando do processo");

        Processo processo = repository.findByIdAndGrupoId(id, UUID.fromString(idGrupo)).orElseThrow(
                () -> new ValidatorException("Processo " + id + NOT_FOUND, HttpStatus.NOT_FOUND));

        processo.setDataAlteracao(convertDateToLocalDateTime(new Date()));

        // cadastrar relação processo com situação do processo
        relProcessoSituacaoProcessoService.alterar(processo.getId(), Collections.singletonList(SituacaoProcessoEnum.PENDENTE_UPLOAD_ARQUIVO));

        log.info(LOG_PREFIX + "edição do processo realizado em memória");
        return processo;
    }

    @Transactional
    public ProcessoResponse arquivar(ProcessoArquivarRequest input) {
        Processo processo = repository.findById(input.getIdProcesso()).orElseThrow(
                () -> new ValidatorException("Processo " + input.getIdProcesso() + NOT_FOUND, HttpStatus.NOT_FOUND));

        processo.setDataAlteracao(convertDateToLocalDateTime(new Date()));
        processo.setDataCancelamento(convertDateToLocalDateTime(new Date()));
        processo.setUsuarioCancelamento(SecurityUtils.getUserSession());

        // salvar historico consideração técnica
        historicoAnotacaoConsideracaoTecnicaService.cadastrar(montarHistoricoConsideracaoTecnica(input), processo);

        // alterar relação processo com situação do processo
        relProcessoSituacaoProcessoService.alterar(input.getIdProcesso(), Collections.singletonList(SituacaoProcessoEnum.ARQUIVADO));

        return ProcessoMapper.INSTANCE.toResponse(repository.save(processo));
    }

    public ProcessoResponse criarProtocoloObservacao(ProcessoObservacaoRequest input) {

        ProcessoArquivarRequest processoArquivarRequest = new ProcessoArquivarRequest();
        processoArquivarRequest.setIdProcesso(input.getIdProcesso());
        processoArquivarRequest.setDescricao(input.getDescricao());
        processoArquivarRequest.setTitulo(input.getTitulo());

        Processo processo = repository.findById(input.getIdProcesso()).orElseThrow(
                () -> new ValidatorException("Processo " + input.getIdProcesso() + NOT_FOUND, HttpStatus.NOT_FOUND));

        processo.setDataAlteracao(convertDateToLocalDateTime(new Date()));
        processo.setDataCancelamento(convertDateToLocalDateTime(new Date()));
        processo.setUsuarioCancelamento(SecurityUtils.getUserSession());

        // salvar historico consideração técnica
        historicoAnotacaoConsideracaoTecnicaService.cadastrar(montarHistoricoConsideracaoTecnica(processoArquivarRequest), processo);

        return ProcessoMapper.INSTANCE.toResponse(repository.save(processo));
    }

    @Transactional
    public void validacaoPosCadastrarDocumento(UUID processoId) {

        log.info(LOG_PREFIX + "Cadastro de documentos para o processo {}", processoId);
        Processo processo = repository.findById(processoId).orElseThrow(
                () -> new ValidatorException("Processo " + processoId + NOT_FOUND, HttpStatus.NOT_FOUND));

        processo.setDataAlteracao(convertDateToLocalDateTime(new Date()));
        validarEnvioDocumentosObrigatorios(processoId);
    }

    public TotalizadorProcessoResponse buscarTotalizador(HttpServletRequest request) {
        return montaTotalizador(repository.buscarTotalizadores(SecurityUtils.extractGrupoId(request)));
    }

    public List<UltimoProcessoResponse> buscarUltimosProcessosCadastrados(int pagina, int itensPorPagina, HttpServletRequest request) {
        return montarUltimosProcessos(SecurityUtils.extractGrupoId(request),
                montarPaginacaoPageRequest(new Paginacao.PaginacaoInput(pagina, itensPorPagina, "data_cadastro", "DESC"))
        );
    }

    public List<UltimoProcessoResponse> buscarUltimosProcessosAlterados(int pagina, int itensPorPagina, HttpServletRequest request) {
        return montarUltimosProcessos(SecurityUtils.extractGrupoId(request),
                montarPaginacaoPageRequest(new Paginacao.PaginacaoInput(pagina, itensPorPagina, "data_alteracao", "DESC"))
        );
    }

    public Map<FiltroRelatorioRequest, String> montaFiltroRelatorio() {
        Map<FiltroRelatorioRequest, String> filtro = new TreeMap<>(Comparator.comparing(Enum::name));
        for (FiltroRelatorioRequest enumValue : FiltroRelatorioRequest.values()) {
            filtro.put(enumValue, enumValue.descricao());
        }

        return filtro;
    }

    public ModelAndView relatorioModelAndView(String idProcesso, String idGrupo, List<Long> status, String data) {
        ModelAndView modelAndView = new ModelAndView();
        List<RelatorioResponse> relatorios = new ArrayList<>();
        repository.buscarRelatorio(UUID.fromString(idGrupo), idProcesso.isEmpty() ? null : idProcesso, status, data.isEmpty() ? null : data)
                .forEach(projetion -> relatorios.add(new RelatorioResponse(projetion)));

        modelAndView.addObject("relatorios", relatorios);
        modelAndView.setViewName("relatorio/main");
        return modelAndView;
    }

    public ByteArrayResource relatorioImprimir(RelatorioRequest input, HttpServletRequest request) {
        input.setIdGrupo(SecurityUtils.extractGrupoId(request));
        List<Long> status = new ArrayList<>();
        String data = "";

        for (FiltroRelatorioRequest filtroRelatorioRequest : input.getFiltros()) {
            status.addAll(filtroRelatorioRequest.getStatus());

            if (filtroRelatorioRequest.equals(FiltroRelatorioRequest.NOVO_IMOVEL)) {
                data = filtroRelatorioRequest.getData().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            }
        }

        ParamsRequest params = prepararParametrosPDF(input.getIdProcesso(), Objects.requireNonNull(SecurityUtils.extractGrupoId(request)).toString(), status, data, request);
        byte[] pdfBytes = wkhtmlService.pdf(params);

        return new ByteArrayResource(pdfBytes);
        // TODO: Criar metodo para salvar o arquivo no banco e no S3
    }

    private void validarEnvioDocumentosObrigatorios(UUID processoId) {
        Long qtdeNaoEnviados = tipoDocumentoService.buscarTipoDocumentoNaoEnviadoPeloProcesso(processoId).stream()
                .filter(TipoDocumentoResponse::obrigatorio)
                .count();

        if (qtdeNaoEnviados.equals(0L)) {
            relProcessoSituacaoProcessoService.alterar(processoId, Collections.singletonList(SituacaoProcessoEnum.AGUARDANDO_APROVACAO));
        }

    }

    private static String gerarCodigoProtocolo() {
        LocalDateTime dateTime = convertDateToLocalDateTime(new Date());
        Random random;
        random = new Random();
        StringBuilder codigo = new StringBuilder();
        codigo.append(dateTime.format(DateTimeFormatter.ofPattern("yyyy")));

        for (int i = 0; i < 8; i++) {
            int digito = random.nextInt(10); // Gera um número aleatório entre 0 e 9
            codigo.append(digito);
        }
        codigo.append("-");
        codigo.append(dateTime.format(DateTimeFormatter.ofPattern("MM")));
        return codigo.toString();
    }

    private HistoricoAnotacaoConsideracaoTecnicaRequest montarHistoricoConsideracaoTecnica(ProcessoArquivarRequest input) {

        return HistoricoAnotacaoConsideracaoTecnicaRequest.builder()
                .idProcesso(input.getIdProcesso())
                .titulo(input.getTitulo())
                .descricao(input.getDescricao())
                .documentos(input.getDocumentos())
                .build();

    }

    private List<UltimoProcessoResponse> montarUltimosProcessos(UUID grupoId, PageRequest pageRequest) {
        Page<Processo> page = repository.pageByGrupoId(grupoId, pageRequest);

        List<UltimoProcessoResponse> ultimoProcessoResponseList = new ArrayList<>();
        page.getContent().forEach(processo -> {
            ultimoProcessoResponseList.add(UltimoProcessoResponse.builder()
                    .id(processo.getId())
                    .protocolo(processo.getProtocolo())
                    .build());
        });

        return ultimoProcessoResponseList;
    }

    private TotalizadorProcessoResponse montaTotalizador(TotalizadorProcessoProjection projection) {
        return TotalizadorProcessoResponse.builder()
                .total(projection.getTotal())
                .novo(projection.getNovo())
                .andamento(projection.getAndamento())
                .finalizado(projection.getFinalizado())
                .build();
    }

    private ParamsRequest prepararParametrosPDF(@RequestParam(required = false) String idProcesso,
                                                @RequestParam(required = true) String idGrupo,
                                                @RequestParam(required = false) List<Long> status,
                                                @RequestParam(required = false) String data,
                                                HttpServletRequest request) {
        // Gera o cabeçalho em HTML
        String header = getHtmlHeader();
        String headerDir = "/tmp/header";
        String headerPath = headerDir + "/titulo.html";

        ParamsHtmlRequest paramsHtmlDTOHeader = ParamsHtmlRequest.builder()
                .html(header)
                .path(headerDir)
                .type("/titulo.html")
                .build();

        // Salva o HTML do cabeçalho
        wkhtmlService.saveHtml(paramsHtmlDTOHeader);

        // Configura opções do PDF
        LinkedHashMap<String, Object> options = new LinkedHashMap<>();
        options.put("--custom-header", "Authorization Bearer " + getJwtToken(request));
        options.put("--orientation", "Portrait");
        options.put("--footer-spacing", 10);
        options.put("--header-html", headerPath);
        options.put("--cache-dir", "/tmp/");
        options.put("--run-script", "window.setInterval(function(){finalizarPdf();},70000);");

        // Formata os parâmetros da URL
        String statusParam = status.stream()
                .map(String::valueOf) // Converte cada Long para String
                .collect(Collectors.joining(",")); // Junta com vírgulas

        String url = String.format(
                SERVER_URL + "/relatorio-html?idProcesso=%s&idGrupo=%s&status=%s&data=%s",
                URLEncoder.encode(Objects.isNull(idProcesso) || idProcesso.isEmpty() ? "" : idProcesso, StandardCharsets.UTF_8),
                URLEncoder.encode(Objects.isNull(idGrupo) || idGrupo.isEmpty() ? "" : idGrupo, StandardCharsets.UTF_8),
                URLEncoder.encode(statusParam, StandardCharsets.UTF_8),
                URLEncoder.encode(Objects.isNull(data) || data.isEmpty() ? "" : data, StandardCharsets.UTF_8)
        );

        // Prepara o objeto ParamsRequest
        ParamsRequest params = new ParamsRequest();
        params.setUrl(url);
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
    private String formatarNome(String nome) {
        return nome.substring(0, 1).toUpperCase() + nome.substring(1).toLowerCase().replace("_", " ");
    }


}
