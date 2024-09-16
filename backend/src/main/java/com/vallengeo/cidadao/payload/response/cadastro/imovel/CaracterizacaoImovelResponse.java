package com.vallengeo.cidadao.payload.response.cadastro.imovel;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import static com.vallengeo.core.config.Config.DATE_FORMAT;

@Data
public class  CaracterizacaoImovelResponse implements Serializable {
    String setor;
    private String quadra;
    private String lote;
    private String unidade;
    private double areaTerreno;
    private double testadaPrincipal;
    private double fracaoIdeal;
    private LocalDate dataInclusao;

    public String getTestadaPrincipalFormatada() {
        return String.format("%.0f", this.testadaPrincipal);
    }

    public String getFracaoIdealFormatada() {
        return String.format("%.2f", this.fracaoIdeal).replace(",", ".");
    }

    public String getAreaTerrenoFormatada() {
        return String.format("%.0f", this.areaTerreno) + " m²";
    }

    public String getDataInclusaoFormatada() {
        if (this.dataInclusao != null) {
            return this.dataInclusao.format(DateTimeFormatter.ofPattern(DATE_FORMAT));
        }
        return "-";
    }
}
