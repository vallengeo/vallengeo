package com.vallengeo.cidadao.service;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.cidadao.payload.response.TipoUsoResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("TipoUso Service Tests")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class TipoUsoServiceTest extends AbstractIntegrationTest {

    @Autowired
    private TipoUsoService tipoUsoService;

    @Test
    @DisplayName("Integration Test - Dado TipoUso Cadastrados Quando buscarTodosAtivos() Deve Retornar TipoUsoResponse List")
    void testDadoTipoUsoCadastrados_QuandoBuscarTodosAtivos_DeveRetornarTipoUsoResponseList() {
        var actual = tipoUsoService.buscarTodosAtivos();

        System.out.println(actual);

        assertNotNull(actual);
        assertInstanceOf(TipoUsoResponse.class, actual.get(0));
    }
}