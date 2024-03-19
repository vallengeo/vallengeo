package com.vallengeo.cidadao.service;

import com.vallengeo.cidadao.enumeration.SituacaoProcessoEnum;
import com.vallengeo.cidadao.model.RelProcessoSituacaoProcesso;
import com.vallengeo.cidadao.model.embeddable.ProcessoSituacaoId;
import com.vallengeo.cidadao.repository.RelProcessoSituacaoProcessoRepository;
import com.vallengeo.cidadao.repository.SituacaoProcessoRepository;
import com.vallengeo.core.exceptions.custom.ValidatorException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import static com.vallengeo.core.helpers.DateHelpers.convertDateToLocalDateTime;
import static com.vallengeo.core.util.Constants.NOT_FOUND;

@Slf4j
@Service
@RequiredArgsConstructor
public class RelProcessoSituacaoProcessoService {
    private final RelProcessoSituacaoProcessoRepository repository;
    private final SituacaoProcessoRepository situacaoProcessoRepository;
    public static final String LOG_PREFIX = "[PROCESSO SITUACAO PROCESSO] - ";

    public void cadastrar(@NotNull UUID processoId, SituacaoProcessoEnum situacaoProcessoId) {
        log.info(LOG_PREFIX + "Iniciando cadastro do processo com situação");

        repository.save(
                RelProcessoSituacaoProcesso.builder()
                        .processoSituacao(
                                ProcessoSituacaoId.builder()
                                        .idProcesso(processoId)
                                        .idSituacaoProcesso(
                                                situacaoProcessoRepository.findById(situacaoProcessoId.getCodigo())
                                                        .orElseThrow(() -> new ValidatorException("Situação: " + situacaoProcessoId.name() + NOT_FOUND))
                                                        .getId()
                                        ).build()
                        )
                        .dataAcao(convertDateToLocalDateTime(new Date()))
                        .ativo(Boolean.TRUE)
                        .build()
        );

    }

    public void alterar(@NotNull UUID processoId, List<SituacaoProcessoEnum> idsSituacaoProcesso) {
        log.info(LOG_PREFIX + "Iniciando alteração do processo com situação");

// inativa
        List<RelProcessoSituacaoProcesso> list = new ArrayList<>(
                repository.findAllByProcessoIdAndAtivoIsTrue(processoId).stream().map(rel ->
                        RelProcessoSituacaoProcesso.builder()
                                .processoSituacao(rel.getProcessoSituacao())
                                .dataAcao(rel.getDataAcao())
                                .ativo(Boolean.FALSE)
                                .build()).toList());

// insere nova
        list.addAll(idsSituacaoProcesso.stream().map(sp ->
                RelProcessoSituacaoProcesso.builder()
                        .processoSituacao(
                                ProcessoSituacaoId.builder()
                                        .idProcesso(processoId)
                                        .idSituacaoProcesso(
                                                situacaoProcessoRepository.findById(sp.getCodigo())
                                                        .orElseThrow(() -> new ValidatorException("Situação: " + sp.name() + NOT_FOUND))
                                                        .getId()
                                        ).build()
                        )
                        .dataAcao(convertDateToLocalDateTime(new Date()))
                        .ativo(Boolean.TRUE)
                        .build()).toList());

        repository.saveAll(list);
    }
}
