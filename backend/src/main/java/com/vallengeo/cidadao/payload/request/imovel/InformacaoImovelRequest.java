package com.vallengeo.cidadao.payload.request.imovel;

import com.vallengeo.global.payload.request.EnderecoRequest;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

import static com.vallengeo.core.util.Constants.CAMPO_OBRIGATORIO;

/**
 * DTO for {@link com.vallengeo.cidadao.model.InformacaoImovel}
 */
public record InformacaoImovelRequest(@NotNull(message = CAMPO_OBRIGATORIO) TipoUsoRequest tipoUso,
                                      @NotNull(message = CAMPO_OBRIGATORIO) EnderecoRequest endereco) implements Serializable {
}