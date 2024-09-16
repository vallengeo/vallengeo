package com.vallengeo.cidadao.payload.response;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.util.List;

@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class FichaImovelAnalistaResponse extends FichaImovelResponse implements Serializable {
    List<HistoricoAnotacaoConsideracaoTecnicaResponse> historicos;

}
