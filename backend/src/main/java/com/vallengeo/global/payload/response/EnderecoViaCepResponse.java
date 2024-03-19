package com.vallengeo.global.payload.response;

import com.vallengeo.global.payload.response.localidade.MunicipioResponse;

public record EnderecoViaCepResponse(String cep, String logradouro, String complemento, String bairro,
                                     MunicipioResponse municipio) {
}
