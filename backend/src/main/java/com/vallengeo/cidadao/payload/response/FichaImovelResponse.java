package com.vallengeo.cidadao.payload.response;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.vallengeo.cidadao.payload.response.cadastro.imovel.CaracterizacaoImovelResponse;
import com.vallengeo.cidadao.payload.response.cadastro.imovel.InformacaoImovelResponse;
import com.vallengeo.cidadao.payload.response.cadastro.imovel.RepresentanteResponse;
import com.vallengeo.core.util.GeometriySerializerUtil;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.locationtech.jts.geom.Geometry;

import java.io.Serializable;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
public class FichaImovelResponse implements Serializable {
    private Long id;
    private String inscricaoImobiliaria;
    private ProcessoResponse processo;
    private List<RepresentanteResponse> representantes;
    private InformacaoImovelResponse informacaoImovel;
    private CaracterizacaoImovelResponse caracterizacaoImovel;
    @JsonSerialize(using = GeometriySerializerUtil.class)
    private Geometry geometria;
    private List<DocumentosEnviadosResponse> documentosEnviados;
}


