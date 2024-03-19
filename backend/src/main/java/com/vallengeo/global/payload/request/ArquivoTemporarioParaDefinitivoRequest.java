package com.vallengeo.global.payload.request;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

import static com.vallengeo.core.util.Constants.CAMPO_OBRIGATORIO;

public record ArquivoTemporarioParaDefinitivoRequest(@NotEmpty(message = CAMPO_OBRIGATORIO) String nomeTemporario,
                                                     @NotEmpty(message = CAMPO_OBRIGATORIO) String nomeOriginal,
                                                     @NotNull(message = CAMPO_OBRIGATORIO) LocalDateTime dataEnvio) {
}
