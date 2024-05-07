package com.vallengeo.portal.payload.request.autenticacao;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import static com.vallengeo.core.util.Constants.*;

public record LoginRequest(
        @NotEmpty(message = CAMPO_OBRIGATORIO) @Email(regexp = EMAIL_REGEX, message = EMAIL_INVALIDO) String email,
        @NotEmpty(message = CAMPO_OBRIGATORIO) String senha,
        @NotEmpty(message = CAMPO_OBRIGATORIO) String idGrupo
) {

}
