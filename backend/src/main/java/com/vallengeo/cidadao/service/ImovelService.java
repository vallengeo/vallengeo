package com.vallengeo.cidadao.service;

import com.vallengeo.cidadao.model.*;
import com.vallengeo.cidadao.payload.request.ProcessoImovelRequest;
import com.vallengeo.cidadao.payload.response.FichaImovelResponse;
import com.vallengeo.cidadao.payload.response.cadastro.ProcessoResponse;
import com.vallengeo.cidadao.payload.response.cadastro.imovel.ImovelResponse;
import com.vallengeo.cidadao.payload.response.cadastro.imovel.RepresentanteResponse;
import com.vallengeo.cidadao.repository.ImovelRepository;
import com.vallengeo.cidadao.repository.ProcessoRepository;
import com.vallengeo.cidadao.repository.RelProcessoSituacaoProcessoRepository;
import com.vallengeo.cidadao.service.mapper.ImovelMapper;
import com.vallengeo.cidadao.service.mapper.RepresentanteMapper;
import com.vallengeo.core.exceptions.custom.BadRequestException;
import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.portal.service.PessoaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import org.thymeleaf.ITemplateEngine;
import org.thymeleaf.context.Context;

import javax.transaction.Transactional;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

import static com.vallengeo.core.config.Config.APPLICATION_DEFINITIVE_UPLOAD;
import static com.vallengeo.core.util.Constants.NOT_FOUND;

@Slf4j
@Service
@RequiredArgsConstructor
public class ImovelService {
    private final ImovelRepository repository;
    private final ProcessoRepository processoRepository;
    private final RelProcessoSituacaoProcessoRepository relProcessoSituacaoProcessoRepository;
    private final ProcessoService processoService;
    private final RepresentanteService representanteService;
    private final InformacaoImovelService informacaoImovelService;
    private final CaracterizacaoImovelService caracterizacaoImovelService;
    private final PessoaService pessoaService;
    private final DocumentoService documentoService;
    private final ITemplateEngine templateEngine;

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
        return new ProcessoResponse(processo.getId(), processo.getProtocolo(), ImovelMapper.INSTANCE.toResponse(imovel));
    }

    public FichaImovelResponse fichaImovel(UUID processoId) {
        Imovel imovel = repository.findByProcessoId(processoId).orElseThrow(
                () -> new ValidatorException("Imóvel vinculado ao processo " + processoId + NOT_FOUND, HttpStatus.NOT_FOUND)
        );

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

    public ByteArrayResource fichaImovelImprimir(UUID processoId) {
        String outputFile = APPLICATION_DEFINITIVE_UPLOAD + File.separator + LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy")) + File.separator + processoId + ".pdf";
        File file = new File(outputFile);
        try {
            //   if (!file.exists()) {
            String html = parseThymeleafTemplate(processoId);

            final var definitivePath = new File(APPLICATION_DEFINITIVE_UPLOAD + File.separator + LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy")));
            log.info("Definitive Path {}", definitivePath);
            if (!definitivePath.exists() && definitivePath.mkdir()) {
                log.info("Create Definitive Path");
            }
            OutputStream outputStream = new FileOutputStream(outputFile);

//            ITextRenderer renderer = new ITextRenderer();
//            renderer.setDocumentFromString(html);
//            renderer.layout();
//            renderer.createPDF(outputStream);

            outputStream.close();

            //   }
            return new ByteArrayResource(Files.readAllBytes(Path.of(outputFile)));
        } catch (IOException e) {
            throw new BadRequestException(e.getMessage());
        }
    }

    private String parseThymeleafTemplate(UUID processoId) throws IOException {
        Locale local = new Locale("pt", "BR");
        DateTimeFormatter formato = DateTimeFormatter.ofPattern("dd 'de' MMMM 'de' yyyy", local);

        InputStream inputStream = new ClassPathResource("static/images/logo_vallengeo.png").getInputStream();
        byte[] bytes = StreamUtils.copyToByteArray(inputStream);
        String logoPlataforma = "data:image/png;base64," + Base64.getEncoder()
                .encodeToString(bytes);
//        Processo processo = processoRepository.findById(processoId).orElseThrow(
//                () -> new ValidatorException("Processo " + processoId + NOT_FOUND, HttpStatus.NOT_FOUND));

        // CONTEXT

        Context context = new Context();
       context.setVariable("basePath", "/css");
        context.setVariable("logo_plataforma", logoPlataforma);
        return templateEngine.process("ficha/main.html", context);

    }

    private String montaInscricaoImobiliaria(CaracterizacaoImovel caracterizacaoImovel) {
        return caracterizacaoImovel.getSetor()
               + "." + caracterizacaoImovel.getQuadra() +
               "." + caracterizacaoImovel.getLote() +
               "." + caracterizacaoImovel.getUnidade();
    }

    private FichaImovelResponse.Processo montaFichaProcesso(UUID processoId) {
        List<RelProcessoSituacaoProcesso> relProcessoSituacaoProcessos = relProcessoSituacaoProcessoRepository.findAllByProcessoIdAndAtivoIsTrue(processoId);
        relProcessoSituacaoProcessos.sort(Comparator.comparing(RelProcessoSituacaoProcesso::getDataAcao).reversed());

        RelProcessoSituacaoProcesso relProcessoSituacaoProcesso = relProcessoSituacaoProcessos.stream().findFirst().orElseThrow(
                () -> new ValidatorException("Processo " + processoId + NOT_FOUND, HttpStatus.NOT_FOUND)
        );

        Processo processo = relProcessoSituacaoProcesso.getProcesso();

        return FichaImovelResponse.Processo.builder()
                .id(processo.getId())
                .protocolo(processo.getProtocolo())
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
}
