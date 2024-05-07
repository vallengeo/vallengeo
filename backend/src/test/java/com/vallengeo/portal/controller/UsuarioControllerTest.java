package com.vallengeo.portal.controller;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.core.exceptions.ApiExceptionCustom;
import com.vallengeo.core.exceptions.InvalidPasswordException;
import com.vallengeo.core.exceptions.custom.UnauthorizedException;
import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.core.util.Constants;
import com.vallengeo.portal.model.Usuario;
import com.vallengeo.portal.payload.request.usuario.CadastroRequest;
import com.vallengeo.portal.payload.request.usuario.CadastroSimplificadoRequest;
import com.vallengeo.portal.payload.request.usuario.EsqueciMinhaSenhaRequest;
import com.vallengeo.portal.payload.request.usuario.RedefinirSenhaRequest;
import com.vallengeo.portal.payload.response.UsuarioResponse;
import com.vallengeo.portal.repository.UsuarioRepository;
import com.vallengeo.utils.JwtTestUtils;
import com.vallengeo.utils.UsuarioTestUtils;
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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.time.LocalDateTime;
import java.util.*;

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

    private EsqueciMinhaSenhaRequest esqueciMinhaSenhaRequest;
    private CadastroSimplificadoRequest simplificadoRequest;
    private RedefinirSenhaRequest redefinirSenhaRequest;
    private CadastroRequest cadastroRequest;
    private Usuario admin;

    private static String accessToken;
    private static String expiredAccessToken;
    private static RequestSpecification specification;
    private static final String moduloPrefeitura = "PREFEITURA";

    @BeforeEach
    public void setup() {
        specification = new RequestSpecBuilder()
                .setContentType(ContentType.JSON)
                .setBasePath("/api/v1/usuario")
                .setPort(serverPort)
                .build();

        if (Objects.isNull(admin))
            admin = (Usuario) usuarioRepository.findByEmailAndAtivoIsTrue("vallengeo.dev@gmail.com");

        accessToken = JwtTestUtils.buildJwtToken(admin, null, secretKey, expiration, algorithm);
        expiredAccessToken = JwtTestUtils.buildJwtToken(admin, null, secretKey, -expiration, algorithm);

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
        ResponseOptions<?> response = given().spec(specification)
                .body(simplificadoRequest)
                .when().post("/simplificado");

        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.UNAUTHORIZED.value(), actual.getStatus());
        assertEquals(HttpStatus.UNAUTHORIZED.getReasonPhrase(), actual.getError());
        assertEquals(AccessDeniedException.class.getName(), actual.getException());
    }

    @Test
    @DisplayName("Integration Test - Cadastro Simplificado quando Body Invalido deve Retornar Unsupported Media Type (415)")
    void testCadastroSimplificado_QuandoBodyInvalido_DeveRetornarUnsupportedMediaType() {
        ResponseOptions<?> response = given().spec(specification)
                .contentType(ContentType.XML).body(simplificadoRequest.toString())
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when().post("/simplificado");

        assertEquals(HttpStatus.UNSUPPORTED_MEDIA_TYPE.value(), response.statusCode());
    }

    @Test
    @DisplayName("Integration Test - Cadastro Simplificado quando AccessToken Expirado Deve Retornar Forbidden (403)")
    void testCadastroSimplificado_QuandoAccessTokenExpirado_DeveRetornarForbidden() {
        ResponseOptions<?> response = given().spec(specification)
                .body(simplificadoRequest)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + expiredAccessToken)
                .when().post("/simplificado");

        assertEquals(HttpStatus.FORBIDDEN.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

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

        ResponseOptions<?> response = given().spec(specification)
                .body(requestInvalida)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when().post("/simplificado");


        assertEquals(HttpStatus.BAD_REQUEST.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.BAD_REQUEST.value(), actual.getStatus());
        assertEquals(MethodArgumentNotValidException.class.getName(), actual.getException());

        for (String error: actual.getErros()) {
            assertTrue(error.contains(Constants.CAMPO_OBRIGATORIO));
        }
    }

    @Test
    @DisplayName("Integration Test - Cadastro Simplificado quando Sucesso Deve Retornar Created (201)")
    void testCadastroSimplificado_QuandoSucesso_DeveRetornarCreated() {
        ResponseOptions<?> response = given().spec(specification)
                .body(simplificadoRequest)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when().post("/simplificado");

        assertEquals(HttpStatus.CREATED.value(), response.statusCode());
        assertEquals(Constants.SALVO_SUCESSO, response.body().asString());

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
        ResponseOptions<?> response = given().spec(specification)
                .body(cadastroRequest)
                .when().post();

        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.statusCode());
        ApiExceptionCustom actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.UNAUTHORIZED.value(), actual.getStatus());
        assertEquals(HttpStatus.UNAUTHORIZED.getReasonPhrase(), actual.getError());
        assertEquals(AccessDeniedException.class.getName(), actual.getException());
    }

    @Test
    @DisplayName("Integration Test - Cadastro quando Body Invalido deve Retornar Unsupported Media Type (415)")
    void testCadastro_QuandoBodyInvalido_DeveRetornarUnsupportedMediaType() {
        ResponseOptions<?> response = given().spec(specification)
                .contentType(ContentType.XML).body(cadastroRequest.toString())
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when().post();

        assertEquals(HttpStatus.UNSUPPORTED_MEDIA_TYPE.value(), response.statusCode());
    }
    @Test
    @DisplayName("Integration Test - Cadastro quando AccessToken Expirado Deve Retornar Forbidden (403)")
    void testCadastro_QuandoAccessTokenExpirado_DeveRetornarForbidden() {
        ResponseOptions<?> response = given().spec(specification)
                .body(cadastroRequest)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + expiredAccessToken)
                .when().post();

        assertEquals(HttpStatus.FORBIDDEN.value(), response.statusCode());
        ApiExceptionCustom actual = response.body().as(ApiExceptionCustom.class);

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

        ResponseOptions<?> response = given().spec(specification)
                .body(requestInvalida)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when().post();

        assertEquals(HttpStatus.BAD_REQUEST.value(), response.statusCode());
        ApiExceptionCustom actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.BAD_REQUEST.value(), actual.getStatus());
        assertEquals(MethodArgumentNotValidException.class.getName(), actual.getException());

        for (String error: actual.getErros()) {
            assertTrue(error.contains(Constants.CAMPO_OBRIGATORIO));
        }
    }

    @Test
    @DisplayName("Integration Test - Cadastro quando Sucesso Deve Retornar Created (201)")
    void testCadastro_QuandoSucesso_DeveRetornarCreated() {
        ResponseOptions<?> response = given().spec(specification)
                .body(cadastroRequest)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when().post();

        assertEquals(HttpStatus.CREATED.value(), response.statusCode());
        assertEquals(Constants.SALVO_SUCESSO, response.body().asString());

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
        ResponseOptions<?> response = given().spec(specification)
                .when().get();

        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.statusCode());
        ApiExceptionCustom actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.UNAUTHORIZED.value(), actual.getStatus());
        assertEquals(HttpStatus.UNAUTHORIZED.getReasonPhrase(), actual.getError());
        assertEquals(AccessDeniedException.class.getName(), actual.getException());
    }

    @Test
    @DisplayName("Integration Test - Listar Usuarios quando AccessToken Expirado Deve Retornar Forbidden (403)")
    void testListarUsuarios_QuandoAccessTokenExpirado_DeveRetornarForbidden() {
        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + expiredAccessToken)
                .when().get();

        assertEquals(HttpStatus.FORBIDDEN.value(), response.statusCode());
        ApiExceptionCustom actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.FORBIDDEN.value(), actual.getStatus());
        assertEquals(HttpStatus.FORBIDDEN.getReasonPhrase(), actual.getError());
        assertEquals(ExpiredJwtException.class.getName(), actual.getException());
    }

    @Test
    @DisplayName("Integration Test - Listar Usuarios quando Sucesso Deve Retornar OK (200)")
    void testListarUsuarios_QuandoSucesso_DeveRetornarOk() {
        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when().get();

        assertEquals(HttpStatus.OK.value(), response.statusCode());
        List<UsuarioResponse> actual = Arrays.asList( response.body().as(UsuarioResponse[].class) );

        assertEquals(5, actual.size());
        assertInstanceOf(UsuarioResponse.class, actual.get(0));
    }

    @Test
    @DisplayName("Integration Test - Esqueci Minha Senha quando Body Invalido deve Retornar Unsupported Media Type (415)")
    void testEsqueciMinhaSenha_QuandoBodyInvalido_DeveRetornarUnsupportedMediaType() {
        ResponseOptions<?> response = given().spec(specification)
                .contentType(ContentType.XML).body(esqueciMinhaSenhaRequest.toString())
                .when().post("/esqueci-minha-senha");

        assertEquals(HttpStatus.UNSUPPORTED_MEDIA_TYPE.value(), response.statusCode());
    }

    @Test
    @DisplayName("Integration Test - Esqueci Minha Senha quando Usuario Nao Encontrado Deve Retornar Not Found (404)")
    void testEsqueciMinhaSenha_QuandoUsuarioNaoCadastrado_DeveRetornarNotFound() {
        EsqueciMinhaSenhaRequest request = new EsqueciMinhaSenhaRequest(
                "usuario_naocadastrado@email.com", moduloPrefeitura);

        ResponseOptions<?> response = given().spec(specification)
                .body(request)
                .when().post("/esqueci-minha-senha");

        assertEquals(HttpStatus.NOT_FOUND.value(), response.statusCode());
        ApiExceptionCustom actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.NOT_FOUND.value(), actual.getStatus());
        assertEquals(HttpStatus.NOT_FOUND.getReasonPhrase(), actual.getError());
        assertEquals(ValidatorException.class.getName(), actual.getException());

    }

    @Test
    @DisplayName("Integration Test - Esqueci Minha Senha quando Sucesso deve Retornar OK (200)")
    void testEsqueciMinhaSenha_QuandoSucesso_DeveRetornarOk() {
        ResponseOptions<?> response = given().spec(specification)
                .body(esqueciMinhaSenhaRequest)
                .when().post("/esqueci-minha-senha");

        assertEquals(HttpStatus.OK.value(), response.statusCode());
        Optional<Usuario> actual = usuarioRepository.findByEmail(admin.getEmail());

        assertTrue(actual.isPresent());
        assertNotNull(actual.get().getCodigoAcesso());
        assertInstanceOf(String.class, actual.get().getCodigoAcesso());
        assertEquals(6, actual.get().getCodigoAcesso().length());
    }

    @Test
    @DisplayName("Integration Test - Redefinir Senha quando Body Invalido deve Retornar Unsupported Media Type (415)")
    void testRedefinirSenha_QuandoBodyInvalido_DeveRetornarUnsupportedMediaType() {
        ResponseOptions<?> response = given().spec(specification)
                .contentType(ContentType.XML).body(redefinirSenhaRequest.toString())
                .when().post("/recuperar-senha");

        assertEquals(HttpStatus.UNSUPPORTED_MEDIA_TYPE.value(), response.statusCode());
    }

    @Test
    @DisplayName("Integration Test - Redefinir Senha quando Senha Invalida deve Retornar Not Acceptable (406)")
    public void testRedefinirSenha_QuandoSenhaInvalida_DeveRetornarNotAcceptable() {
        RedefinirSenhaRequest request = new RedefinirSenhaRequest(
                "senhaInvalida", admin.getCodigoAcesso());

        ResponseOptions<?> response = given().spec(specification)
                .body(request)
                .when().post("/recuperar-senha");

        assertEquals(HttpStatus.NOT_ACCEPTABLE.value(), response.statusCode());
        ApiExceptionCustom actual = response.body().as(ApiExceptionCustom.class);

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

        ResponseOptions<?> response = given().spec(specification)
                .body(request)
                .when().post("/recuperar-senha");

        assertEquals(HttpStatus.NOT_FOUND.value(), response.statusCode());
        ApiExceptionCustom actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.NOT_FOUND.value(), actual.getStatus());
        assertEquals(HttpStatus.NOT_FOUND.getReasonPhrase(), actual.getError());
        assertEquals(ValidatorException.class.getName(), actual.getException());
    }

    @Test
    @DisplayName("Integration Test - Redefinir Senha quando Codigo de Acesso Expirado deve Retornar Unauthorized (401)")
    void testRedefinirSenha_QuandoCodigoDeAcessoExpirado_DeveRetornarUnauthorized() {
        admin.setValidadeCodigo(LocalDateTime.now().minusMinutes(10));
        usuarioRepository.save(admin);

        ResponseOptions<?> response = given().spec(specification)
                .body(redefinirSenhaRequest)
                .when().post("/recuperar-senha");

        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.statusCode());
        ApiExceptionCustom actual = response.body().as(ApiExceptionCustom.class);

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

        ResponseOptions<?> response = given().spec(specification)
                .body(redefinirSenhaRequest)
                .when().post("/recuperar-senha");

        assertEquals(HttpStatus.OK.value(), response.statusCode());
        Optional<Usuario> actual = usuarioRepository.findByEmail(admin.getEmail());

        assertTrue(actual.isPresent());
        assertEquals(admin.getId(), actual.get().getId());
        assertTrue(encoder.matches(redefinirSenhaRequest.senha(), actual.get().getPassword()));
    }
}