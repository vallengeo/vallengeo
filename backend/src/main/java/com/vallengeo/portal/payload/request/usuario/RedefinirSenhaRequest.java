package com.vallengeo.portal.payload.request.usuario;

import javax.validation.constraints.NotEmpty;

import static com.vallengeo.core.util.Constants.CAMPO_OBRIGATORIO;

public record RedefinirSenhaRequest(@NotEmpty(message = CAMPO_OBRIGATORIO) String senha, @NotEmpty(message = CAMPO_OBRIGATORIO) String codigoAcesso) {
}
