package com.vallengeo.cidadao.payload.response;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.vallengeo.core.util.GeometriySerializerUtil;
import lombok.Builder;
import lombok.Data;
import org.locationtech.jts.geom.Geometry;

import java.io.Serializable;

@Data
@Builder
public class GeometriaPorAquivoResponse implements Serializable {
   @JsonSerialize(using = GeometriySerializerUtil.class)
    private Geometry geometria;
 private final GeorreferenciamentoInformacoesImovelResponse informacoesImovel;
}
