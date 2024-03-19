package com.vallengeo.cidadao.payload.request.imovel;


import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeName;
import com.vallengeo.portal.enumeration.TipoPessoaEnum;
import com.vallengeo.portal.payload.request.pessoa.PessoaRequest;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.br.CNPJ;
import org.hibernate.validator.constraints.br.CPF;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serial;
import java.io.Serializable;

import static com.vallengeo.core.util.Constants.*;

@Getter
@Setter
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.EXISTING_PROPERTY, visible = true, property = "tipoPessoa")
@JsonSubTypes(
        {
                @JsonSubTypes.Type(value = RepresentanteRequest.PessoaFisicaRequest.class, name = TipoPessoaEnum.Nome.FISICA),
                @JsonSubTypes.Type(value = RepresentanteRequest.PessoaJuridicaRequest.class, name = TipoPessoaEnum.Nome.JURIDICA),
        }
)
public class RepresentanteRequest extends PessoaRequest implements Serializable {
   @Valid
   @NotNull(message = CAMPO_OBRIGATORIO)
   private Contato contato;

    @Getter
    @Setter
    @JsonTypeName(TipoPessoaEnum.Nome.FISICA)
    public static class PessoaFisicaRequest extends RepresentanteRequest {
        @NotEmpty(message = CAMPO_OBRIGATORIO)
        private String nome;

        @NotEmpty(message = CAMPO_OBRIGATORIO)
        @CPF(message = DOCUMENTO_INVALIDO)
        private String cpf;
        private String rg;
    }

    @Getter
    @Setter
    @JsonTypeName(TipoPessoaEnum.Nome.JURIDICA)
    public static class PessoaJuridicaRequest extends RepresentanteRequest {
        @NotEmpty(message = CAMPO_OBRIGATORIO)
        private String razaoSocial;
        @NotEmpty(message = CAMPO_OBRIGATORIO)
        @CNPJ(message = DOCUMENTO_INVALIDO)
        private String cnpj;
        @NotNull(message = "Informe o responsável")
        private RepresentanteRequest.PessoaFisicaRequest responsavel;
    }

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
        @NotNull(message = CAMPO_OBRIGATORIO)
        private Boolean responsavelTecnico;
    }
}
