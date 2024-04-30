package com.vallengeo.cidadao.payload.response;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.vallengeo.cidadao.payload.response.cadastro.imovel.CaracterizacaoImovelResponse;
import com.vallengeo.cidadao.payload.response.cadastro.imovel.InformacaoImovelResponse;
import com.vallengeo.cidadao.payload.response.cadastro.imovel.RepresentanteResponse;
import com.vallengeo.core.util.GeometriySerializerUtil;
import lombok.Builder;
import lombok.Data;
import org.locationtech.jts.geom.Geometry;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

import static com.vallengeo.core.config.Config.DATE_FORMAT_TIME_TABLE;

@Data
@Builder
public class FichaImovelResponse implements Serializable {
    private Long id;
    private String inscricaoImobiliaria;
    private Processo processo;
    private List<RepresentanteResponse> representantes;
    private InformacaoImovelResponse informacaoImovel;
    private CaracterizacaoImovelResponse caracterizacaoImovel;
    @JsonSerialize(using = GeometriySerializerUtil.class)
    private Geometry geometria;
    private List<DocumentosEnviadosResponse> documentosEnviados;

    @Data
    @Builder
    public static class Processo implements Serializable {
        private UUID id;
        private String protocolo;
        private String Situacao;
        private LocalDateTime ultimaAtualizacao;

        public String getUltimaAtualizacaoFormatada() {
            if (this.ultimaAtualizacao != null) {
                return this.ultimaAtualizacao.format(DateTimeFormatter.ofPattern(DATE_FORMAT_TIME_TABLE));
            }
            return "-";
        }
    }

}


