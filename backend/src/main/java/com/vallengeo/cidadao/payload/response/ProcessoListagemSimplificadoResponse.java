package com.vallengeo.cidadao.payload.response;

import com.vallengeo.cidadao.payload.response.cadastro.imovel.InformacaoImovelResponse;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class ProcessoListagemSimplificadoResponse implements Serializable {
    private Long id;
    private String inscricaoImobiliaria;
    private FichaImovelResponse.Processo processo;
    private InformacaoImovelResponse informacaoImovel;

    public ProcessoListagemSimplificadoResponse(FichaImovelResponse ficha) {
        this.id = ficha.getId();
        this.inscricaoImobiliaria = ficha.getInscricaoImobiliaria();
        this.processo = ficha.getProcesso();
        this.informacaoImovel = ficha.getInformacaoImovel();
    }
}
