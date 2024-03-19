package com.vallengeo.cidadao.payload.response.cadastro.imovel;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class ImovelResponse implements Serializable {
    private Long id;
    private List<RepresentanteResponse> representante;
    private InformacaoImovelResponse informacaoImovel;
    private CaracterizacaoImovelResponse caracterizacaoImovel;
}
