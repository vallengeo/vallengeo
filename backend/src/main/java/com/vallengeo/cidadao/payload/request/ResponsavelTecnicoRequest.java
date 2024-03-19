package com.vallengeo.cidadao.payload.request;

import org.hibernate.validator.constraints.br.CPF;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;

import static com.vallengeo.core.util.Constants.*;

/**
 * DTO for {@link com.vallengeo.cidadao.model.ResponsavelTecnico}
 */
public record ResponsavelTecnicoRequest(
        @NotEmpty(message = CAMPO_OBRIGATORIO) @CPF(message = DOCUMENTO_INVALIDO) String cpf,
        @NotEmpty(message = CAMPO_OBRIGATORIO) @Email(message = EMAIL_INVALIDO) String email) implements Serializable {
}