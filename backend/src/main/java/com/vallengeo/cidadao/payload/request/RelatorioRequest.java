package com.vallengeo.cidadao.payload.request;

import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
public class RelatorioRequest implements Serializable {
    private String idProcesso;
    private UUID idGrupo;
    private List<FiltroRelatorioRequest> filtros = new ArrayList<>();
}

