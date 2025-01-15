package com.vallengeo.portal.controller;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.portal.model.Usuario;
import com.vallengeo.portal.payload.response.GrupoResponse;
import com.vallengeo.portal.repository.UsuarioRepository;
import com.vallengeo.utils.JwtTestUtils;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.http.ContentType;
import io.restassured.response.ResponseOptions;
import io.restassured.specification.RequestSpecification;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Objects;

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Grupo Controller Tests")
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class GrupoControllerTest extends AbstractIntegrationTest {
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    private static RequestSpecification specification;
//    private static Usuario admin;

    @BeforeAll
    public void setup() {
        specification = new RequestSpecBuilder()
                .setContentType(ContentType.JSON)
                .setBasePath("/api/v1/grupo")
                .setPort(serverPort)
                .build();

//        admin = (Usuario) usuarioRepository.findByEmailAndAtivoIsTrue("vallengeo.dev@gmail.com").orElse(null);
    }

    @Test
    @DisplayName("Integration Test - Listar Grupos quando Sucesso deve Retornar Lista GrupoResponse")
    void testListarGrupos_QuandoSucesso_DeveRetornarListaGrupoResponse() {
        ResponseOptions<?> response = given().spec(specification)
                .when().get();

        assertEquals(HttpStatus.OK.value(), response.statusCode());
        var actual = List.of( response.body().as(GrupoResponse[].class));

        assertNotNull(actual);
        assertFalse(actual.isEmpty());
        assertInstanceOf(GrupoResponse.class, actual.get(0));
    }
}