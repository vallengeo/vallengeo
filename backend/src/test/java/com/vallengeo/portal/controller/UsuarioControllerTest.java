package com.vallengeo.portal.controller;

import com.vallengeo.core.exceptions.ApiExceptionCustom;
import com.vallengeo.core.exceptions.InvalidPasswordException;
import com.vallengeo.core.exceptions.custom.UnauthorizedException;
import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.core.util.Constants;
import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.portal.model.Grupo;
import com.vallengeo.portal.model.Usuario;
import com.vallengeo.portal.payload.request.usuario.*;
import com.vallengeo.portal.payload.response.UsuarioResponse;
import com.vallengeo.portal.repository.UsuarioRepository;
import com.vallengeo.utils.ExceptionTestUtils;
import com.vallengeo.utils.JwtTestUtils;
import com.vallengeo.utils.UsuarioTestUtils;
import io.jsonwebtoken.ExpiredJwtException;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Usuario Controller Tests")
@TestMethodOrder(MethodOrderer.MethodName.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class UsuarioControllerTest extends AbstractIntegrationTest {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private BCryptPasswordEncoder encoder;

    @Value("${server.port}")
    private int serverPort;
    @Value("${api.security.token.secret}")
    private String secretKey;
    @Value("${api.security.token.expiration}")
    private Long expiration;
    @Value("${api.security.token.algorithm}")
    private String algorithm;

    private RequestSpecification specification;
    private CadastroRequest cadastroRequest;
    private CadastroSimplificadoRequest simplificadoRequest;
    private EsqueciMinhaSenhaRequest esqueciMinhaSenhaRequest;
    private RedefinirSenhaRequest redefinirSenhaRequest;
    private Usuario admin;
    private String accessToken;
    private String expiredAccessToken;

    private final String moduloPrefeitura = "PREFEITURA";

    @BeforeEach
    public void setup() {
        specification = new RequestSpecBuilder()
                .setBasePath("/api/v1/usuario")
                .setPort(serverPort)
                .build();

        admin = (Usuario) usuarioRepository.findByEmailAndAtivoIsTrue("vallengeo.dev@gmail.com");

        Grupo grupo = admin.getGrupos().get(0);
        accessToken = JwtTestUtils.buildJwtToken(admin, String.valueOf(grupo.getId()), secretKey, expiration, algorithm);
        expiredAccessToken = JwtTestUtils.buildJwtToken(admin, String.valueOf(grupo.getId()), secretKey, -expiration, algorithm);

        simplificadoRequest = new CadastroSimplificadoRequest(
                "usuario_simplificado@email.com",
                UsuarioTestUtils.getPerfisFromEntity(admin),
                UsuarioTestUtils.getGruposFromEntity(admin),
                moduloPrefeitura
        );

        cadastroRequest = new CadastroRequest(
                "usuario@email.com",
                UsuarioTestUtils.getPerfisFromEntity(admin),
                UsuarioTestUtils.getGruposFromEntity(admin),
                UsuarioTestUtils.getTelasFromEntity(admin),
                moduloPrefeitura
        );

        esqueciMinhaSenhaRequest = new EsqueciMinhaSenhaRequest(admin.getEmail(), moduloPrefeitura);
        redefinirSenhaRequest = new RedefinirSenhaRequest("newPassword@123", admin.getCodigoAcesso());
    }

    @Test
    @DisplayName("Integration Test - Cadastro Simplificado quando Usuario nao Autenticado Deve Retornar Unauthorized (401)")
    void testCadastroSimplificado_QuandoUsuarioNaoAutenticado_DeveRetornarUnauthorized() {
        var content = given().spec(specification)
                .contentType(ContentType.JSON).body(simplificadoRequest)
                .when().post("/simplificado")
                .then().statusCode(HttpStatus.UNAUTHORIZED.value())
                .extract().body().asString();

        var actual = ExceptionTestUtils.stringToApiExceptionCustom(content);

        assertEquals(HttpStatus.UNAUTHORIZED.value(), actual.getStatus());
        assertEquals(HttpStatus.UNAUTHORIZED.getReasonPhrase(), actual.getError());
        assertEquals(AccessDeniedException.class.getName(), actual.getException());
    }

    @Test
    @DisplayName("Integration Test - Cadastro Simplificado quando Body Invalido deve Retornar Unsupported Media Type (415)")
    void testCadastroSimplificado_QuandoBodyInvalido_DeveRetornarUnsupportedMediaType() {
        given().spec(specification)
                .contentType(ContentType.XML).body(simplificadoRequest.toString())
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when().post("/simplificado")
                .then().statusCode(HttpStatus.UNSUPPORTED_MEDIA_TYPE.value());
    }

    @Test
    @DisplayName("Integration Test - Cadastro Simplificado quando AccessToken Expirado Deve Retornar Forbidden (403)")
    void testCadastroSimplificado_QuandoAccessTokenExpirado_DeveRetornarForbidden() {
        var content = given().spec(specification)
                .contentType(ContentType.JSON).body(simplificadoRequest)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + expiredAccessToken)
                .when().post("/simplificado")
                .then().statusCode(HttpStatus.FORBIDDEN.value())
                .extract().body().asString();

        var actual = ExceptionTestUtils.stringToApiExceptionCustom(content);

        assertEquals(HttpStatus.FORBIDDEN.value(), actual.getStatus());
        assertEquals(HttpStatus.FORBIDDEN.getReasonPhrase(), actual.getError());
        assertEquals(ExpiredJwtException.class.getName(), actual.getException());
        assertEquals(Constants.FALHA_AUTENTICACAO, actual.getMessageTitle());
    }

    @Test
    @DisplayName("Integration Test - Cadastro Simplificado quando Atributos da Request são Invalidos Deve Retornar Bad Request (400)")
    void testCadastroSimplificado_QuandoAtributosRequestInvalidos_DeveRetornarBadRequest() {
        var requestInvalida = new CadastroSimplificadoRequest(
                "   ", new ArrayList<>(), null, null);

        String content = given().spec(specification)
                .contentType(ContentType.JSON).body(requestInvalida)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when().post("/simplificado")
                .then().statusCode(HttpStatus.BAD_REQUEST.value())
                .extract().body().asString();

        ApiExceptionCustom actual = ExceptionTestUtils.stringToApiExceptionCustom(content);

        assertEquals(HttpStatus.BAD_REQUEST.value(), actual.getStatus());
        assertEquals(MethodArgumentNotValidException.class.getName(), actual.getException());

        for (String error: actual.getErros()) {
            assertTrue(error.contains(Constants.CAMPO_OBRIGATORIO));
        }
    }

    @Test
    @DisplayName("Integration Test - Cadastro Simplificado quando Sucesso Deve Retornar Created (201)")
    void testCadastroSimplificado_QuandoSucesso_DeveRetornarCreated() {
        String content = given().spec(specification)
                .contentType(ContentType.JSON).body(simplificadoRequest)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when().post("/simplificado")
                .then().statusCode(HttpStatus.CREATED.value())
                .extract().body().asString();

        assertEquals(Constants.SALVO_SUCESSO, content);
        Optional<Usuario> usuarioCadastrado = usuarioRepository.findByEmail(simplificadoRequest.email());

        assertTrue(usuarioCadastrado.isPresent());
        assertFalse(usuarioCadastrado.get().getAtivo());
        assertEquals(simplificadoRequest.email(), usuarioCadastrado.get().getEmail());
        assertNotNull(usuarioCadastrado.get().getPerfis());
        assertNotNull(usuarioCadastrado.get().getGrupos());
    }

    @Test
    @DisplayName("Integration Test - Cadastro quando Usuario Nao Autenticado Deve Retornar Unauthorized (401)")
    void testCadastro_QuandoUsuarioNaoAutenticado_DeveRetornarUnauthorized() {
        String content = given().spec(specification)
                .contentType(ContentType.JSON).body(cadastroRequest)
                .when().post()
                .then().statusCode(HttpStatus.UNAUTHORIZED.value())
                .extract().body().asString();

        ApiExceptionCustom actual = ExceptionTestUtils.stringToApiExceptionCustom(content);

        assertEquals(HttpStatus.UNAUTHORIZED.value(), actual.getStatus());
        assertEquals(HttpStatus.UNAUTHORIZED.getReasonPhrase(), actual.getError());
        assertEquals(AccessDeniedException.class.getName(), actual.getException());
    }

    @Test
    @DisplayName("Integration Test - Cadastro quando Body Invalido deve Retornar Unsupported Media Type (415)")
    void testCadastro_QuandoBodyInvalido_DeveRetornarUnsupportedMediaType() {
        given().spec(specification)
                .contentType(ContentType.XML).body(cadastroRequest.toString())
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when().post()
                .then().statusCode(HttpStatus.UNSUPPORTED_MEDIA_TYPE.value());
    }
    @Test
    @DisplayName("Integration Test - Cadastro quando AccessToken Expirado Deve Retornar Forbidden (403)")
    void testCadastro_QuandoAccessTokenExpirado_DeveRetornarForbidden() {
        String content = given().spec(specification)
                .contentType(ContentType.JSON).body(cadastroRequest)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + expiredAccessToken)
                .when().post()
                .then().statusCode(HttpStatus.FORBIDDEN.value())
                .extract().body().asString();

        ApiExceptionCustom actual = ExceptionTestUtils.stringToApiExceptionCustom(content);

        assertEquals(HttpStatus.FORBIDDEN.value(), actual.getStatus());
        assertEquals(HttpStatus.FORBIDDEN.getReasonPhrase(), actual.getError());
        assertEquals(ExpiredJwtException.class.getName(), actual.getException());
        assertEquals(Constants.FALHA_AUTENTICACAO, actual.getMessageTitle());
    }

    @Test
    @DisplayName("Integration Test - Cadastro quando Atributos da Request são Invalidos Deve Retornar Bad Request (400)")
    void testCadastro_QuandoAtributosRequestInvalidos_DeveRetornarBadRequest() {
        var requestInvalida = new CadastroRequest(
                null, new ArrayList<>(), null, new ArrayList<>(), "");

        String content = given().spec(specification)
                .contentType(ContentType.JSON).body(requestInvalida)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when().post()
                .then().statusCode(HttpStatus.BAD_REQUEST.value())
                .extract().body().asString();

        ApiExceptionCustom actual = ExceptionTestUtils.stringToApiExceptionCustom(content);

        assertEquals(HttpStatus.BAD_REQUEST.value(), actual.getStatus());
        assertEquals(MethodArgumentNotValidException.class.getName(), actual.getException());

        for (String error: actual.getErros()) {
            assertTrue(error.contains(Constants.CAMPO_OBRIGATORIO));
        }
    }

    @Test
    @DisplayName("Integration Test - Cadastro quando Sucesso Deve Retornar Created (201)")
    void testCadastro_QuandoSucesso_DeveRetornarCreated() {
        String content = given().spec(specification)
                .contentType(ContentType.JSON).body(cadastroRequest)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when().post()
                .then().statusCode(HttpStatus.CREATED.value())
                .extract().body().asString();

        assertEquals(Constants.SALVO_SUCESSO, content);
        Optional<Usuario> usuarioCadastrado = usuarioRepository.findByEmail(cadastroRequest.email());

        assertTrue(usuarioCadastrado.isPresent());
        assertFalse(usuarioCadastrado.get().getAtivo());
        assertEquals(cadastroRequest.email(), usuarioCadastrado.get().getEmail());
        assertNotNull(usuarioCadastrado.get().getPerfis());
        assertNotNull(usuarioCadastrado.get().getGrupos());
    }

    @Test
    @DisplayName("Integration Test - Listar Usuarios quando Usuario nao Autenticado Deve Retornar Unauthorized (401)")
    void testListarUsuarios_QuandoUsuarioNaoAutenticado_DeveRetornarUnauthorized() {
        String content = given().spec(specification)
                .when().get()
                .then().statusCode(HttpStatus.UNAUTHORIZED.value())
                .extract().body().asString();

        ApiExceptionCustom actual = ExceptionTestUtils.stringToApiExceptionCustom(content);

        assertEquals(HttpStatus.UNAUTHORIZED.value(), actual.getStatus());
        assertEquals(HttpStatus.UNAUTHORIZED.getReasonPhrase(), actual.getError());
        assertEquals(AccessDeniedException.class.getName(), actual.getException());
    }

    @Test
    @DisplayName("Integration Test - Listar Usuarios quando AccessToken Expirado Deve Retornar Forbidden (403)")
    void testListarUsuarios_QuandoAccessTokenExpirado_DeveRetornarForbidden() {
        String content = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + expiredAccessToken)
                .when().get()
                .then().statusCode(HttpStatus.FORBIDDEN.value())
                .extract().body().asString();

        ApiExceptionCustom actual = ExceptionTestUtils.stringToApiExceptionCustom(content);

        assertEquals(HttpStatus.FORBIDDEN.value(), actual.getStatus());
        assertEquals(HttpStatus.FORBIDDEN.getReasonPhrase(), actual.getError());
        assertEquals(ExpiredJwtException.class.getName(), actual.getException());
    }

    @Test
    @DisplayName("Integration Test - Listar Usuarios quando Sucesso Deve Retornar OK (200)")
    void testListarUsuarios_QuandoSucesso_DeveRetornarOk() {
        UsuarioResponse[] content = given().spec(specification)
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when().get()
                .then().statusCode(HttpStatus.OK.value())
                .extract().body().as(UsuarioResponse[].class);

        List<UsuarioResponse> actual = Arrays.stream(content).toList();

        assertEquals(5, actual.size());
        assertInstanceOf(UsuarioResponse.class, actual.get(0));
    }

    @Test
    @DisplayName("Integration Test - Esqueci Minha Senha quando Body Invalido deve Retornar Unsupported Media Type (415)")
    void testEsqueciMinhaSenha_QuandoBodyInvalido_DeveRetornarUnsupportedMediaType() {
        given().spec(specification)
                .contentType(ContentType.XML).body(esqueciMinhaSenhaRequest.toString())
                .when().post("/esqueci-minha-senha")
                .then().statusCode(HttpStatus.UNSUPPORTED_MEDIA_TYPE.value());
    }

    @Test
    @DisplayName("Integration Test - Esqueci Minha Senha quando Usuario Nao Encontrado Deve Retornar Not Found (404)")
    void testEsqueciMinhaSenha_QuandoUsuarioNaoCadastrado_DeveRetornarNotFound() {
        EsqueciMinhaSenhaRequest request = new EsqueciMinhaSenhaRequest(
                "usuario_naocadastrado@email.com", moduloPrefeitura);

        String content = given().spec(specification)
                .contentType(ContentType.JSON).body(request)
                .when().post("/esqueci-minha-senha")
                .then().statusCode(HttpStatus.NOT_FOUND.value())
                .extract().body().asString();

        ApiExceptionCustom actual = ExceptionTestUtils.stringToApiExceptionCustom(content);

        assertEquals(HttpStatus.NOT_FOUND.value(), actual.getStatus());
        assertEquals(HttpStatus.NOT_FOUND.getReasonPhrase(), actual.getError());
        assertEquals(ValidatorException.class.getName(), actual.getException());

    }

    @Test
    @DisplayName("Integration Test - Esqueci Minha Senha quando Sucesso deve Retornar OK (200)")
    void testEsqueciMinhaSenha_QuandoSucesso_DeveRetornarOk() {
        given().spec(specification)
                .contentType(ContentType.JSON).body(esqueciMinhaSenhaRequest)
                .when().post("/esqueci-minha-senha")
                .then().statusCode(HttpStatus.OK.value());

        Optional<Usuario> actual = usuarioRepository.findByEmail(admin.getEmail());

        assertTrue(actual.isPresent());
        assertNotNull(actual.get().getCodigoAcesso());
        assertInstanceOf(String.class, actual.get().getCodigoAcesso());
        assertEquals(6, actual.get().getCodigoAcesso().length());
    }

    @Test
    @DisplayName("Integration Test - Redefinir Senha quando Body Invalido deve Retornar Unsupported Media Type (415)")
    void testRedefinirSenha_QuandoBodyInvalido_DeveRetornarUnsupportedMediaType() {
        given().spec(specification)
                .contentType(ContentType.XML).body(redefinirSenhaRequest.toString())
                .when().post("/recuperar-senha")
                .then().statusCode(HttpStatus.UNSUPPORTED_MEDIA_TYPE.value());
    }

    @Test
    @DisplayName("Integration Test - Redefinir Senha quando Senha Invalida deve Retornar Not Acceptable (406)")
    public void testRedefinirSenha_QuandoSenhaInvalida_DeveRetornarNotAcceptable() {
        RedefinirSenhaRequest request = new RedefinirSenhaRequest(
                "senhaInvalida", admin.getCodigoAcesso());

        var content = given().spec(specification)
                .contentType(ContentType.JSON).body(request)
                .when().post("/recuperar-senha")
                .then().statusCode(HttpStatus.NOT_ACCEPTABLE.value())
                .extract().asString();

        ApiExceptionCustom actual = ExceptionTestUtils.stringToApiExceptionCustom(content);

        assertEquals(HttpStatus.NOT_ACCEPTABLE.value(), actual.getStatus());
        assertEquals(HttpStatus.NOT_ACCEPTABLE.getReasonPhrase(), actual.getError());
        assertEquals(InvalidPasswordException.class.getName(), actual.getException());
        assertEquals(Constants.INVALID_PASSWORD, actual.getMessage());
    }

    @Test
    @DisplayName("Integration Test - Redefinir Senha quando Codigo de Acesso Nao Encontrado deve Retornar Not Found (404)")
    void testRedefinirSenha_QuandoCodigoDeAcessoNaoCadastrado_DeveRetornarNotFound() {
        RedefinirSenhaRequest request = new RedefinirSenhaRequest(
                UsuarioTestUtils.DEFAULT_PASSWORD, "789ABC");

        var content = given().spec(specification)
                .contentType(ContentType.JSON).body(request)
                .when().post("/recuperar-senha")
                .then().statusCode(HttpStatus.NOT_FOUND.value())
                .extract().asString();

        ApiExceptionCustom actual = ExceptionTestUtils.stringToApiExceptionCustom(content);

        assertEquals(HttpStatus.NOT_FOUND.value(), actual.getStatus());
        assertEquals(HttpStatus.NOT_FOUND.getReasonPhrase(), actual.getError());
        assertEquals(ValidatorException.class.getName(), actual.getException());
    }

    @Test
    @DisplayName("Integration Test - Redefinir Senha quando Codigo de Acesso Expirado deve Retornar Unauthorized (401)")
    void testRedefinirSenha_QuandoCodigoDeAcessoExpirado_DeveRetornarUnauthorized() {
        admin.setValidadeCodigo(LocalDateTime.now().minusMinutes(10));
        usuarioRepository.save(admin);

        var content = given().spec(specification)
                .contentType(ContentType.JSON).body(redefinirSenhaRequest)
                .when().post("/recuperar-senha")
                .then().statusCode(HttpStatus.UNAUTHORIZED.value())
                .extract().asString();

        ApiExceptionCustom actual = ExceptionTestUtils.stringToApiExceptionCustom(content);

        assertEquals(HttpStatus.UNAUTHORIZED.value(), actual.getStatus());
        assertEquals(HttpStatus.UNAUTHORIZED.getReasonPhrase(), actual.getError());
        assertEquals(UnauthorizedException.class.getName(), actual.getException());
        assertEquals("Código de acesso expirado.", actual.getMessage());
    }

    @Test
    @DisplayName("Integration Test - Redefinir Senha quando Sucesso deve Retornar OK (200)")
    void testRedefinirSenha_QuandoSucesso_DeveRetornarOk() {
        admin.setValidadeCodigo(LocalDateTime.now().plusMinutes(10));
        usuarioRepository.save(admin);

        given().spec(specification)
                .contentType(ContentType.JSON).body(redefinirSenhaRequest)
                .when().post("/recuperar-senha")
                .then().statusCode(HttpStatus.OK.value());

        Optional<Usuario> actual = usuarioRepository.findByEmail(admin.getEmail());

        assertTrue(actual.isPresent());
        assertEquals(admin.getId(), actual.get().getId());
        assertTrue(encoder.matches(redefinirSenhaRequest.senha(), actual.get().getPassword()));
    }
}