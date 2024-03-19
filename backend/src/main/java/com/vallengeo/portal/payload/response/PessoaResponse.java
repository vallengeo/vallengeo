package com.vallengeo.portal.payload.response;

import com.fasterxml.jackson.annotation.JsonTypeName;
import com.vallengeo.global.payload.response.localidade.EnderecoResponse;
import com.vallengeo.portal.enumeration.TipoPessoaEnum;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;

@Getter
@Setter
public class PessoaResponse implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    private String id;
    private String email;
    private String telefone;
    private EnderecoResponse endereco;

    @Getter
    @Setter
    @JsonTypeName(TipoPessoaEnum.Nome.FISICA)
    public static class PessoaFisica extends PessoaResponse {
        private String nome;
        private String cpf;
        private String rg;
        private String tipoPessoa = TipoPessoaEnum.Nome.FISICA;
    }

    @Getter
    @Setter
    @JsonTypeName(TipoPessoaEnum.Nome.JURIDICA)
    public static class PessoaJuridica extends PessoaResponse {
        private String razaoSocial;
        private String cnpj;
        private PessoaFisica responsavel;
        private String tipoPessoa = TipoPessoaEnum.Nome.JURIDICA;
    }

}
