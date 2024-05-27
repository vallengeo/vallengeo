package com.vallengeo.portal.controller;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.core.exceptions.ApiExceptionCustom;
import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.core.util.Constants;
import com.vallengeo.portal.enumeration.TipoPessoaEnum;
import com.vallengeo.portal.model.Pessoa;
import com.vallengeo.portal.model.PessoaFisica;
import com.vallengeo.portal.model.PessoaJuridica;
import com.vallengeo.portal.model.Usuario;
import com.vallengeo.portal.payload.request.pessoa.PessoaRequest;
import com.vallengeo.portal.payload.response.PessoaResponse;
import com.vallengeo.portal.repository.PessoaFisicaRepository;
import com.vallengeo.portal.repository.PessoaJuridicaRepository;
import com.vallengeo.portal.repository.UsuarioRepository;
import com.vallengeo.utils.EnderecoTestUtils;
import com.vallengeo.utils.ExceptionTestUtils;
import com.vallengeo.utils.JwtTestUtils;
import io.jsonwebtoken.ExpiredJwtException;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.http.ContentType;
import io.restassured.response.ResponseOptions;
import io.restassured.specification.RequestSpecification;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.*;

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Pessoa Controller Tests")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class PessoaControllerTest extends AbstractIntegrationTest {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private PessoaFisicaRepository pessoaFisicaRepository;
    @Autowired
    private PessoaJuridicaRepository pessoaJuridicaRepository;

    @Value("${server.port}")
    private int serverPort;
    @Value("${api.security.token.secret}")
    private String secretKey;
    @Value("${api.security.token.expiration}")
    private Long expiration;
    @Value("${api.security.token.algorithm}")
    private String algorithm;

    private static RequestSpecification specification;
    private static String expiredToken;
    private static String accessToken;
    private static Usuario admin;

    private static PessoaFisica pessoaFisicaCadastrada;
    private static PessoaJuridica pessoaJuridicaCadastrada;

    private PessoaRequest.PessoaFisicaRequest pessoaFisicaRequest;
    private PessoaRequest.PessoaJuridicaRequest pessoaJuridicaRequest;

    @BeforeEach
    public void setup() {
        specification = new RequestSpecBuilder()
                .setContentType(ContentType.JSON)
                .setBasePath("/api/v1/pessoa")
                .setPort(serverPort)
                .build();

        pessoaFisicaRequest = new PessoaRequest.PessoaFisicaRequest();
        pessoaFisicaRequest.setEmail("pessoa.fisica@email.com");
        pessoaFisicaRequest.setTelefone("11 922334466");
        pessoaFisicaRequest.setTipoPessoa(TipoPessoaEnum.FISICA);
        pessoaFisicaRequest.setEndereco(EnderecoTestUtils.getEnderecoRequest());
        pessoaFisicaRequest.setNome("Juliana Oliveira Silva");
        pessoaFisicaRequest.setCpf("35966137447");
        pessoaFisicaRequest.setRg("268456823");

        pessoaJuridicaRequest = new PessoaRequest.PessoaJuridicaRequest();
        pessoaJuridicaRequest.setEmail("pessoa.juridica@email.com");
        pessoaJuridicaRequest.setTelefone("11 922334466");
        pessoaJuridicaRequest.setTipoPessoa(TipoPessoaEnum.JURIDICA);
        pessoaJuridicaRequest.setEndereco(EnderecoTestUtils.getEnderecoRequest());
        pessoaJuridicaRequest.setRazaoSocial("Pessoa Juridica LTDA");
        pessoaJuridicaRequest.setCnpj("47217253000185");
        pessoaJuridicaRequest.setResponsavel(pessoaFisicaRequest);

        if (Objects.isNull(admin))
            admin = (Usuario) usuarioRepository.findByEmailAndAtivoIsTrue("vallengeo.dev@gmail.com");

        accessToken = String.format("Bearer %s",
                JwtTestUtils.buildJwtToken(admin, null, secretKey, expiration, algorithm));

        expiredToken = String.format("Bearer %s",
                JwtTestUtils.buildJwtToken(admin, null, secretKey, -expiration, algorithm));
    }

    @Test @Order(1)
    @DisplayName("Integration Test - Cadastrar Pessoa quando Body Invalido deve Retornar Unsupported Media Type (415)")
    void testCadastrarPessoa_QuandoBodyInvalido_DeveRetornarUnsupportedMediaType() {
        ResponseOptions<?> response = given().spec(specification)
                .contentType(ContentType.TEXT).body(pessoaFisicaRequest.toString())
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when().post();

        assertEquals(HttpStatus.UNSUPPORTED_MEDIA_TYPE.value(), response.statusCode());
    }

    @Test @Order(2)
    @DisplayName("Integration Test - Cadastrar Pessoa quando Usuario Nao Autenticado deve Retornar Unauthorized (401)")
    void testCadastrarPessoa_QuandoUsuarioNaoAutenticado_DeveRetornarUnauthorized() {
        ResponseOptions<?> response = given().spec(specification)
                .body(pessoaFisicaRequest)
                .when().post();

        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.UNAUTHORIZED.value(), actual.getStatus());
        assertEquals(HttpStatus.UNAUTHORIZED.getReasonPhrase(), actual.getError());
        assertEquals(AccessDeniedException.class.getName(), actual.getException());
    }

    @Test @Order(3)
    @DisplayName("Integration Test - Cadastrar Pessoa quando Access Token Expirado deve Retornar Forbidden (403)")
    void testCadastrarPessoa_QuandoAccessTokenExpirado_DeveRetornarForbidden() {
        ResponseOptions<?> response = given().spec(specification)
                .body(pessoaFisicaRequest)
                .header(HttpHeaders.AUTHORIZATION, expiredToken)
                .when().post();

        assertEquals(HttpStatus.FORBIDDEN.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.FORBIDDEN.value(), actual.getStatus());
        assertEquals(HttpStatus.FORBIDDEN.getReasonPhrase(), actual.getError());
        assertEquals(ExpiredJwtException.class.getName(), actual.getException());
    }

    @Test @Order(4)
    @DisplayName("Integration Test - Cadastrar Pessoa Fisica quando Atributos Invalidos deve Retornar Bad Request (400)")
    void testCadastrarPessoaFisica_QuandoAtributosInvalidos_DeveRetornarBadRequest() {
        pessoaFisicaRequest.setEmail("email@invalido");
        pessoaFisicaRequest.setTelefone("");
        pessoaFisicaRequest.setNome(null);
        pessoaFisicaRequest.setCpf("12345678910");

        ResponseOptions<?> response = given().spec(specification)
                .body(pessoaFisicaRequest)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .when().post();

        assertEquals(HttpStatus.BAD_REQUEST.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.BAD_REQUEST.value(), actual.getStatus());
        assertEquals(HttpStatus.BAD_REQUEST.getReasonPhrase(), actual.getError());
        assertEquals(MethodArgumentNotValidException.class.getName(), actual.getException());

        Map<String, Object> erros = ExceptionTestUtils.errosListToMap(actual.getErros());

        assertEquals(Constants.EMAIL_INVALIDO, erros.get("email"));
        assertEquals(Constants.CAMPO_OBRIGATORIO, erros.get("telefone"));
        assertEquals(Constants.CAMPO_OBRIGATORIO, erros.get("nome"));
        assertEquals(Constants.DOCUMENTO_INVALIDO, erros.get("cpf"));
    }

    @Test @Order(5)
    @DisplayName("Integration Test - Cadastrar Pessoa Fisica quando Sucesso deve Retornar Created (201)")
    void testCadastrarPessoaFisica_QuandoSucesso_DeveRetornarCreated() {
        ResponseOptions<?> response = given().spec(specification)
                .body(pessoaFisicaRequest)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .when().post();

        assertEquals(HttpStatus.CREATED.value(), response.statusCode());
        Optional<Pessoa> actual = pessoaFisicaRepository.findByCpf(pessoaFisicaRequest.getCpf());

        assertTrue(actual.isPresent());
        assertNotNull(actual.get().getId());
        assertEquals(pessoaFisicaRequest.getEmail(), actual.get().getEmail());
        assertEquals(pessoaFisicaRequest.getTelefone(), actual.get().getTelefone());
        assertEquals(pessoaFisicaRequest.getNome(), ((PessoaFisica) actual.get()).getNome());
        assertEquals(pessoaFisicaRequest.getCpf(), ((PessoaFisica) actual.get()).getCpf());
        assertEquals(pessoaFisicaRequest.getRg(), ((PessoaFisica) actual.get()).getRg());

        pessoaFisicaCadastrada = (PessoaFisica) actual.get();
    }

    @Test @Order(6)
    @DisplayName("Integration Test - Cadastrar Pessoa Fisica quando CPF Ja Cadastrado deve Retornar Conflict (409)")
    void testCadastrarPessoaFisica_QuandoCpfJaCadastrado_DeveRetornarConflict() {
        ResponseOptions<?> response = given().spec(specification)
                .body(pessoaFisicaRequest)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .when().post();

        assertEquals(HttpStatus.CONFLICT.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.CONFLICT.value(), actual.getStatus());
        assertEquals(HttpStatus.CONFLICT.getReasonPhrase(), actual.getError());
        assertEquals(ValidatorException.class.getName(), actual.getException());
        assertEquals("CPF já cadastrado no sistema.", actual.getMessage());
    }

    @Test @Order(7)
    @DisplayName("Integration Test - Cadastrar Pessoa Juridica quando Atributos Invalidos deve Retornar Bad Request (400)")
    void testCadastrarPessoaJuridica_QuandoAtributosInvalidos_DeveRetornarBadRequest() {
        pessoaJuridicaRequest.setEmail("email@invalido");
        pessoaJuridicaRequest.setTelefone("");
        pessoaJuridicaRequest.setRazaoSocial(null);
        pessoaJuridicaRequest.setCnpj("96325874154123");
        pessoaJuridicaRequest.setResponsavel(null);

        ResponseOptions<?> response = given().spec(specification)
                .body(pessoaJuridicaRequest)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .when().post();

        assertEquals(HttpStatus.BAD_REQUEST.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.BAD_REQUEST.value(), actual.getStatus());
        assertEquals(HttpStatus.BAD_REQUEST.getReasonPhrase(), actual.getError());
        assertEquals(MethodArgumentNotValidException.class.getName(), actual.getException());

        Map<String, ?> erros = ExceptionTestUtils.errosListToMap(actual.getErros());

        assertEquals(Constants.EMAIL_INVALIDO, erros.get("email"));
        assertEquals(Constants.CAMPO_OBRIGATORIO, erros.get("telefone"));
        assertEquals(Constants.CAMPO_OBRIGATORIO, erros.get("razaoSocial"));
        assertEquals(Constants.DOCUMENTO_INVALIDO, erros.get("cnpj"));
        assertEquals("Informe o responsável", erros.get("responsavel"));
    }

    @Test @Order(8)
    @DisplayName("Integration Test - Cadastrar Pessoa Juridica quando Sucesso deve Retornar Created (201)")
    void testCadastrarPessoaJuridica_QuandoSucesso_DeveRetornarCreated() {
        ResponseOptions<?> response = given().spec(specification)
                .body(pessoaJuridicaRequest)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .when().post();

        assertEquals(HttpStatus.CREATED.value(), response.statusCode());

        Optional<Pessoa> actual = pessoaJuridicaRepository.findByCnpj(pessoaJuridicaRequest.getCnpj());

        assertTrue(actual.isPresent());
        assertNotNull(actual.get().getId());
        assertEquals(pessoaJuridicaRequest.getEmail(), actual.get().getEmail());
        assertEquals(pessoaJuridicaRequest.getTelefone(), actual.get().getTelefone());
        assertEquals(pessoaJuridicaRequest.getRazaoSocial(), ((PessoaJuridica) actual.get()).getRazaoSocial());
        assertEquals(pessoaJuridicaRequest.getCnpj(), ((PessoaJuridica) actual.get()).getCnpj());
        assertEquals(
                pessoaJuridicaRequest.getResponsavel().getCpf(),
                ((PessoaJuridica) actual.get()).getResponsavel().getCpf()
        );

        pessoaJuridicaCadastrada = (PessoaJuridica) actual.get();
    }

    @Test @Order(9)
    @DisplayName("Integration Test - Cadastrar Pessoa Juridica quando CNPJ Ja Cadastrado deve Retornar Conflict (409)")
    void testCadastrarPessoaJuridica_QuandoCnpjJaCadastrado_DeveRetornarConflict() {
        ResponseOptions<?> response = given().spec(specification)
                .body(pessoaJuridicaRequest)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .when().post();

        assertEquals(HttpStatus.CONFLICT.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.CONFLICT.value(), actual.getStatus());
        assertEquals(HttpStatus.CONFLICT.getReasonPhrase(), actual.getError());
        assertEquals(ValidatorException.class.getName(), actual.getException());
        assertEquals("CNPJ já cadastrado no sistema.", actual.getMessage());
    }

    @Test @Order(10)
    @DisplayName("Integration Test - Buscar Todos quando Usuario Nao Autenticado deve Retornar Unauthorized (401)")
    void testBuscarTodos_quandoUsuarioNaoAutenticado_DeveRetornarUnauthorized() {
        ResponseOptions<?> response = given().spec(specification)
                .when().get();

        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.UNAUTHORIZED.value(), actual.getStatus());
        assertEquals(HttpStatus.UNAUTHORIZED.getReasonPhrase(), actual.getError());
        assertEquals(AccessDeniedException.class.getName(), actual.getException());
    }

    @Test @Order(11)
    @DisplayName("Integration Test - Buscar Todos quando Access Token Expirado deve Retornar Forbidden (403)")
    void testBuscarTodos_QuandoAccessTokenExpirado_DeveRetornarForbidden() {
        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, expiredToken)
                .when().get();

        assertEquals(HttpStatus.FORBIDDEN.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.FORBIDDEN.value(), actual.getStatus());
        assertEquals(HttpStatus.FORBIDDEN.getReasonPhrase(), actual.getError());
        assertEquals(ExpiredJwtException.class.getName(), actual.getException());
    }

    @Test @Order(12)
    @DisplayName("Integration Test - Buscar Todos quando Sucesso deve Retornar OK (200)")
    void testBuscarTodos_QuandoSucesso_DeveRetornarOk() {
        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .when().get();

        assertEquals(HttpStatus.OK.value(), response.statusCode());
        var responseMapList = List.of(response.body().as(Map[].class));

        assertEquals(2, responseMapList.size());
    }

    @Test @Order(13)
    @DisplayName("Integration Test - Buscar Por Documento quando Usuario Nao Autenticado deve Retornar Unauthorized 401")
    void testBuscarPorDocument_QuandoUsuarioNaoAutenticado_DeveRetornarUnauthorized() {
        ResponseOptions<?> response = given().spec(specification)
                .param("documento", pessoaFisicaRequest.getCpf())
                .when().get("/buscar-por-documento");

        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.UNAUTHORIZED.value(), actual.getStatus());
        assertEquals(HttpStatus.UNAUTHORIZED.getReasonPhrase(), actual.getError());
        assertEquals(AccessDeniedException.class.getName(), actual.getException());
        assertEquals(Constants.UNAUTHORIZED_ERROR, actual.getMessage());
    }

    @Test @Order(14)
    @DisplayName("Integration Test - Buscar Por Documento quando Access Token Expirado deve Retornar Forbidden (403)")
    void testBuscarPorDocumento_QuandoAccessTokenExpirado_DeveRetornarForbidden() {
        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, expiredToken)
                .param("documento", pessoaFisicaRequest.getCpf())
                .when().get("/buscar-por-documento");

        assertEquals(HttpStatus.FORBIDDEN.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.FORBIDDEN.value(), actual.getStatus());
        assertEquals(HttpStatus.FORBIDDEN.getReasonPhrase(), actual.getError());
        assertEquals(ExpiredJwtException.class.getName(), actual.getException());
    }

    @Test @Order(15)
    @DisplayName("Integration Test - Buscar Por Documento quando Documento Nao Cadastrado deve Retornar Not Found (404)")
    void testBuscarPorDocumento_QuandoDocumentoNaoCadastrado_DeveRetornarNotFound() {
       ResponseOptions<?> actual = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .param("documento", "12345678910")
                .when().get("/buscar-por-documento");

       assertEquals(HttpStatus.NOT_FOUND.value(), actual.getStatusCode());
    }

    @Test @Order(16)
    @DisplayName("Integration Test - Buscar Por Documento Pessoa Fisica quando Sucesso deve Retornar OK (200)")
    void testBuscarPorDocumentoPessoaFisica_QuandoSucesso_DeveRetornarOk() {
        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .param("documento", pessoaFisicaRequest.getCpf())
                .when().get("/buscar-por-documento");

        assertEquals(HttpStatus.OK.value(), response.statusCode());
        PessoaResponse.PessoaFisica actual = response.body().as(PessoaResponse.PessoaFisica.class);

        assertNotNull(actual);
        assertEquals(pessoaFisicaRequest.getCpf(), actual.getCpf());
        assertEquals(pessoaFisicaRequest.getNome(), actual.getNome());
        assertEquals(pessoaFisicaRequest.getEmail(), actual.getEmail());
        assertEquals(pessoaFisicaRequest.getTelefone(), actual.getTelefone());
        assertEquals(pessoaFisicaRequest.getTipoPessoa().getNome(), actual.getTipoPessoa());
    }

    @Test @Order(17)
    @DisplayName("Integration Test - Buscar Por Documento Pessoa Juridica quando Sucesso deve Retornar OK (200)")
    void testBuscarPorDocumentoPessoaJuridica_QuandoSucesso_DeveRetornarOk() {
        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .param("documento", pessoaJuridicaRequest.getCnpj())
                .when().get("/buscar-por-documento");

        assertEquals(HttpStatus.OK.value(), response.statusCode());
        PessoaResponse.PessoaJuridica actual = response.body().as(PessoaResponse.PessoaJuridica.class);

        assertNotNull(actual);
        assertEquals(pessoaJuridicaRequest.getCnpj(), actual.getCnpj());
        assertEquals(pessoaJuridicaRequest.getRazaoSocial(), actual.getRazaoSocial());
        assertEquals(pessoaJuridicaRequest.getResponsavel().getCpf(), actual.getResponsavel().getCpf());
        assertEquals(pessoaJuridicaRequest.getEmail(), actual.getEmail());
        assertEquals(pessoaJuridicaRequest.getTelefone(), actual.getTelefone());
        assertEquals(pessoaJuridicaRequest.getTipoPessoa().getNome(), actual.getTipoPessoa());
    }

    @Test @Order(18)
    @DisplayName("Integration Test - Buscar Por Id quando Usuario Nao Autenticado deve Retornar Unauthorized (401)")
    void testBuscarPorId_QuandoUsuarioNaoAutenticado_DeveRetornarUnauthorized() {
        ResponseOptions<?> response = given().spec(specification)
                .pathParam("id", pessoaFisicaCadastrada.getId())
                .when().get("/{id}");

        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.UNAUTHORIZED.value(), actual.getStatus());
        assertEquals(HttpStatus.UNAUTHORIZED.getReasonPhrase(), actual.getError());
        assertEquals(AccessDeniedException.class.getName(), actual.getException());
    }

    @Test @Order(19)
    @DisplayName("Integration Test - Buscar Por Id quando Access Token Expirado deve Retornar Forbidden (403)")
    void testBuscarPorId_QuandoAccessTokenExpirado_DeveRetornarUnauthorized() {
        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, expiredToken)
                .pathParam("id", pessoaFisicaCadastrada.getId())
                .when().get("/{id}");

        assertEquals(HttpStatus.FORBIDDEN.value(), response.statusCode());
        ApiExceptionCustom actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.FORBIDDEN.value(), actual.getStatus());
        assertEquals(HttpStatus.FORBIDDEN.getReasonPhrase(), actual.getError());
        assertEquals(ExpiredJwtException.class.getName(), actual.getException());
    }

    @Test @Order(20)
    @DisplayName("Integration Test - Buscar Por Id quando Id Nao Encontrado deve Retornar Not Found (404)")
    void testBuscarPorId_QuandoIdNaoEncontrado_DeveRetornarUnauthorized() {
        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .pathParam("id", UUID.randomUUID())
                .when().get("/{id}");

        assertEquals(HttpStatus.NOT_FOUND.value(), response.statusCode());
    }

    @Test @Order(21)
    @DisplayName("Integration Test - Buscar Por Id Pessoa Fisica quando Sucesso deve Retornar OK (200)")
    void testBuscarPorIdPessoaFisica_QuandoSucesso_DeveRetornarOk() {
        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .pathParam("id", pessoaFisicaCadastrada.getId())
                .when().get("/{id}");

        assertEquals(HttpStatus.OK.value(), response.statusCode());
        PessoaResponse.PessoaFisica actual = response.body().as(PessoaResponse.PessoaFisica.class);

        assertNotNull(actual);
        assertEquals(actual.getId(), pessoaFisicaCadastrada.getId().toString());
        assertEquals(actual.getCpf(), pessoaFisicaCadastrada.getCpf());
        assertEquals(actual.getEmail(), pessoaFisicaCadastrada.getEmail());
    }

    @Test @Order(22)
    @DisplayName("Integration Test - Buscar Por Id Pessoa Juridica quando Sucesso deve Retornar OK (200)")
    void testBuscarPorIdPessoaJuridica_QuandoSucesso_DeveRetornarOk() {
        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .pathParam("id", pessoaJuridicaCadastrada.getId())
                .when().get("/{id}");

        assertEquals(HttpStatus.OK.value(), response.statusCode());
        PessoaResponse.PessoaJuridica actual = response.body().as(PessoaResponse.PessoaJuridica.class);

        assertNotNull(actual);
        assertEquals(actual.getId(), pessoaJuridicaCadastrada.getId().toString());
        assertEquals(actual.getCnpj(), pessoaJuridicaCadastrada.getCnpj());
        assertEquals(actual.getRazaoSocial(), pessoaJuridicaCadastrada.getRazaoSocial());
        assertEquals(actual.getResponsavel().getId(), pessoaJuridicaCadastrada.getResponsavel().getId().toString());
    }

    @Test @Order(23)
    @DisplayName("Integration Test - Editar Pessoa quando Usuario Nao Autenticado deve Retornar Unauthorized (401)")
    void testEditarPessoa_QuandoUsuarioNaoAutenticado_DeveRetornarUnauthorized() {
        ResponseOptions<?> response = given().spec(specification)
                .when().put();

        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.statusCode());
        ApiExceptionCustom actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.UNAUTHORIZED.value(), actual.getStatus());
        assertEquals(HttpStatus.UNAUTHORIZED.getReasonPhrase(), actual.getError());
        assertEquals(AccessDeniedException.class.getName(), actual.getException());
    }

    @Test @Order(24)
    @DisplayName("Integration Test - Editar Pessoa quando Access Token Expirado deve Retornar Forbidden (403)")
    void testEditarPessoa_QuandoAccessTokenExpirado_DeveRetornarForbidden() {
        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, expiredToken)
                .when().put();

        assertEquals(HttpStatus.FORBIDDEN.value(), response.statusCode());
        ApiExceptionCustom actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.FORBIDDEN.value(), actual.getStatus());
        assertEquals(HttpStatus.FORBIDDEN.getReasonPhrase(), actual.getError());
        assertEquals(ExpiredJwtException.class.getName(), actual.getException());
    }

    @Test @Order(25)
    @DisplayName("Integration Test - Editar Pessoa quando Parametros Divergentes deve Retornar Not Acceptable (406)")
    void testEditarPessoa_QuandoParametrosDivergentes_DeveRetornarNotAcceptable() {
        ResponseOptions<?> response = given().spec(specification)
                .body(pessoaFisicaRequest)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .pathParam("id", pessoaFisicaCadastrada.getId())
                .when().put("/{id}");

        assertEquals(HttpStatus.NOT_ACCEPTABLE.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.NOT_ACCEPTABLE.value(), actual.getStatus());
        assertEquals(HttpStatus.NOT_ACCEPTABLE.getReasonPhrase(), actual.getError());
        assertEquals(ValidatorException.class.getName(), actual.getException());
        assertEquals(Constants.PARAMETER_DIVERGENT, actual.getMessage());
    }

    @Test @Order(26)
    @DisplayName("Integration Test - Editar Pessoa quando Id Nao Encontrado deve Retornar Not Found (404)")
    void testEditarPessoa_QuandoIdNaoEncontrado_DeveRetornarNotFound() {
        pessoaFisicaRequest.setId(UUID.randomUUID().toString());

        ResponseOptions<?> response = given().spec(specification)
                .body(pessoaFisicaRequest)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .pathParam("id", pessoaFisicaRequest.getId())
                .when().put("/{id}");

        assertEquals(HttpStatus.NOT_FOUND.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.NOT_FOUND.value(), actual.getStatus());
        assertEquals(HttpStatus.NOT_FOUND.getReasonPhrase(), actual.getError());
        assertEquals(ValidatorException.class.getName(), actual.getException());
    }

    @Test @Order(27)
    @DisplayName("Integration Test - Editar Pessoa quando Pessoa Fisica & Sucesso deve Retornar Created (201)")
    void testEditarPessoa_QuandoPessoaFisicaSucesso_DeveRetornarCreated() {
        pessoaFisicaRequest.setId(pessoaFisicaCadastrada.getId().toString());
        pessoaFisicaRequest.setNome("Nome Editado");
        pessoaFisicaRequest.setTelefone("(35) 2724-7433");
        pessoaFisicaRequest.setEmail("pessoafisica.editado@email.com");

        ResponseOptions<?> response = given().spec(specification)
                .body(pessoaFisicaRequest)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .pathParam("id", pessoaFisicaCadastrada.getId())
                .when().put("/{id}");

        assertEquals(HttpStatus.CREATED.value(), response.statusCode());
        PessoaResponse.PessoaFisica actual = response.body().as(PessoaResponse.PessoaFisica.class);

        assertEquals(pessoaFisicaRequest.getId(), actual.getId());
        assertEquals(pessoaFisicaRequest.getNome(), actual.getNome());
        assertEquals(pessoaFisicaRequest.getEmail(), actual.getEmail());
        assertEquals(pessoaFisicaRequest.getTelefone(), actual.getTelefone());
    }

    @Test @Order(28)
    @DisplayName("Integration Test - Editar Pessoa quando Pessoa Juridica & Sucesso deve Retornar Created (201)")
    void testEditarPessoa_QuandoPessoaJuridicaSucesso_DeveRetornarCreated() {
        pessoaJuridicaRequest.setId(pessoaJuridicaCadastrada.getId().toString());
        pessoaJuridicaRequest.setRazaoSocial("Razao Social Editada");
        pessoaJuridicaRequest.setTelefone("(22) 3074-5553");
        pessoaJuridicaRequest.setEmail("pessoajuridica.editado@email.com");

        ResponseOptions<?> response = given().spec(specification)
                .body(pessoaJuridicaRequest)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .pathParam("id", pessoaJuridicaCadastrada.getId())
                .when().put("/{id}");

        assertEquals(HttpStatus.CREATED.value(), response.statusCode());
        PessoaResponse.PessoaJuridica actual = response.body().as(PessoaResponse.PessoaJuridica.class);

        assertEquals(pessoaJuridicaRequest.getId(), actual.getId());
        assertEquals(pessoaJuridicaRequest.getEmail(), actual.getEmail());
        assertEquals(pessoaJuridicaRequest.getTelefone(), actual.getTelefone());
        assertEquals(pessoaJuridicaRequest.getRazaoSocial(), actual.getRazaoSocial());
    }
}