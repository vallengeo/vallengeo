package com.vallengeo.global.payload.response.localidade;

public record EnderecoResponse(Long id, String cep, String logradouro, String bairro, String numero, String complemento,
                               MunicipioResponse municipio) {
}
