package com.vallengeo.portal.payload.request.autenticacao;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import static com.vallengeo.core.util.Constants.CAMPO_OBRIGATORIO;
import static com.vallengeo.core.util.Constants.EMAIL_INVALIDO;

public record LoginRequest(@NotEmpty(message = CAMPO_OBRIGATORIO) @Email(message = EMAIL_INVALIDO) String email,
                           @NotEmpty(message = CAMPO_OBRIGATORIO) String senha,
                           @NotNull(message = CAMPO_OBRIGATORIO) Integer idMunicipio) {
}
