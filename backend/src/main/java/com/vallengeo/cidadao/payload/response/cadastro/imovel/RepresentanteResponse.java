package com.vallengeo.cidadao.payload.response.cadastro.imovel;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonTypeName;
import com.vallengeo.core.util.DocumentoUtil;
import com.vallengeo.portal.enumeration.TipoPessoaEnum;
import com.vallengeo.portal.payload.response.PessoaResponse;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;

@Getter
@Setter
public class RepresentanteResponse extends PessoaResponse implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    private Contato contato;
    private String tipoPessoa;

    public String getTipoPessoa() {
        if (this instanceof PessoaFisica) {
            return TipoPessoaEnum.Nome.FISICA;
        } else {
            return TipoPessoaEnum.Nome.JURIDICA;
        }
    }

    @Getter
    @Setter
    public static class Contato implements Serializable {
        private String nome;
        private String email;
        private String telefone;
        private String documento;
        private Boolean responsavelTecnico;
        private Boolean representanteLegal;
        private Boolean outro;

         public String getDocumento() {
            if (this.documento != null) {
                return DocumentoUtil.addMascara(this.documento);
            }
            return "-";
        }
    }

    @Getter
    @Setter
    @JsonTypeName(TipoPessoaEnum.Nome.FISICA)
    public static class PessoaFisica extends RepresentanteResponse {
        private String nome;
        private String cpf;
        private String rg;
        @JsonIgnore
        private String tipoPessoa = TipoPessoaEnum.Nome.FISICA;

        public String getCpf() {
            if (this.cpf != null) {
                return DocumentoUtil.addMascara(this.cpf);
            }
            return "-";
        }
    }

    @Getter
    @Setter
    @JsonTypeName(TipoPessoaEnum.Nome.JURIDICA)
    public static class PessoaJuridica extends RepresentanteResponse {
        private String razaoSocial;
        private String cnpj;
        private RepresentanteResponse.PessoaFisica responsavel;
        @JsonIgnore
        private String tipoPessoa = TipoPessoaEnum.Nome.JURIDICA;

        public String getCnpj() {
            if (this.cnpj != null) {
                return DocumentoUtil.addMascara(this.cnpj);
            }
            return "-";
        }
    }

}
