package com.vallengeo.global.payload.response.geoserver;

import lombok.Data;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Data
public class GeorreferenciamentoFeatureColletionResponse implements Serializable {
    private String type;
    private List<Feature> features;

    @Data
    public static class Feature {
        private String type;
        private String id;
        private Object geometria;
        private String geometry_name;
       // private Map<String, Object> properties;
       private Propriedade properties;

        @Data
        public static class Propriedade {
            private int fid;
            // limite municipal
            private String cd_geocodm;
            private String nm_municip;
            private String estado;
            private double area;

            // trecho logradouro
            private int cd_lograd;
            private String nm_lograd;
            private String nm_via;
            private String nome_setor;

            // edificacao
            private int cd_unidade;
            private String cd_inscricao;
            private String cd_inscricao_unidade;
            private int qt_andar;
            private double vl_area_coberta;
            private double vl_area_descontada;
            private double vl_area_constatada;
            private String nm_endereco;
            private String cd_numero;
            private String nm_bairro;
            private String cd_cep;
            private String nm_cidade;
            private String nm_estado;
            private String nm_quadra;
            private String nm_lote;
            private String nm_endereco_entrega;
            private String nm_bairro_entrega;
            private String nm_cidade_entrega;
            private String cd_cep_entrega;
            private double vl_area_terreno;
            private double vl_area_declarada;
            private int vl_testada;
            private int multiplo;
        }

    }
}

