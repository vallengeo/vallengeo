package com.vallengeo.cidadao.payload.request.imovel;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDate;

import static com.vallengeo.core.util.Constants.CAMPO_OBRIGATORIO;
import static com.vallengeo.core.util.Constants.MAX_CARACTERES;

/**
 * DTO for {@link com.vallengeo.cidadao.model.CaracterizacaoImovel}
 */
public record CaracterizacaoImovelRequest(
        @Size(message = MAX_CARACTERES, max = 255) @NotEmpty(message = CAMPO_OBRIGATORIO) String setor,
        @Size(message = MAX_CARACTERES, max = 255) @NotEmpty(message = CAMPO_OBRIGATORIO) String quadra,
        @Size(message = MAX_CARACTERES, max = 255) @NotEmpty(message = CAMPO_OBRIGATORIO) String lote,
        @Size(message = MAX_CARACTERES, max = 255) String unidade,
        @NotNull(message = CAMPO_OBRIGATORIO) Float areaTerreno,
        @NotNull(message = CAMPO_OBRIGATORIO) Float testadaPrincipal,
        Float fracaoIdeal,
        @NotNull(message = CAMPO_OBRIGATORIO) LocalDate dataInclusao) implements Serializable {
}