package com.vallengeo.portal.payload.request.usuario;

import javax.validation.constraints.NotEmpty;

import static com.vallengeo.core.util.Constants.CAMPO_OBRIGATORIO;

public record EsqueciMinhaSenhaRequest(@NotEmpty(message = CAMPO_OBRIGATORIO) String email, @NotEmpty(message = CAMPO_OBRIGATORIO) String modulo) {
}
