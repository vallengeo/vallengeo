package com.vallengeo.cidadao.payload.request;

import com.vallengeo.cidadao.payload.request.imovel.ImovelRequest;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

import static com.vallengeo.core.util.Constants.CAMPO_OBRIGATORIO;

public record ProcessoImovelRequest(@NotBlank(message = CAMPO_OBRIGATORIO) String idGrupo,
                                    @Valid @NotNull(message = CAMPO_OBRIGATORIO) ImovelRequest imovel) implements Serializable {
}
