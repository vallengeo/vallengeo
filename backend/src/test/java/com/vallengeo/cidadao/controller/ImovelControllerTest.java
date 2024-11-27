package com.vallengeo.cidadao.controller;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.cidadao.payload.request.ProcessoImovelRequest;
import com.vallengeo.cidadao.payload.request.imovel.CaracterizacaoImovelRequest;
import com.vallengeo.cidadao.payload.request.imovel.ImovelRequest;
import com.vallengeo.cidadao.payload.response.FichaImovelResponse;
import com.vallengeo.cidadao.payload.response.ProcessoListagemSimplificadoResponse;
import com.vallengeo.cidadao.payload.response.TipoUsoResponse;
import com.vallengeo.cidadao.payload.response.cadastro.ProcessoResponse;
import com.vallengeo.cidadao.repository.ProcessoRepository;
import com.vallengeo.cidadao.service.ImovelService;
import com.vallengeo.core.exceptions.ApiExceptionCustom;
import com.vallengeo.core.util.Constants;
import com.vallengeo.core.util.Paginacao;
import com.vallengeo.portal.model.Usuario;
import com.vallengeo.portal.repository.UsuarioRepository;
import com.vallengeo.utils.AuthTestUtils;
import com.vallengeo.utils.ImovelTestUtils;
import com.vallengeo.utils.JwtTestUtils;
import com.vallengeo.utils.UsuarioTestUtils;
import io.restassured.RestAssured;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.config.ObjectMapperConfig;
import io.restassured.config.RestAssuredConfig;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import static com.vallengeo.core.helpers.DateHelpers.convertDateToLocalDateTime;
import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.http.HttpStatus.OK;

@DisplayName("ImovelController Tests")
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class ImovelControllerTest extends AbstractIntegrationTest {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private ProcessoRepository processoRepository;
    @Autowired
    private ImovelService imovelService;
    @Autowired
    private AuthenticationManager authManager;

    private Usuario admin;
    private String accessToken;
    private String tokenSemPerfil;
    private RequestSpecification specification;
    private ProcessoImovelRequest processoImovelRequest;
    private ProcessoResponse processoCadastrado;

    @BeforeAll
    public void setup() throws IOException {
        AuthTestUtils.setAuthentication(
                authManager, UsuarioTestUtils.DEFAULT_DEV_EMAIL, UsuarioTestUtils.DEFAULT_DEV_PASSWORD);

        admin = usuarioRepository.findByEmail(UsuarioTestUtils.DEFAULT_DEV_EMAIL).orElse(null);
        accessToken = JwtTestUtils
                .buildJwtToken(admin, UsuarioTestUtils.GRUPO_ID.toString(), secretKey, expiration, algorithm);

        var usuarioSemPerfil = usuarioRepository.findByEmail(UsuarioTestUtils.EMAIL_SEM_PERFIL).orElse(null);
        tokenSemPerfil = JwtTestUtils.buildJwtToken(
                usuarioSemPerfil, null, secretKey, expiration, algorithm);

        RestAssured.config = RestAssuredConfig.config().objectMapperConfig( new ObjectMapperConfig()
                .jackson2ObjectMapperFactory((type, s) -> MAPPER));

        specification = new RequestSpecBuilder()
                .setContentType(ContentType.JSON)
                .setBasePath("/api/v1/imovel")
                .setPort(serverPort)
                .build();

        // TipoUso com ID 1 se refere a uma construcao residencial
        processoImovelRequest = ImovelTestUtils.getProcessoImovelRequest(UsuarioTestUtils.GRUPO_ID.toString(), 1L);

        processoCadastrado = imovelService.cadastrar(processoImovelRequest);
    }

    @Test @Order(1)
    @DisplayName("Integration Test - Dado Usuario Nao Autenticado Quando buscarTipoUso() Deve Retornar Unauthorized")
    public void testDadoUsuarioNaoAutenticado_QuandoBuscarTipoUso_DeveRetornarUnauthorized() {
        var response = given().spec(specification)
                .when().get("/tip-uso");

        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertNotNull(actual);
        assertEquals(HttpStatus.UNAUTHORIZED.value(), actual.getStatus());
        assertEquals(HttpStatus.UNAUTHORIZED.getReasonPhrase(), actual.getError());
        assertEquals(AccessDeniedException.class.getName(), actual.getException());
        assertEquals(Constants.UNAUTHORIZED_ERROR, actual.getMessage());
    }

    @Test @Order(2)
    @DisplayName("Integration Test - Dado Tipos de Uso Cadastrados Quando buscarTipoUso Deve Retornar Lista TipoUsoResponse")
    public void testDadoTiposDeUsoCadastrados_QuandoBuscarTipoUso_DeveRetornarListaTipoUsoResponse() {
        var response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .when().get("tipo-uso");

        assertEquals(OK.value(), response.statusCode());
        var actual = List.of(response.body().as(TipoUsoResponse[].class));

        assertNotNull(actual);
        assertFalse(actual.isEmpty());
        assertInstanceOf(TipoUsoResponse.class, actual.stream().findFirst().orElse(null));
    }

    @Test @Order(3)
    @DisplayName("Integration Test - Dado Usuario Nao Autenticado Quando buscarTodosCadastrados() Deve Retornar Unauthorized")
    public void testDadoUsuarioNaoAutenticado_QuandoBuscarTodosCadastrados_DeveRetornarUnauthorized() {
        var response = given().spec(specification)
                .when().get("/cadastrados");

        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertNotNull(actual);
        assertEquals(HttpStatus.UNAUTHORIZED.value(), actual.getStatus());
        assertEquals(HttpStatus.UNAUTHORIZED.getReasonPhrase(), actual.getError());
        assertEquals(AccessDeniedException.class.getName(), actual.getException());
        assertEquals(Constants.UNAUTHORIZED_ERROR, actual.getMessage());
    }

    @Test @Order(4)
    @DisplayName("Integration Test - Dado Imoveis Cadastrados Quando buscarTodosCadastrados() Deve Retornar Paginacao ProcessoListagemSimplificadoResponse")
    public void testDadoImoveisCadastrados_QuandoBuscarTodosCadastrados_DeveRetornarPaginacaoProcessoListagemSimplificadoResponse() {
        var itensPorPagina = 5;
        var pagina = 0;

        var response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .queryParam("itens-por-pagina", itensPorPagina)
                .queryParam("pagina", pagina)
                .when().get("/cadastrados");

        assertEquals(OK.value(), response.statusCode());
        var actual = response.body().as(Paginacao.PaginacaoOutput.class);
        var conteudo = actual.getConteudo().stream().map(
                item -> MAPPER.convertValue(item, ProcessoListagemSimplificadoResponse.class)).toList();

        assertNotNull(actual);
        assertInstanceOf(Paginacao.PaginacaoOutput.class, actual);
        assertNotNull(actual.getConteudo());
        assertFalse(actual.getConteudo().isEmpty());
        assertInstanceOf(ProcessoListagemSimplificadoResponse.class, conteudo.stream().findFirst().orElse(null));
        assertEquals(itensPorPagina, actual.getItensPorPagina());
        assertEquals(pagina, actual.getPagina());
    }

    @Test @Order(5)
    @DisplayName("Integration Test - Dado Usuario Nao Autenticado Quando fichaImovelPeloProcessoId() Deve Retornar Unauthorized")
    public void testDadoUsuarioNaoAutenticado_QuandoFichaImovelPeloProcessoId_DeveRetornarUnauthorized() {
        var response = given().spec(specification)
                .pathParam("processoId", processoCadastrado.id())
                .when().get("/ficha/{processoId}");

        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertNotNull(actual);
        assertEquals(HttpStatus.UNAUTHORIZED.value(), actual.getStatus());
        assertEquals(HttpStatus.UNAUTHORIZED.getReasonPhrase(), actual.getError());
        assertEquals(AccessDeniedException.class.getName(), actual.getException());
        assertEquals(Constants.UNAUTHORIZED_ERROR, actual.getMessage());
    }

    @Test @Order(6)
    @DisplayName("Integration Test - Dado Usuario Nao Autorizado Quando fichaImovelPeloProcessoId() Deve Retornar Unauthorized")
    public void testDadoUsuarioNaoAutorizado_QuandoFichaImovelPeloProcessoId_DeveRetornarUnauthorized() {
        var response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, tokenSemPerfil)
                .pathParam("processoId", processoCadastrado.id())
                .when().get("/ficha/{processoId}");

        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertNotNull(actual);
        assertEquals(HttpStatus.UNAUTHORIZED.value(), actual.getStatus());
        assertEquals(HttpStatus.UNAUTHORIZED.getReasonPhrase(), actual.getError());
        assertEquals(AccessDeniedException.class.getName(), actual.getException());
        assertEquals(Constants.UNAUTHORIZED_ERROR, actual.getMessage());
    }

    @Test @Order(7)
    @DisplayName("Integration Test - Dado processoId Nao Cadastrado Quando fichaImovelPeloProcessoId() Deve Retornar NotFound")
    public void testDadoProcessoIdNaoCadastrado_QuandoFichaImovelPeloProcessoId_DeveRetornarNotFound() {
        var idProcessoNaoCadastrado = UUID.randomUUID();

        var response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .pathParam("processoId" , idProcessoNaoCadastrado)
                .when().get("/ficha/{processoId}");

        assertEquals(HttpStatus.NOT_FOUND.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertNotNull(actual);
        assertEquals(HttpStatus.NOT_FOUND.value(), actual.getStatus());
        assertEquals(HttpStatus.NOT_FOUND.getReasonPhrase(), actual.getError());
        assertEquals("Imóvel vinculado ao processo " + idProcessoNaoCadastrado + Constants.NOT_FOUND, actual.getMessage());
    }

    @Test @Order(8)
    @DisplayName("Integration Test - Dado processoId Cadastrado Quando fichaImovelPeloProcessoId() Deve Retornar FichaImovelResponse")
    public void testDadoProcessoIdCadastrado_QuandoFichaImovelPeloProcessoId_DeveRetornarFichaImovelResponse() {
        var response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .pathParam("processoId", processoCadastrado.id())
                .when().get("/ficha/{processoId}");

        assertEquals(HttpStatus.OK.value(), response.statusCode());
        var actual = response.body().as(FichaImovelResponse.class);

        assertNotNull(actual);
        assertEquals(processoCadastrado.id(), actual.getProcesso().getId());
        assertEquals(processoCadastrado.imovel().getId(), actual.getId());
        assertEquals(processoCadastrado.protocolo(), actual.getProcesso().getProtocolo());
        assertEquals(processoCadastrado.imovel().getGeometria(), actual.getGeometria());
    }

    @Test @Order(9)
    @DisplayName("Integration Test - Dado Usuario Nao Autenticado Quando baixarFichaImovelPeloProcessoId() Deve Retornar Unauthorized")
    public void testDadoUsuarioNaoAutenticado_QuandoBaixarFichaImovelPeloProcessoId_DeveRetornarUnauthorized() {
        var response = given().spec(specification)
                .pathParam("processoId", processoCadastrado.id())
                .when().get("/ficha/{processoId}/download");

        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertNotNull(actual);
        assertEquals(HttpStatus.UNAUTHORIZED.value(), actual.getStatus());
        assertEquals(HttpStatus.UNAUTHORIZED.getReasonPhrase(), actual.getError());
        assertEquals(AccessDeniedException.class.getName(), actual.getException());
        assertEquals(Constants.UNAUTHORIZED_ERROR, actual.getMessage());
    }

    @Test @Order(10)
    @DisplayName("Integration Test - Dado processoId Nao Cadastrado Quando baixarFichaImovelPeloProcessoId() Deve Retornar NotFound")
    public void testDadoProcessoIdNaoCadastrado_QuandoBaixarFichaImovelPeloProcessoId_DeveRetornarNotFound() {
        var idProcessoNaoCadastrado = UUID.randomUUID();

        var response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .pathParam("processoId" , idProcessoNaoCadastrado)
                .when().get("/ficha/{processoId}/download");

        assertEquals(HttpStatus.NOT_FOUND.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertNotNull(actual);
        assertEquals(HttpStatus.NOT_FOUND.value(), actual.getStatus());
        assertEquals(HttpStatus.NOT_FOUND.getReasonPhrase(), actual.getError());
        assertEquals("Imóvel vinculado ao processo " + idProcessoNaoCadastrado + Constants.NOT_FOUND, actual.getMessage());
    }

    @Test @Order(11)
    @DisplayName("Integration Test - Dado processoId Cadastrado Quando baixarFichaImovelPeloProcessoId() Deve Retornar Resource")
    public void testDadoProcessoIdCadastrado_QuandoBaixarFichaImovelPeloProcessoId_DeveRetornarResource() {
        String nomeArquivo = processoCadastrado.id().toString() + "_"
                + convertDateToLocalDateTime(new Date()).format(DateTimeFormatter.ofPattern("yyyyMMddHHmm")) + ".pdf";

        var response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .pathParam("processoId" , processoCadastrado.id())
                .when().get("/ficha/{processoId}/download");

        assertEquals(HttpStatus.OK.value(), response.statusCode());
        assertEquals("application/pdf", response.contentType());
        assertEquals(processoCadastrado.id().toString(), response.header("X-FILE-ID"));
        assertTrue(response.header(HttpHeaders.CONTENT_DISPOSITION).contains(nomeArquivo));

        var actual = new ByteArrayResource(response.body().asByteArray());

        assertNotNull(actual);
        assertInstanceOf(Resource.class, actual);
    }

    @Test @Order(12)
    @DisplayName("Integration Test - Dado Usuario Nao Autenticado Quando cadastrarImovel() Deve Retornar Unauthorized")
    public void testDadoUsuarioNaoAutenticado_QuandoCadastrarImovel_DeveRetornarUnauthorized() {
        var response = given().spec(specification)
                .when().post("/cadastro");

        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertNotNull(actual);
        assertEquals(HttpStatus.UNAUTHORIZED.value(), actual.getStatus());
        assertEquals(HttpStatus.UNAUTHORIZED.getReasonPhrase(), actual.getError());
        assertEquals(AccessDeniedException.class.getName(), actual.getException());
        assertEquals(Constants.UNAUTHORIZED_ERROR, actual.getMessage());
    }

    @Test @Order(13)
    @DisplayName("Integration Test - Dado Atributos Invalidos Quando cadastrarImovel() Deve Retornar BadRequest")
    public void testDadoAtributosInvalidos_QuandoCadastrarImovel_DeveRetornarBadRequest() {
        var requestInvalido = new ProcessoImovelRequest("", new ImovelRequest());

        var response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .body(requestInvalido)
                .when().post("/cadastro");

        assertEquals(HttpStatus.BAD_REQUEST.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertNotNull(actual);
        assertEquals(HttpStatus.BAD_REQUEST.value(), actual.getStatus());
        assertEquals(HttpStatus.BAD_REQUEST.getReasonPhrase(), actual.getError());
        assertEquals(MethodArgumentNotValidException.class.getName(), actual.getException());
        assertEquals("Argumento(s) inválido(s).", actual.getMessage());
    }

    @Test @Order(14)
    @DisplayName("Integration Test - Dado Usuario Nao Autorizado Quando cadastrarImovel() Deve Retornar Unauthorized")
    public void testDadoUsuarioNaoAutorizado_QuandoCadastrarImovel_DeveRetornarUnauthorized() {
        var response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, tokenSemPerfil)
                .body(processoImovelRequest)
                .when().post("/cadastro");

        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertNotNull(actual);
        assertEquals(HttpStatus.UNAUTHORIZED.value(), actual.getStatus());
        assertEquals(HttpStatus.UNAUTHORIZED.getReasonPhrase(), actual.getError());
        assertEquals(AccessDeniedException.class.getName(), actual.getException());
        assertEquals(Constants.UNAUTHORIZED_ERROR, actual.getMessage());
    }

    @Test @Order(15)
    @DisplayName("Integration Test - Dado ProcessoImovelRequest Quando cadastrarImovel() Deve Retornar ProcessoResponse")
    public void testDadoProcessoImovelRequest_QuandoCadastrarImovel_DeveRetornarProcessoResponse() {
        var response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .body(processoImovelRequest)
                .when().post("/cadastro");

        assertEquals(HttpStatus.CREATED.value(), response.statusCode());
        var actual = response.body().as(ProcessoResponse.class);

        assertNotNull(actual);
        assertInstanceOf(ProcessoResponse.class, actual);
        assertNotNull(actual.id());
        assertEquals(processoImovelRequest.imovel().getGeorreferenciamento().getGeometria(), actual.imovel().getGeometria());
        assertNotNull(actual.protocolo());
        assertNotNull(actual.imovel().getInscricaoImobiliaria());
        assertFalse(actual.imovel().getRepresentantes().isEmpty());
    }

    @Test @Order(16)
    @DisplayName("Integration Test - Dado Usuario Nao Autenticado Quando editarImovel() Deve Retornar Unauthorized")
    public void testDadoUsuarioNaoAutenticado_QuandoEditarImovel_DeveRetornarUnauthorized() {
        var response = given().spec(specification)
                .pathParam("processoId", processoCadastrado.id())
                .body(processoImovelRequest)
                .when().put("/editar/{processoId}");

        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertNotNull(actual);
        assertEquals(HttpStatus.UNAUTHORIZED.value(), actual.getStatus());
        assertEquals(HttpStatus.UNAUTHORIZED.getReasonPhrase(), actual.getError());
        assertEquals(AccessDeniedException.class.getName(), actual.getException());
        assertEquals(Constants.UNAUTHORIZED_ERROR, actual.getMessage());
    }

    @Test @Order(17)
    @DisplayName("Integration Test - Dado Usuario Nao Autorizado Quando editarImovel() Deve Retornar Unauthorized")
    public void testDadoUsuarioNaoAutorizado_QuandoEditarImovel_DeveRetornarUnauthorized() {
        var response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, tokenSemPerfil)
                .pathParam("processoId", processoCadastrado.id())
                .body(processoImovelRequest)
                .when().put("/editar/{processoId}");

        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertNotNull(actual);
        assertEquals(HttpStatus.UNAUTHORIZED.value(), actual.getStatus());
        assertEquals(HttpStatus.UNAUTHORIZED.getReasonPhrase(), actual.getError());
        assertEquals(AccessDeniedException.class.getName(), actual.getException());
        assertEquals(Constants.UNAUTHORIZED_ERROR, actual.getMessage());
    }

    @Test @Order(18)
    @DisplayName("Integration Test - Dado processoId Nao Cadastrado Quando editarImovel() Deve Retornar NotFound")
    public void testDadoProcessoIdNaoCadastrado_QuandoEditarImovel_DeveRetornarNotFound() {
        var idProcessoNaoCadastrado = UUID.randomUUID();

        var response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .pathParam("processoId" , idProcessoNaoCadastrado)
                .body(processoImovelRequest)
                .when().put("/editar/{processoId}");

        assertEquals(HttpStatus.NOT_FOUND.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertNotNull(actual);
        assertEquals(HttpStatus.NOT_FOUND.value(), actual.getStatus());
        assertEquals(HttpStatus.NOT_FOUND.getReasonPhrase(), actual.getError());
        assertEquals("Processo " + idProcessoNaoCadastrado + Constants.NOT_FOUND, actual.getMessage());
    }

    @Test @Order(19)
    @DisplayName("Integration Test - Dado Atributos Invalidos Quando editarImovel() Deve Retornar BadRequest")
    public void testDadoAtributosInvalidos_QuandoEditarImovel_DeveRetornarBadRequest() {
        var requestInvalido = new ProcessoImovelRequest("", new ImovelRequest());

        var response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .body(requestInvalido)
                .pathParam("processoId", processoCadastrado.id())
                .when().put("/editar/{processoId}");

        assertEquals(HttpStatus.BAD_REQUEST.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertNotNull(actual);
        assertEquals(HttpStatus.BAD_REQUEST.value(), actual.getStatus());
        assertEquals(HttpStatus.BAD_REQUEST.getReasonPhrase(), actual.getError());
        assertEquals(MethodArgumentNotValidException.class.getName(), actual.getException());
        assertEquals("Argumento(s) inválido(s).", actual.getMessage());
    }

    @Test @Order(20)
    @DisplayName("Integration Test - Dado processoId & ProcessoImovelRequest Quando editarImovel() Deve Retornar ProcessoResponse")
    public void testDadoProcessoIdEProcessoImovelRequest_QuandoEditarImovel_DeveRetornarProcessoResponse() {
        var caracterizacaoImovel = new CaracterizacaoImovelRequest(
                "XYZ-1", "35", "12", null, 250F,10F, 150F, LocalDate.now());

        processoImovelRequest.imovel().setCaracterizacaoImovel(caracterizacaoImovel);

        var response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .body(processoImovelRequest)
                .pathParam("processoId", processoCadastrado.id())
                .when().put("/editar/{processoId}");

        assertEquals(HttpStatus.OK.value(), response.statusCode());
        var actual = response.body().as(ProcessoResponse.class);

        assertNotNull(actual);
        assertInstanceOf(ProcessoResponse.class, actual);
        assertEquals(processoCadastrado.id(), actual.id());
        assertEquals(processoCadastrado.protocolo(), actual.protocolo());
        assertEquals(processoCadastrado.imovel().getGeometria(), actual.imovel().getGeometria());
        assertNotEquals(processoCadastrado.imovel().getCaracterizacaoImovel(), actual.imovel().getCaracterizacaoImovel());
        assertNotEquals(processoCadastrado.imovel().getInscricaoImobiliaria(), actual.imovel().getInscricaoImobiliaria());
    }
}