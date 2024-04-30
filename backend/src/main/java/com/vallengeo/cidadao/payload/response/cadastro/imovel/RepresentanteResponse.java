package com.vallengeo.cidadao.payload.response.cadastro.imovel;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonTypeName;
import com.vallengeo.portal.enumeration.TipoPessoaEnum;
import com.vallengeo.portal.payload.response.PessoaResponse;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.io.Serial;
import java.io.Serializable;

import static com.vallengeo.core.util.Constants.CAMPO_OBRIGATORIO;
import static com.vallengeo.core.util.Constants.EMAIL_INVALIDO;

@Getter
@Setter
public class RepresentanteResponse extends PessoaResponse implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    private Contato contato;

    @Getter
    @Setter
    public static class Contato implements Serializable {
        @NotEmpty(message = CAMPO_OBRIGATORIO)
        private String nome;
        @NotEmpty(message = CAMPO_OBRIGATORIO)
        @Email(message = EMAIL_INVALIDO)
        private String email;
        @NotEmpty(message = CAMPO_OBRIGATORIO)
        private String telefone;
        @NotEmpty(message = CAMPO_OBRIGATORIO)
        @Size(min = 11, max = 14, message = "Favor informar documento inválido")
        private String documento;
        private Boolean responsavelTecnico;
        private Boolean representanteLegal;
        private Boolean outro;
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
    }

}
