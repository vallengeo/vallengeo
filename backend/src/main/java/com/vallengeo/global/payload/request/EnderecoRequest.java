package com.vallengeo.global.payload.request;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import static com.vallengeo.core.util.Constants.CAMPO_OBRIGATORIO;

public record EnderecoRequest(@NotEmpty(message = CAMPO_OBRIGATORIO) String cep,
                              @NotEmpty(message = CAMPO_OBRIGATORIO) String logradouro,
                              @NotEmpty(message = CAMPO_OBRIGATORIO) String bairro,
                              @NotEmpty(message = CAMPO_OBRIGATORIO) String numero, String complemento,
                              @NotNull(message = CAMPO_OBRIGATORIO) Integer idMunicipio) {
}
