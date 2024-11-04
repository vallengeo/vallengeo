package com.vallengeo.cidadao.payload.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class TotalizadorProcessoResponse {
    private int total;
    private int novo;
    private int andamento;
    private int finalizado;
}
