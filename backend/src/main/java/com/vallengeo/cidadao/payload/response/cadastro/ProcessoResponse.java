package com.vallengeo.cidadao.payload.response.cadastro;

import com.vallengeo.cidadao.payload.response.cadastro.imovel.ImovelResponse;

import java.util.UUID;

public record ProcessoResponse(UUID id, String protocolo, ImovelResponse imovel) {
}
