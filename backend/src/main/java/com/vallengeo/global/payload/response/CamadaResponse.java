package com.vallengeo.global.payload.response;

import com.vallengeo.global.model.CamadaCategoria;

public record CamadaResponse(Long id, String nome, String codigo, Integer ordem, String corPreenchimento, String corBorda, CamadaCategoriaResponse categoria) {
}
