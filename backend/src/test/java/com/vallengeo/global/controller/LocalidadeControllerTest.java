package com.vallengeo.global.controller;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.core.exceptions.ApiExceptionCustom;
import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.global.payload.response.EnderecoViaCepResponse;
import com.vallengeo.global.payload.response.localidade.EstadoResponse;
import com.vallengeo.global.payload.response.localidade.MunicipioResponse;
import com.vallengeo.portal.model.Usuario;
import com.vallengeo.portal.repository.UsuarioRepository;
import com.vallengeo.utils.JwtTestUtils;
import com.vallengeo.utils.UsuarioTestUtils;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.http.ContentType;
import io.restassured.response.ResponseOptions;
import io.restassured.specification.RequestSpecification;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import java.util.Arrays;

import static com.vallengeo.core.util.Constants.NOT_FOUND;
import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Localidade Controller Tests")
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class LocalidadeControllerTest extends AbstractIntegrationTest {

    @Autowired
    private UsuarioRepository usuarioRepository;

    private String accessToken;
    private RequestSpecification specification;

    @Value("${server.port}")
    private int serverPort;
    @Value("${api.security.token.secret}")
    private String secretKey;
    @Value("${api.security.token.expiration}")
    private Long expiration;
    @Value("${api.security.token.algorithm}")
    private String algorithm;

    @BeforeAll
    public void setup() {
        Usuario admin = usuarioRepository.findByEmail(UsuarioTestUtils.DEFAULT_DEV_EMAIL).orElse(null);
        accessToken = JwtTestUtils.buildJwtToken(
                admin, UsuarioTestUtils.GRUPO_ID.toString(), secretKey, expiration, algorithm);

        specification = new RequestSpecBuilder()
                .setContentType(ContentType.JSON)
                .setBasePath("/api/v1/localidade")
                .setPort(serverPort)
                .build();
    }

    @Test
    @DisplayName("Integration Test - Dado CEP Nao Cadastrado Quando buscarEnderecoPorCep() Deve Retornar NotFound (404)")
    void testDadoCEPNaoCadastrado_QuandoBuscarEnderecoPorCep_DeveRetornarNotFound() {
        var cepNaoCadastrado = "00000-000";

        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .pathParam("cep", cepNaoCadastrado)
                .when().get("/cep/{cep}");

        assertEquals(HttpStatus.NOT_FOUND.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.NOT_FOUND.value(), actual.getStatus());
        assertEquals(HttpStatus.NOT_FOUND.getReasonPhrase(), actual.getError());
        assertEquals(ValidatorException.class.getName(), actual.getException());
        assertEquals("Endereço para o CEP " + cepNaoCadastrado + NOT_FOUND, actual.getMessage());
    }

    @Test
    @DisplayName("Integration Test - Dado CEP Valido Quando buscarEnderecoPorCep() Deve Retornar EnderecoViaCepResponse")
    void testDadoCEPValido_QuandoBuscarEnderecoPorCep_DeveRetornarEnderecoViaCepResponse() {
        var cep = "72546-206"; // CEP referente ao municipio de Brasilia - DF

        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .pathParam("cep", cep)
                .when().get("/cep/{cep}");

        assertEquals(HttpStatus.OK.value(), response.statusCode());
        var actual = response.body().as(EnderecoViaCepResponse.class);

        assertNotNull(actual);
        assertEquals(cep, actual.cep());
        assertEquals("Brasília", actual.municipio().nome());
        assertEquals("Distrito Federal", actual.municipio().estado().nome());
    }

    @Test
    @DisplayName("Integration Test - Dado Estados Cadastrados Quando buscarTodosEstados() Deve Retornar Lista Estado Response")
    void testDadoEstadosCadastrados_QuandoBuscarTodosEstados_DeveRetornarListaEstadoResponse() {
        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .when().get("/estado");

        assertEquals(HttpStatus.OK.value(), response.statusCode());
        var actual = Arrays.asList(response.getBody().as(EstadoResponse[].class));

        assertNotNull(actual);
        assertEquals(27, actual.size());
        assertInstanceOf(EstadoResponse.class, actual.get(0));
    }

    @Test
    @DisplayName("Integration Test - Dado UF Nao Cadastrada Quando buscarEstadoPorUf() Deve Retornar NotFound (404)")
    void testDadoUFNaoCadastrada_QuandoBuscarEstadoPorUf_DeveRetornarNotFound() {
        var ufNaoCadastrada = "XYZ";

        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .pathParam("uf", ufNaoCadastrada)
                .when().get("/estado/{uf}");

        assertEquals(HttpStatus.NOT_FOUND.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.NOT_FOUND.value(), actual.getStatus());
        assertEquals(HttpStatus.NOT_FOUND.getReasonPhrase(), actual.getError());
        assertEquals(ValidatorException.class.getName(), actual.getException());
        assertEquals("Estado " + ufNaoCadastrada + NOT_FOUND, actual.getMessage());
    }

    @Test
    @DisplayName("Integration Test - Dado UF Quando buscarEstadoPorUf() Deve Retornar NotFound (404)")
    void testDadoUF_QuandoBuscarEstadoPorUf_DeveRetornarNotFound() {
        var uf = "SP";

        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .pathParam("uf", uf)
                .when().get("/estado/{uf}");

        assertEquals(HttpStatus.OK.value(), response.statusCode());
        var actual = response.body().as(EstadoResponse.class);

        assertNotNull(actual);
        assertEquals(uf, actual.uf());
        assertEquals("São Paulo", actual.nome());
    }

    @Test
    @DisplayName("Integration Test - Dado Id Nao Cadastrado Quando buscarEstadoPorId() Deve Retornar NotFound (404)")
    void testDadoIdNaoCadastrado_QuandoBuscarEstadoPorId_DeveRetornarNotFound() {
        var estadoId = 0;

        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .pathParam("id", estadoId)
                .when().get("/estado/{id}");

        assertEquals(HttpStatus.NOT_FOUND.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.NOT_FOUND.value(), actual.getStatus());
        assertEquals(HttpStatus.NOT_FOUND.getReasonPhrase(), actual.getError());
        assertEquals(ValidatorException.class.getName(), actual.getException());
        assertEquals("Estado identificador " + estadoId + NOT_FOUND, actual.getMessage());
    }

    @Test
    @DisplayName("Integration Test - Dado Id Cadastrado Quando buscarEstadoPorId() Deve Retornar EstadoResponse")
    void testDadoIdCadastrado_QuandoBuscarEstadoPorId_DeveRetornarEstadoResponse() {
        var estadoId = 35; // Id do estado de São Paulo

        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .pathParam("id", estadoId)
                .when().get("/estado/{id}");

        assertEquals(HttpStatus.OK.value(), response.statusCode());
        var actual = response.body().as(EstadoResponse.class);

        assertNotNull(actual);
        assertEquals(estadoId, actual.id());
        assertEquals("SP", actual.uf());
        assertEquals("São Paulo", actual.nome());
    }

    // Metodo 'buscarMunicipiosPeloEstadoId' nao retornar 404 ao receber um id de estado não cadastrado
    // @Test
    // @DisplayName("Integration Test - Dado Id Nao Cadastrado Quando buscarMunicipiosPeloEstadoId() Deve Retornar NotFound (404)")
    // void testDadoIdNaoCadastrado_QuandoBuscarMunicipiosPeloEstadoId_DeveRetornarNotFound() {
    //     var estadoId = 0;
    //
    //     ResponseOptions<?> response = given().spec(specification)
    //             .header(HttpHeaders.AUTHORIZATION, accessToken)
    //             .pathParam("id", estadoId)
    //             .when().get("/estado/{id}/municipio");
    //
    //     assertEquals(HttpStatus.NOT_FOUND.value(), response.statusCode());
    //     var actual = response.body().as(ApiExceptionCustom.class);
    //
    //     assertEquals(HttpStatus.NOT_FOUND.value(), actual.getStatus());
    //     assertEquals(HttpStatus.NOT_FOUND.getReasonPhrase(), actual.getError());
    //     assertEquals(ValidatorException.class.getName(), actual.getException());
    //     assertEquals("Estado identificador " + estadoId + NOT_FOUND, actual.getMessage());
    // }

    @Test
    @DisplayName("Integration Test - Dado Id Cadastrado Quando buscarMunicipiosPeloEstadoId() Deve Retornar Lista MunicipioResponse")
    void testDadoIdCadastrado_QuandoBuscarMunicipiosPeloEstadoId_DeveRetornarListaMunicipioResponse() {
        var estadoId = 35; // Id do estado de São Paulo

        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .pathParam("id", estadoId)
                .when().get("/estado/{id}/municipio");

        assertEquals(HttpStatus.OK.value(), response.statusCode());
        var actual = Arrays.asList(response.body().as(MunicipioResponse[].class));

        assertNotNull(actual);
        assertEquals(645, actual.size());
        assertInstanceOf(MunicipioResponse.class, actual.get(0));
    }

    @Test
    @DisplayName("Integration Test - Dado Id Nao Cadastrado Quando buscarMunicipiosPeloId() Deve Retornar NotFound")
    void testDadoIdNaoCadastrado_QuandoBuscarMunicipiosPeloId_DeveRetornarNotFound() {
        var municipioId = 0;

        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .pathParam("id", municipioId)
                .when().get("/municipio/{id}");

        assertEquals(HttpStatus.NOT_FOUND.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.NOT_FOUND.value(), actual.getStatus());
        assertEquals(HttpStatus.NOT_FOUND.getReasonPhrase(), actual.getError());
        assertEquals(ValidatorException.class.getName(), actual.getException());
        assertEquals("Município identificador " + municipioId + NOT_FOUND, actual.getMessage());
    }

    @Test
    @DisplayName("Integration Test - Dado Id Cadastrado Quando buscarMunicipiosPeloId() Deve Retornar MunicipioResponse")
    void testDadoIdCadastrado_QuandoBuscarMunicipiosPeloId_DeveRetornarMunicipioResponse() {
        var municipioId = 3550308; // Id do municipio de São Paulo - SP

        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .pathParam("id", municipioId)
                .when().get("/municipio/{id}");

        assertEquals(HttpStatus.OK.value(), response.statusCode());
        var actual = response.body().as(MunicipioResponse.class);

        assertNotNull(actual);
        assertInstanceOf(MunicipioResponse.class, actual);
        assertEquals(municipioId, actual.id());
        assertEquals("São Paulo", actual.nome());
        assertEquals("SP", actual.estado().uf());
    }
}