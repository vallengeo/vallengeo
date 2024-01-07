package com.vallengeo.portal.payload.request.autenticacao;

import javax.validation.constraints.NotEmpty;

import static com.vallengeo.core.util.Constants.CAMPO_OBRIGATORIO;

public record TokenRefreshRequest(@NotEmpty(message = CAMPO_OBRIGATORIO) String refreshToken) {
}
