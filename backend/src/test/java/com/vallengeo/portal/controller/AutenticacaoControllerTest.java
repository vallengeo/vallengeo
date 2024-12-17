package com.vallengeo.portal.controller;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.core.exceptions.ApiExceptionCustom;
import com.vallengeo.core.util.Constants;
import com.vallengeo.portal.model.Usuario;
import com.vallengeo.portal.payload.request.autenticacao.LoginRequest;
import com.vallengeo.portal.payload.request.autenticacao.TokenRefreshRequest;
import com.vallengeo.portal.payload.response.LoginResponse;
import com.vallengeo.portal.repository.UsuarioRepository;
import com.vallengeo.utils.ExceptionTestUtils;
import com.vallengeo.utils.JwtTestUtils;
import com.vallengeo.utils.UsuarioTestUtils;
import io.jsonwebtoken.ExpiredJwtException;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.http.ContentType;
import io.restassured.response.ResponseOptions;
import io.restassured.specification.RequestSpecification;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.Map;
import java.util.Objects;

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Autenticacao Controller Tests")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class AutenticacaoControllerTest extends AbstractIntegrationTest {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private AutenticacaoController autenticacaoController;

    private static RequestSpecification specification;
    private static LoginResponse loginResponse;
    private static String expiredAccessToken;
    private static Usuario admin;

    @BeforeEach
    public void setup() {
        specification = new RequestSpecBuilder()
                .setBasePath("/api/v1/autenticacao")
                .setContentType(ContentType.JSON)
                .setPort(serverPort)
                .build();


        if (Objects.isNull(admin))
            admin = (Usuario) usuarioRepository.findByEmailAndAtivoIsTrue("vallengeo.dev@gmail.com");

        expiredAccessToken = JwtTestUtils.buildJwtToken(admin, null, secretKey, Math.negateExact(expiration), algorithm);
    }

    @Test @Order(1)
    @DisplayName("Integration Test - Login quando Atributos Invalidos deve Retornar Bad Request (400)")
    void testLogin_QuandoAtributosInvalidos_DeveRetornarBadRequest() {
        LoginRequest requestInvalido = new LoginRequest("email.invalido", "", null);

        ResponseOptions<?> response = given().spec(specification)
                .body(requestInvalido)
                .when().post("/login");

        assertEquals(HttpStatus.BAD_REQUEST.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.BAD_REQUEST.value(), actual.getStatus());
        assertEquals(HttpStatus.BAD_REQUEST.getReasonPhrase(), actual.getError());
        assertEquals(MethodArgumentNotValidException.class.getName(), actual.getException());

        Map<String, ?> mapErros = ExceptionTestUtils.errosListToMap(actual.getErros());

        assertEquals(Constants.EMAIL_INVALIDO, mapErros.get("email"));
        assertEquals(Constants.CAMPO_OBRIGATORIO, mapErros.get("senha"));
        assertEquals(Constants.CAMPO_OBRIGATORIO, mapErros.get("idMunicipio"));
    }

    @Test @Order(2)
    @DisplayName("Integration Test - Login quando Email Nao Cadastrado deve Retornar Forbidden (403)")
    void testLogin_QuandoEmailNaoCadastrado_DeveRetornarForbidden() {
        LoginRequest request = new LoginRequest("naocadastrado@gmail.com", "123456", 3513405);

        ResponseOptions<?> response = given().spec(specification)
                .body(request)
                .when().post("/login");

        assertEquals(HttpStatus.FORBIDDEN.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.FORBIDDEN.value(), actual.getStatus());
        assertEquals(HttpStatus.FORBIDDEN.getReasonPhrase(), actual.getError());
        assertEquals("Usuário e/ou senha inválidos.", actual.getMessage());
        assertEquals(BadCredentialsException.class.getName(), actual.getException());
    }

    @Test @Order(3)
    @DisplayName("Integration Test - Login quando Senha Incorreta deve Retornar Forbidden (403)")
    void testLogin_QuandoSenhaIncorreta_DeveRetornarForbidden() {
        LoginRequest request = new LoginRequest(
                UsuarioTestUtils.DEFAULT_DEV_EMAIL, "senhaIncorreta", UsuarioTestUtils.MUNICIPIO_ID);

        ResponseOptions<?> response = given().spec(specification)
                .body(request)
                .when().post("/login");

        assertEquals(HttpStatus.FORBIDDEN.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.FORBIDDEN.value(), actual.getStatus());
        assertEquals(HttpStatus.FORBIDDEN.getReasonPhrase(), actual.getError());
        assertEquals("Usuário e/ou senha inválidos.", actual.getMessage());
        assertEquals(BadCredentialsException.class.getName(), actual.getException());
    }

    @Test @Order(4)
    @DisplayName("Integration Test - Login quando Sucesso deve Retornar OK (200)")
    void testLogin_QuandoSucesso_DeveRetornarOk() {
        LoginRequest request = new LoginRequest(
                UsuarioTestUtils.DEFAULT_DEV_EMAIL, UsuarioTestUtils.DEFAULT_DEV_PASSWORD, UsuarioTestUtils.MUNICIPIO_ID);

        ResponseEntity<LoginResponse> actual = autenticacaoController.authenticate(request);

        assertEquals(HttpStatus.OK, actual.getStatusCode());
        assertInstanceOf(LoginResponse.class, actual.getBody());
        assertNotNull(actual.getBody().accessToken());
        assertNotNull(actual.getBody().refreshToken());
        assertEquals(expiration, actual.getBody().exp());

        loginResponse = actual.getBody();
    }

    @Test @Order(5)
    @DisplayName("Integration Test - Refresh Token quando Usuario Nao Autenticado deve Retornar Unauthorized (401)")
    void testRefreshToken_QuandoUsuarioNaoAutenticado_DeveRetornarUnauthorized() {
        ResponseOptions<?> response = given().spec(specification)
                .when().post("/refresh-token");

        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.UNAUTHORIZED.value(), actual.getStatus());
        assertEquals(HttpStatus.UNAUTHORIZED.getReasonPhrase(), actual.getError());
        assertEquals(AccessDeniedException.class.getName(), actual.getException());
    }

    @Test @Order(6)
    @DisplayName("Integration Test - Refresh Token quando Access Token Expirado deve Retornar Forbidden (403)")
    void testRefreshToken_QuandoAccessTokenExpirado_DeveRetornarUnauthorized() {
        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, expiredAccessToken)
                .when().post("/refresh-token");

        assertEquals(HttpStatus.FORBIDDEN.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.FORBIDDEN.value(), actual.getStatus());
        assertEquals(HttpStatus.FORBIDDEN.getReasonPhrase(), actual.getError());
        assertEquals(ExpiredJwtException.class.getName(), actual.getException());
    }

    @Test @Order(7)
    @DisplayName("Integration Test - Refresh Token quando Refresh Token Expirado deve Retornar Forbidden (403)")
    void testRefreshToken_QuandoRefreshTokenExpirado_DeveRetornarUnauthorized() {
        var expiredRefreshToken = JwtTestUtils.buildJwtRefreshToken(
                admin, secretKey, Math.negateExact(refreshTokenExpiration), algorithm);

        var request = new TokenRefreshRequest(expiredRefreshToken);

        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, loginResponse.accessToken())
                .body(request)
                .when().post("/refresh-token");

        assertEquals(HttpStatus.FORBIDDEN.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.FORBIDDEN.value(), actual.getStatus());
        assertEquals(HttpStatus.FORBIDDEN.getReasonPhrase(), actual.getError());
        assertEquals(ExpiredJwtException.class.getName(), actual.getException());
    }

    @Test @Order(8)
    @DisplayName("Integration Test - Refresh Token quando Token Invalido deve Retornar Bad Request (400)")
    void testRefreshToken_QuandoTokenInvalido_DeveRetornarBadRequest() {
        var request = new TokenRefreshRequest(null);

        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, loginResponse.accessToken())
                .body(request)
                .when().post("/refresh-token");

        assertEquals(HttpStatus.BAD_REQUEST.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.BAD_REQUEST.value(), actual.getStatus());
        assertEquals(HttpStatus.BAD_REQUEST.getReasonPhrase(), actual.getError());
        assertEquals(MethodArgumentNotValidException.class.getName(), actual.getException());

        var mapErros = ExceptionTestUtils.errosListToMap(actual.getErros());
        assertEquals(Constants.CAMPO_OBRIGATORIO, mapErros.get("refreshToken"));
    }

    @Test @Order(9)
    @DisplayName("Integration Test - Refresh Token quando Sucesso deve Retornar OK (200)")
    void testRefreshToken_QuandoSucesso_DeveRetornarOk() {
        var request = new TokenRefreshRequest(loginResponse.refreshToken());

        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, loginResponse.accessToken())
                .body(request)
                .when().post("/refresh-token");

        assertEquals(HttpStatus.OK.value(), response.statusCode());
        var actual = response.body().as(LoginResponse.class);

        assertNotNull(actual.accessToken());
        assertNotNull(actual.refreshToken());
        assertEquals(expiration, actual.exp());
    }

    @Test @Order(10)
    @DisplayName("Integration Test - Logout quando Access Token Expirado deve Retornar Forbidden (403)")
    void testLogout_QuandoAccessTokenExpirado_DeveRetornarForbidden() {
        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, expiredAccessToken)
                .when().get("/logout");

        assertEquals(HttpStatus.FORBIDDEN.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.FORBIDDEN.value(), actual.getStatus());
        assertEquals(HttpStatus.FORBIDDEN.getReasonPhrase(), actual.getError());
        assertEquals(ExpiredJwtException.class.getName(), actual.getException());
    }

    @Test @Order(11)
    @DisplayName("Integration Test - Logout quando Sucesso deve Retornar OK (200)")
    void testLogout_QuandoSucesso_DeveRetornarOk() {
        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, loginResponse.accessToken())
                .when().get("/logout");

        assertEquals(HttpStatus.OK.value(), response.statusCode());
    }
}