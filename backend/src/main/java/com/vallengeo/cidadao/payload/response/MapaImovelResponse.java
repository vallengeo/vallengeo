package com.vallengeo.cidadao.payload.response;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.vallengeo.cidadao.payload.response.cadastro.imovel.InformacaoImovelResponse;
import com.vallengeo.core.util.GeometriySerializerUtil;
import lombok.Builder;
import lombok.Data;
import org.locationtech.jts.geom.Geometry;

import java.io.Serializable;
import java.util.UUID;

@Data
@Builder
public class MapaImovelResponse implements Serializable {
    private Long id;
    private String inscricaoImobiliaria;
    private UUID idProcesso;
    private InformacaoImovelResponse informacaoImovel;
    @JsonSerialize(using = GeometriySerializerUtil.class)
    private Geometry geometria;
}
