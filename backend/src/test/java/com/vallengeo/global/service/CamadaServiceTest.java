package com.vallengeo.global.service;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.global.payload.response.CamadaResponse;
import com.vallengeo.utils.UsuarioTestUtils;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("CamadaService Tests")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class CamadaServiceTest extends AbstractIntegrationTest {

    @Autowired
    private CamadaService camadaService;

    @Test
    @DisplayName("Integration Test - Dado grupoId Nao Cadastrado Quando buscarTodasPeloGrupo Deve Retornar Lista Vazia")
    public void testDadoGrupoIdNaoCadastrado_QuandoBuscarTodasPeloGrupo_DeveRetornarListaVazia() {
        var actual = camadaService.buscarTodasPeloGrupo(UUID.randomUUID());

        assertNotNull(actual);
        assertTrue(actual.isEmpty());
    }

    @Test
    @DisplayName("Integration Test - Dado Camadas Cadastradas Quando buscarTodasPeloGrupo Deve Retornar Lista CamadaResponse")
    public void testDadoCamadasCadastradas_QuandoBuscarTodasPeloGrupo_DeveRetornarListaCamadaResponse() {
        var actual = camadaService.buscarTodasPeloGrupo(UsuarioTestUtils.GRUPO_ID);

        assertNotNull(actual);
        assertFalse(actual.isEmpty());
        assertInstanceOf(CamadaResponse.class, actual.get(0));
    }
}