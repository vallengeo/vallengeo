package com.vallengeo.cidadao.payload.response.cadastro.imovel;

import java.io.Serializable;

/**
 * DTO for {@link com.vallengeo.cidadao.model.TipoUso}
 */
public record TipoUsoResponse(Long id, String nome) implements Serializable {
}