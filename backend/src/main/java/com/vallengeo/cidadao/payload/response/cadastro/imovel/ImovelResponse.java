package com.vallengeo.cidadao.payload.response.cadastro.imovel;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.vallengeo.core.util.GeometriySerializerUtil;
import lombok.Data;
import org.locationtech.jts.geom.Geometry;

import java.io.Serializable;
import java.util.List;

@Data
public class ImovelResponse implements Serializable {
    private Long id;
    @JsonSerialize(using = GeometriySerializerUtil.class)
    private Geometry geometria;
    private String inscricaoImobiliaria;
    private List<RepresentanteResponse> representantes;
    private InformacaoImovelResponse informacaoImovel;
    private CaracterizacaoImovelResponse caracterizacaoImovel;
}
