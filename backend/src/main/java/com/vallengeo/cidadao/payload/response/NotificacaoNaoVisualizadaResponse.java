package com.vallengeo.cidadao.payload.response;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class NotificacaoNaoVisualizadaResponse {
    private Long id;
    private Long idImovel;
    private String inscricaoImobiliaria;
    private UUID idProcesso;
}
