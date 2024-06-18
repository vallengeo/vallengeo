package com.vallengeo.global.service;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.global.payload.response.EnderecoViaCepResponse;
import com.vallengeo.global.payload.response.localidade.EstadoResponse;
import com.vallengeo.global.payload.response.localidade.MunicipioResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Localidade Service Tests")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class LocalidadeServiceTest extends AbstractIntegrationTest {

    @Autowired
    private LocalidadeService localidadeService;

    @Test
    @DisplayName("Integration Test - Dado Cep Nao Encontrado Quando buscarViaCep Deve Lancar ValidatorException")
    void testDadoCepNaoEncontrado_QuandoBuscarViaCep_DeveLancarValidatorException() {
        String cep = "10110-001";

        var actual = assertThrows(
                ValidatorException.class,
                () -> localidadeService.buscarViaCep(cep));

        assertEquals(HttpStatus.NOT_FOUND, actual.getStatus());
        assertEquals(String.format("Endereço para o CEP %s não encontrado!", cep), actual.getMessage());
    }

    @Test
    @DisplayName("Integration Test - Dado Cep Quando buscarViaCep Deve Retornar EnderecoViaCepResponse")
    void testDadoCep_QuandoBuscarViaCep_DeveRetornarEnderecoViaCepResponse() {
        String cep = "12072-150";

        var actual = localidadeService.buscarViaCep(cep);

        assertNotNull(actual);
        assertInstanceOf(EnderecoViaCepResponse.class, actual);
        assertEquals(cep, actual.cep());
        assertEquals("Taubaté", actual.municipio().nome());
        assertEquals("SP", actual.municipio().estado().uf());
    }

    @Test
    @DisplayName("Integration Test - Dado Estados Cadastrados Quando buscarTodosEstados() Deve Retornar EstadoResponse List")
    void testDadoEstadosCadastrados_QuandoBuscarTodosEstados_DeveRetornarEstadoResponseList() {
        var actual = localidadeService.buscarTodosEstados();

        assertNotNull(actual);
        assertFalse(actual.isEmpty());
        assertInstanceOf(EstadoResponse.class, actual.stream().findFirst().get());
    }

    @Test
    @DisplayName("Integration Test - Dado UF Nao Cadastrado Quando buscarEstadoPorUf() Deve Lancar ValidatorException")
    void testDadoUFNaoCadastrado_QuandoBuscarEstadoPorUf_DeveLancarValidatorException() {
        String uf = "GAAS";

        var actual = assertThrows(
                ValidatorException.class,
                () -> localidadeService.buscarEstadoPorUf(uf));

        assertEquals(HttpStatus.NOT_FOUND, actual.getStatus());
        assertEquals(String.format("Estado %s não encontrado!", uf), actual.getMessage());
    }

    @Test
    @DisplayName("Integration Test - Dado UF Quando buscarEstadoPorUf() Deve Retornar EstadoResponse")
    void testDadoUF_QuandoBuscarEstadoPorUf_DeveRetornarEstadoResponse() {
        String uf = "SC";

        var actual = localidadeService.buscarEstadoPorUf(uf);

        assertNotNull(actual);
        assertInstanceOf(EstadoResponse.class, actual);
        assertEquals(uf, actual.uf());
        assertEquals("Santa Catarina", actual.nome());
    }

    @Test
    @DisplayName("Integration Test - Dado Id Nao Cadastrado Quando buscarEstadoPorId() Deve Lancar ValidatorException")
    void testDadoIdNaoCadastrado_QuandoBuscarEstadoPorId_DeveLancarValidatorException() {
        int estadoId = 101010;

        var actual = assertThrows(
                ValidatorException.class,
                () -> localidadeService.buscarEstadoPorId(estadoId));

        assertEquals(HttpStatus.NOT_FOUND, actual.getStatus());
        assertEquals(String.format("Estado identificador %s não encontrado!", estadoId), actual.getMessage());
    }

    @Test
    @DisplayName("Integration Test - Dado Id Quando buscarEstadoPorId() Deve Retornar EstadoResponse")
    void testDadoId_QuandoBuscarEstadoPorId_DeveRetornarEstadoResponse() {
        int estadoId = 31; // Id Referente ao estado de Minas Gerais

        var actual = localidadeService.buscarEstadoPorId(estadoId);

        assertNotNull(actual);
        assertInstanceOf(EstadoResponse.class, actual);
        assertEquals(estadoId, actual.id());
        assertEquals("MG", actual.uf());
        assertEquals("Minas Gerais", actual.nome());
    }

    @Test
    @DisplayName("Integration Test - Dado Municipios Estado Quando buscarMunicipiosPeloEstadoId() Deve Retornar MunicipioResponse List")
    void testDadoMunicipiosEstado_QuandoBuscarMunicipiosPeloEstadoId_DeveRetornarMunicipioResponseList() {
        var estadoId = 31;

        var actual = localidadeService.buscarMunicipiosPeloEstadoId(estadoId);

        assertNotNull(actual);
        assertFalse(actual.isEmpty());
        assertInstanceOf(MunicipioResponse.class, actual.stream().findFirst().get());
    }

    @Test
    @DisplayName("Integration Test - Dado Id Nao Cadastrado Quando buscarMunicipiosPeloId() Deve Lancar ValidatorException")
    void testDadoIdNaoCadastrado_QuandoBuscarMunicipiosPeloId_DeveLancarValidatorException() {
        int municipioId = 101010;

        var actual = assertThrows(
                ValidatorException.class,
                () -> localidadeService.buscarMunicipiosPeloId(municipioId));

        assertEquals(HttpStatus.NOT_FOUND, actual.getStatus());
        assertEquals(String.format("Município identificador %s não encontrado!", municipioId), actual.getMessage());
    }

    @Test
    @DisplayName("Integration Test - Dado Municipio Cadastrado Quando buscarMunicipiosPeloId() Deve Retornar MunicipioResponse")
    void testDadoMunicipioCadastrado_QuandoBuscarMunicipiosPeloId_DeveRetornarMunicipioResponse() {
        var municipioId = 3106200; // Id referente ao municipio de Belo Horizonte/MG

        var actual = localidadeService.buscarMunicipiosPeloId(municipioId);

        assertNotNull(actual);
        assertInstanceOf(MunicipioResponse.class, actual);
        assertEquals(municipioId, actual.id());
        assertEquals("Belo Horizonte", actual.nome());
        assertEquals(31, actual.estado().id());
    }
}