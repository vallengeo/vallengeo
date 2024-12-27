package com.vallengeo.cidadao.payload.response;

import lombok.Data;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.util.List;

@Data
@SuperBuilder
public class ProtocoloResponse implements Serializable {
    private Long id;
    private String inscricaoImobiliaria;
    private ProcessoResponse processo;
    List<HistoricoAnotacaoConsideracaoTecnicaResponse> historicos;
}
