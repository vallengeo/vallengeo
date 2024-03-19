package com.vallengeo.cidadao.service;

import com.vallengeo.cidadao.enumeration.SituacaoProcessoEnum;
import com.vallengeo.cidadao.model.Processo;
import com.vallengeo.cidadao.payload.request.ProcessoDocumentoRequest;
import com.vallengeo.cidadao.payload.request.ProcessoImovelRequest;
import com.vallengeo.cidadao.payload.request.ProcessoRepresentanteRequest;
import com.vallengeo.cidadao.payload.response.cadastro.ProcessoResponse;
import com.vallengeo.cidadao.payload.response.cadastro.imovel.ImovelResponse;
import com.vallengeo.cidadao.repository.ProcessoRepository;
import com.vallengeo.cidadao.service.mapper.ProcessoMapper;
import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.core.util.SecurityUtils;
import com.vallengeo.portal.repository.GrupoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Random;
import java.util.UUID;

import static com.vallengeo.core.helpers.DateHelpers.convertDateToLocalDateTime;
import static com.vallengeo.core.util.Constants.CAMPO_OBRIGATORIO;
import static com.vallengeo.core.util.Constants.NOT_FOUND;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProcessoService {
    private final ProcessoRepository repository;
    private final GrupoRepository grupoRepository;
    private final RelProcessoResponsavelTecnicoService relProcessoResponsavelTecnicoService;
    private final RelProcessoSituacaoProcessoService relProcessoSituacaoProcessoService;
    private final DocumentoService documentoService;
    public static final String LOG_PREFIX = "[PROCESSO] - ";

    @Transactional
    public ProcessoResponse cadastrar(ProcessoRepresentanteRequest input) {
        log.info(LOG_PREFIX + "Iniciando cadastro do processo");

        Processo processo = repository.save(
                Processo.builder()
                        .grupo(grupoRepository.findById(UUID.fromString(input.getIdGrupo())).orElseThrow(() -> new ValidatorException("Grupo " + input.getIdGrupo() + NOT_FOUND, HttpStatus.NOT_FOUND)))
                        .protocolo(gerarCodigoProtocolo())
                        .dataCadastro(convertDateToLocalDateTime(new Date()))
                        .usuario(SecurityUtils.getUserSession())
                        .build()
        );

        log.info(LOG_PREFIX + "cadastro do processo realizado em memória");

        // cadastrar relação processo com RT
        relProcessoResponsavelTecnicoService.cadastrar(processo.getId(), input.getResponsaveisTecnicos());

        // cadastrar relação processo com situação do processo
        relProcessoSituacaoProcessoService.cadastrar(processo.getId(), SituacaoProcessoEnum.EM_CADASTRAMENTO);

        return montarOutput(processo);
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

        log.info(LOG_PREFIX + "cadastro do processo realizado em memória");
        return processo;
    }

    @Transactional
    public void cadastrarDocumento(ProcessoDocumentoRequest request) {
        UUID processoId = UUID.fromString(request.getIdProcesso());

        log.info(LOG_PREFIX + "Cadastro de documentos para o processo {}", processoId);
        Processo processo = repository.findById(processoId).orElseThrow(
                () -> new ValidatorException("Processo " + request.getIdProcesso() + NOT_FOUND, HttpStatus.NOT_FOUND));

        documentoService.cadastrar(request, processo);
        processo.setDataAlteracao(convertDateToLocalDateTime(new Date()));
    }

    private static String gerarCodigoProtocolo() {
        LocalDateTime dateTime = convertDateToLocalDateTime(new Date());
        Random random = new Random();
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

    private ProcessoResponse montarOutput(Processo processo) {
        return ProcessoMapper.INSTANCE.toResponse(processo);
    }
}
