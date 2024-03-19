package com.vallengeo.cidadao.payload.response.cadastro.imovel;

import com.vallengeo.global.payload.response.localidade.EnderecoResponse;

public record InformacaoImovelResponse(Long id, TipoUsoResponse tipoUso, EnderecoResponse endereco) {
}
