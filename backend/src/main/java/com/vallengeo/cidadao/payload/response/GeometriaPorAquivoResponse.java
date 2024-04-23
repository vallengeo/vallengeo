package com.vallengeo.cidadao.payload.response;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
public class GeometriaPorAquivoResponse implements Serializable {
 private Object geometria;
 private final GeorreferenciamentoInformacoesImovelResponse informacoesImovel;
}
