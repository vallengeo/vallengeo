package com.vallengeo.cidadao.service;

import com.vallengeo.cidadao.model.RelProcessoResponsavelTecnico;
import com.vallengeo.cidadao.model.embeddable.ProcessoResponsavelTecnicoId;
import com.vallengeo.cidadao.payload.request.ResponsavelTecnicoRequest;
import com.vallengeo.cidadao.repository.RelProcessoResponsavelTecnicoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class RelProcessoResponsavelTecnicoService {
    private final RelProcessoResponsavelTecnicoRepository repository;
    private final ResponsavelTecnicoService responsavelTecnicoService;

    public static final String LOG_PREFIX = "[PROCESSO RESPONSAVEL TECNICO] - ";

    @Transactional
    public void cadastrar(@NotNull UUID processoId, @Valid List<ResponsavelTecnicoRequest> responsaveisTecnicos) {
        log.info(LOG_PREFIX + "Iniciando cadastro do processo com responsável técnico");

        List<RelProcessoResponsavelTecnico> list = new ArrayList<>();

        responsaveisTecnicos.forEach(rt -> list.add(
                RelProcessoResponsavelTecnico.builder()
                        .processoResponsavelTecnico(
                                ProcessoResponsavelTecnicoId.builder()
                                        .idProcesso(processoId)
                                        .idResponsavelTecnico(responsavelTecnicoService.cadastrar(rt).getId())
                                        .build()
                        )
                        .vinculado(Boolean.FALSE)
                        .build()
        ));
        repository.saveAll(list);

        log.info(LOG_PREFIX + "cadastro do processo com responsável técnico salvo em memória.");
    }
}
