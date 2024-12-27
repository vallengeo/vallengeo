package com.vallengeo.cidadao.payload.response;

import com.vallengeo.cidadao.enumeration.SituacaoProcessoEnum;
import com.vallengeo.cidadao.repository.projection.RelatorioProjetion;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;

@Data
public class RelatorioResponse implements Serializable {
    private String protocolo;
    private String inscricaoImobiliaria;
    private LocalDate dataRegistro;
    private String situacao;
    private String situacaoCodigo;

    public String getDataRegistroFormatada() {
        return Objects.nonNull(dataRegistro) ? dataRegistro.format(DateTimeFormatter.ofPattern("dd/MM/yy")) : "-";
    }
    public String getCorSituacao(){
        return SituacaoProcessoEnum.corPorSituacao(SituacaoProcessoEnum.valueOf(this.situacaoCodigo));
    }
    public String getDescricaoSituacao(){
        return SituacaoProcessoEnum.descricaoSituacao(SituacaoProcessoEnum.valueOf(this.situacaoCodigo));
    }

    public RelatorioResponse(RelatorioProjetion projetion) {
        this.protocolo = projetion.getProtocolo();
        this.inscricaoImobiliaria = projetion.getInscricaoImobiliaria();
        this.dataRegistro = projetion.getDataRegistro();
        this.situacao = projetion.getSituacao();
        this.situacaoCodigo = projetion.getSituacaoCodigo();
    }

    public List<RelatorioResponse> responseList(List<RelatorioProjetion> projetions) {
        return projetions.stream().map(RelatorioResponse::new).toList();
    }
}
