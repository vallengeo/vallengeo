package com.vallengeo.utils;

import com.vallengeo.global.payload.request.EnderecoRequest;

public class EnderecoTestUtils {

    public static EnderecoRequest getEnderecoRequest() {
        return new EnderecoRequest(
                "08072-005",
                "Rua Quatro",
                "União de Vila Nova",
                "354",
                null,
                3550308 // Id referente ao município de São Paulo - SP
        );
    }
}
