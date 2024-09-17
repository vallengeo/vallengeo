package com.vallengeo.cidadao.service;

import com.vallengeo.cidadao.model.Imovel;
import com.vallengeo.cidadao.model.Notificacao;
import com.vallengeo.cidadao.payload.response.NotificacaoNaoVisualizadaResponse;
import com.vallengeo.cidadao.repository.NotificacaoRepository;
import com.vallengeo.core.util.Paginacao;
import com.vallengeo.core.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import static com.vallengeo.core.helpers.DateHelpers.convertDateToLocalDateTime;
import static com.vallengeo.core.util.Paginacao.montarPaginacaoPageRequest;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificacaoService {
    private final NotificacaoRepository repository;

    public List<NotificacaoNaoVisualizadaResponse> buscaNotificacoesNaoVisualizadas(int pagina, int itensPorPagina, HttpServletRequest request) {
        List<NotificacaoNaoVisualizadaResponse> response = new ArrayList<>();

        Page<Notificacao> page = repository.pageNotificacaoNaoVisualizadaPorGrupoIdAndUsuarioId(SecurityUtils.extractGrupoId(request),
                Objects.requireNonNull(SecurityUtils.getUserSession()).getId(),
                montarPaginacaoPageRequest(new Paginacao.PaginacaoInput(pagina, itensPorPagina, "data_cadastro", "DESC")));

        page.getContent().forEach(notificacao -> {
            response.add(
                    NotificacaoNaoVisualizadaResponse.builder()
                            .id(notificacao.getId())
                            .idImovel(notificacao.getImovel().getId())
                            .inscricaoImobiliaria(notificacao.getImovel().getInscricaoImobiliaria())
                            .build()
            );


        });
        return response;
    }

    @Transactional
    public void cadastrar(Long imovelId) {
        repository.save(
                Notificacao.builder()
                        .dataCadastro(convertDateToLocalDateTime(new Date()))
                        .imovel(Imovel.builder().id(imovelId).build())
                        .build()
        );
    }
}
