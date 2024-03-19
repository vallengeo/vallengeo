package com.vallengeo.cidadao.payload.response.cadastro.imovel;

import com.fasterxml.jackson.annotation.JsonTypeName;
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
    private String contatoNome;
    private String contatoTelefone;

    @Getter
    @Setter
    @JsonTypeName(TipoPessoaEnum.Nome.FISICA)
    public static class PessoaFisica extends RepresentanteResponse {
        private String nome;
        private String cpf;
        private String rg;
        private String tipoPessoa = TipoPessoaEnum.Nome.FISICA;
    }

    @Getter
    @Setter
    @JsonTypeName(TipoPessoaEnum.Nome.JURIDICA)
    public static class PessoaJuridica extends RepresentanteResponse {
        private String razaoSocial;
        private String cnpj;
        private RepresentanteResponse.PessoaFisica responsavel;
        private String tipoPessoa = TipoPessoaEnum.Nome.JURIDICA;
    }

}
