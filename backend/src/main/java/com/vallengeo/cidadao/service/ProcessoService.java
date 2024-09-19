package com.vallengeo.cidadao.service;

import com.vallengeo.cidadao.enumeration.SituacaoProcessoEnum;
import com.vallengeo.cidadao.model.Processo;
import com.vallengeo.cidadao.payload.request.HistoricoAnotacaoConsideracaoTecnicaRequest;
import com.vallengeo.cidadao.payload.request.ProcessoArquivarRequest;
import com.vallengeo.cidadao.payload.response.TipoDocumentoResponse;
import com.vallengeo.cidadao.payload.response.TotalizadorProcessoResponse;
import com.vallengeo.cidadao.payload.response.UltimoProcessoResponse;
import com.vallengeo.cidadao.payload.response.cadastro.ProcessoResponse;
import com.vallengeo.cidadao.repository.ProcessoRepository;
import com.vallengeo.cidadao.repository.projection.TotalizadorProcessoProjection;
import com.vallengeo.cidadao.service.mapper.ProcessoMapper;
import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.core.util.Paginacao;
import com.vallengeo.core.util.SecurityUtils;
import com.vallengeo.portal.repository.GrupoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

import static com.vallengeo.core.helpers.DateHelpers.convertDateToLocalDateTime;
import static com.vallengeo.core.util.Constants.CAMPO_OBRIGATORIO;
import static com.vallengeo.core.util.Constants.NOT_FOUND;
import static com.vallengeo.core.util.Paginacao.montarPaginacaoPageRequest;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProcessoService {
    private final ProcessoRepository repository;
    private final GrupoRepository grupoRepository;
    private final RelProcessoSituacaoProcessoService relProcessoSituacaoProcessoService;
    private final TipoDocumentoService tipoDocumentoService;
    private final HistoricoAnotacaoConsideracaoTecnicaService historicoAnotacaoConsideracaoTecnicaService;
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
}
