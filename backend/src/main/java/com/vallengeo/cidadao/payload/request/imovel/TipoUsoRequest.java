package com.vallengeo.cidadao.payload.request.imovel;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

import static com.vallengeo.core.util.Constants.CAMPO_OBRIGATORIO;

/**
 * DTO for {@link com.vallengeo.cidadao.model.TipoUso}
 */
public record TipoUsoRequest(@NotNull(message = CAMPO_OBRIGATORIO) Long id) implements Serializable {
}