package com.vallengeo.cidadao.payload.response;

import java.util.List;

public record TipoDocumentoResponse(Long id, String titulo, Boolean obrigatorio, List<String> formatos) {
}
