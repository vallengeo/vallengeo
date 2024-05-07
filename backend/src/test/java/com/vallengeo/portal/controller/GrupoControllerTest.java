package com.vallengeo.portal.controller;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.core.exceptions.ApiExceptionCustom;
import com.vallengeo.portal.model.Grupo;
import com.vallengeo.portal.model.Usuario;
import com.vallengeo.portal.repository.UsuarioRepository;
import com.vallengeo.utils.JwtTestUtils;
import io.jsonwebtoken.ExpiredJwtException;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.http.ContentType;
import io.restassured.response.ResponseOptions;
import io.restassured.specification.RequestSpecification;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;

import java.util.List;
import java.util.Objects;

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;

@DisplayName("Grupo Controller Tests")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class GrupoControllerTest extends AbstractIntegrationTest {
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Value("${server.port}")
    private int serverPort;
    @Value("${api.security.token.secret}")
    private String secretKey;
    @Value("${api.security.token.expiration}")
    private Long expiration;
    @Value("${api.security.token.algorithm}")
    private String algorithm;

    private static RequestSpecification specification;
    private static Usuario admin;

    @BeforeEach
    public void setup() {
        specification = new RequestSpecBuilder()
                .setContentType(ContentType.JSON)
                .setBasePath("/api/v1/grupo")
                .setPort(serverPort)
                .build();

        if (Objects.isNull(admin))
            admin = (Usuario) usuarioRepository.findByEmailAndAtivoIsTrue("vallengeo.dev@gmail.com");
    }

    @Test
    @DisplayName("Integration Test - Listar Grupos quando Usuario Nao Autenticado deve Retornar Unauthorized (401)")
    void testListarGrupos_QuandoUsuarioNaoAutenticado_DeveRetornarUnauthorized() {
        ResponseOptions<?> response = given().spec(specification)
                .when().get();

        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.UNAUTHORIZED.value(), actual.getStatus());
        assertEquals(HttpStatus.UNAUTHORIZED.getReasonPhrase(), actual.getError());
        assertEquals(AccessDeniedException.class.getName(), actual.getException());
    }

    @Test
    @DisplayName("Integration Test - Listar Grupos quando Access Token Expirado deve Retornar Forbidden (403)")
    void testListarGrupos_QuandoAccessTokenExpirado_DeveRetornarForbidden() {
        String expiredToken = JwtTestUtils.buildJwtToken(admin, null, secretKey, -expiration, algorithm);
        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, expiredToken)
                .when().get();

        assertEquals(HttpStatus.FORBIDDEN.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.FORBIDDEN.value(), actual.getStatus());
        assertEquals(HttpStatus.FORBIDDEN.getReasonPhrase(), actual.getError());
        assertEquals(ExpiredJwtException.class.getName(), actual.getException());
    }

    @Test
    @DisplayName("Integration Test - Listar Grupos quando Sucesso deve Retornar OK (200)")
    void testListarGrupos_QuandoSucesso_DeveRetornarOk() {
        String accessToken = JwtTestUtils.buildJwtToken(admin, null, secretKey, expiration, algorithm);
        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .when().get();

        assertEquals(HttpStatus.OK.value(), response.statusCode());
        List<Grupo> actual = List.of( response.body().as(Grupo[].class) );

        assertEquals(1, actual.size());
        assertInstanceOf(Grupo.class, actual.get(0));
    }
}