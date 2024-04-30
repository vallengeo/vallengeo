package com.vallengeo.cidadao.payload.response.cadastro.imovel;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import static com.vallengeo.core.config.Config.DATE_FORMAT;

@Data
public class CaracterizacaoImovelResponse implements Serializable {
    String setor;
    private String quadra;
    private String lote;
    private String unidade;
    private Float areaTerreno;
    private Float testadaPrincipal;
    private Float fracaoIdeal;
    private LocalDate dataInclusao;

    public String getDataInclusaoFormatada() {
        if (this.dataInclusao != null) {
            return this.dataInclusao.format(DateTimeFormatter.ofPattern(DATE_FORMAT));
        }
        return "-";
    }
}
