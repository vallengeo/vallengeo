package com.vallengeo.cidadao.payload.response;

import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.io.Serializable;

@Data
public class GeorreferenciamentoInformacoesImovelResponse implements Serializable {
    private InformacaoImovel informacaoImovel;
    private CaracterizacaoImovel caracterizacaoImovel;

    @Data
    @Builder
    public static class InformacaoImovel {
        private Endereco endereco;

        @Data
        @Builder
        public static class Endereco {
            private String cep;
            private String logradouro;
            private String bairro;
            private String numero;
            private String complemento;
            private int idMunicipio;
            private String nomeMunicipio;
            private String siglaUf;
        }
    }

    @Data
    public static class CaracterizacaoImovel {
        private String setor;
        private String quadra;
        private String lote;
        private String unidade;
        private double areaTerreno;
        private double testadaPrincipal;
        private double fracaoIdeal;
        private String dataInclusao;
    }
}
