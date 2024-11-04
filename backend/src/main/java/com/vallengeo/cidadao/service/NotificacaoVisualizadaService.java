package com.vallengeo.cidadao.service;

import com.vallengeo.cidadao.model.Notificacao;
import com.vallengeo.cidadao.model.NotificacaoVisualizada;
import com.vallengeo.cidadao.repository.NotificacaoRepository;
import com.vallengeo.cidadao.repository.NotificacaoVisualizadaRepository;
import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.core.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.Objects;

import static com.vallengeo.core.helpers.DateHelpers.convertDateToLocalDateTime;
import static com.vallengeo.core.util.Constants.NOT_FOUND;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificacaoVisualizadaService {
    private final NotificacaoVisualizadaRepository repository;
    private final NotificacaoRepository notificacaoRepository;

    @Transactional
    public void cadastrar(Long notificacaoId) {
        NotificacaoVisualizada notificacaoVisualizada = NotificacaoVisualizada.builder()
                .notificacao(notificacaoRepository.findById(notificacaoId).orElseThrow(() -> new ValidatorException("Notificação " + notificacaoId + NOT_FOUND, HttpStatus.NOT_FOUND)))
                .usuario(SecurityUtils.getUserSession())
                .dataVisualizacao(convertDateToLocalDateTime(new Date()))
                .build();

        repository.save(notificacaoVisualizada);
    }
}
