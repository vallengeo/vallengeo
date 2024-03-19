package com.vallengeo.cidadao.payload.response.cadastro.imovel;

import lombok.Data;

import java.io.Serializable;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import static com.vallengeo.core.config.Config.DATE_FORMAT;
import static com.vallengeo.core.helpers.DateHelpers.convertDateToLocalDateTime;

@Data
public class CaracterizacaoImovelResponse implements Serializable {
    String setor;
    private String quadra;
    private String lote;
    private String unidade;
    private Float areaTerreno;
    private Float testadaPrincipal;
    private Float fracaoIdeal;
    private Date dataInclusao;

    public String getDataInclusaoFormatada() {
        if (this.dataInclusao != null) {
            return convertDateToLocalDateTime(this.dataInclusao).format(DateTimeFormatter.ofPattern(DATE_FORMAT));
        }
        return "-";
    }
}
