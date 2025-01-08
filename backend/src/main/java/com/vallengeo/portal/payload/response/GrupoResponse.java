package com.vallengeo.portal.payload.response;

import java.util.UUID;

public record GrupoResponse(UUID id, String nome, String codigo, Integer municipioId) {
}
