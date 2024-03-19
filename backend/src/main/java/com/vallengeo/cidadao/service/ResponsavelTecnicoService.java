package com.vallengeo.cidadao.service;

import com.vallengeo.cidadao.model.ResponsavelTecnico;
import com.vallengeo.cidadao.payload.request.ResponsavelTecnicoRequest;
import com.vallengeo.cidadao.repository.ResponsavelTecnicoRepository;
import com.vallengeo.core.util.DocumentoUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;

import static com.vallengeo.core.helpers.DateHelpers.convertDateToLocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class ResponsavelTecnicoService {
    private final ResponsavelTecnicoRepository responsavelTecnicoRepository;
    public static final String LOG_PREFIX = "[RESPONSAVEL TECNICO] - ";

    @Transactional
    public ResponsavelTecnico cadastrar(ResponsavelTecnicoRequest request) {
        log.info(LOG_PREFIX + "verifica se existe responsável técnico com cpf {}", request.cpf());
        return responsavelTecnicoRepository.findByCpf(DocumentoUtil.removeMascara(request.cpf())).orElseGet(() -> save(request));
    }

    private ResponsavelTecnico save(ResponsavelTecnicoRequest request) {
        log.info(LOG_PREFIX + "Iniciando cadastro do responsável técnico");
        return responsavelTecnicoRepository.save(
                ResponsavelTecnico.builder()
                        .cpf(DocumentoUtil.removeMascara(request.cpf()))
                        .email(request.email())
                        .dataCadastro(convertDateToLocalDateTime(new Date()))
                        .build()
        );
    }
}
