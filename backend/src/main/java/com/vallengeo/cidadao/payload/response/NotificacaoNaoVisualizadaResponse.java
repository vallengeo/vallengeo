package com.vallengeo.cidadao.payload.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NotificacaoNaoVisualizadaResponse {
    private Long id;
    private Long idImovel;
    private String inscricaoImobiliaria;
}
