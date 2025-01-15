package com.vallengeo.cidadao.controller;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.cidadao.model.Documento;
import com.vallengeo.cidadao.model.Processo;
import com.vallengeo.cidadao.model.TipoDocumento;
import com.vallengeo.cidadao.payload.request.DocumentoTemporarioRequest;
import com.vallengeo.cidadao.payload.request.ProcessoDocumentoRequest;
import com.vallengeo.cidadao.payload.response.DocumentoTemporarioResponse;
import com.vallengeo.cidadao.payload.response.DocumentosEnviadosResponse;
import com.vallengeo.cidadao.payload.response.TipoDocumentoResponse;
import com.vallengeo.cidadao.repository.DocumentoRepository;
import com.vallengeo.cidadao.repository.ProcessoRepository;
import com.vallengeo.cidadao.repository.TipoDocumentoRepository;
import com.vallengeo.cidadao.service.S3Service;
import com.vallengeo.core.exceptions.ApiExceptionCustom;
import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.core.util.Constants;
import com.vallengeo.global.model.Arquivo;
import com.vallengeo.portal.model.Grupo;
import com.vallengeo.portal.model.Usuario;
import com.vallengeo.portal.repository.GrupoRepository;
import com.vallengeo.portal.repository.UsuarioRepository;
import com.vallengeo.utils.*;
import io.restassured.RestAssured;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.config.ObjectMapperConfig;
import io.restassured.config.RestAssuredConfig;
import io.restassured.http.ContentType;
import io.restassured.response.ResponseOptions;
import io.restassured.specification.RequestSpecification;
import org.apache.commons.compress.utils.FileNameUtils;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamSource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.testcontainers.shaded.org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import static com.vallengeo.core.config.Config.APPLICATION_TEMP_UPLOAD;
import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doReturn;

@DisplayName("DocumentoController Tests")
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class DocumentoControllerTest extends AbstractIntegrationTest {

    @Autowired
    private GrupoRepository grupoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private ProcessoRepository processoRepository;
    @Autowired
    private DocumentoRepository documentoRepository;
    @Autowired
    private TipoDocumentoRepository tipoDocumentoRepository;
    @Autowired
    private AuthenticationManager authManager;

    @MockBean
    private S3Service s3Service;

    private String accessToken;
    private RequestSpecification specification;
    private Processo processo;
    private File arquivoTemp;
    private File arquivoCadastro;
    private ProcessoDocumentoRequest processoDocumentoRequest;
    private DocumentoTemporarioRequest docTemporarioRequest;
    private TipoDocumento tipoDocumento;

    @BeforeAll
    public void setup() {
        AuthTestUtils.setAuthentication(
                authManager, UsuarioTestUtils.DEFAULT_DEV_EMAIL, UsuarioTestUtils.DEFAULT_DEV_PASSWORD);

        Grupo grupo = grupoRepository.findById(UsuarioTestUtils.GRUPO_ID).orElse(null);
        Usuario admin = usuarioRepository.findByEmail(UsuarioTestUtils.DEFAULT_DEV_EMAIL).orElse(null);

        accessToken = JwtTestUtils.buildJwtToken(
                admin, UsuarioTestUtils.GRUPO_ID.toString(), secretKey, expiration, algorithm);

        RestAssured.config = RestAssuredConfig.config().objectMapperConfig(new ObjectMapperConfig().jackson2ObjectMapperFactory(
                (cls, charset) -> MAPPER
        ));

        specification = new RequestSpecBuilder()
                .setContentType(ContentType.JSON)
                .setBasePath("/api/v1/documento")
                .setPort(serverPort)
                .build();

        processo = processoRepository.save(ImovelTestUtils.getProcesso(grupo));
        arquivoTemp = ArquivoTestUtils.createFile(FileUtils.getUserDirectoryPath(), "TestFile", ".pdf");
        arquivoCadastro = ArquivoTestUtils.createFile(APPLICATION_TEMP_UPLOAD, UUID.randomUUID().toString(), ".pdf");

        // ID 5 referente ao documento de Matricula, deve receber apenas arquivos PDF
        tipoDocumento = tipoDocumentoRepository.findById(5L)
                .orElseThrow(() -> new RuntimeException("TipoDocumento com ID 5 não encontrado."));

        docTemporarioRequest = DocumentoTestUtils.getDocTemporarioRequest(
                arquivoCadastro.getName(), "TestFile.pdf", tipoDocumento.getId());

        processoDocumentoRequest = DocumentoTestUtils.getProcessoDocumentoRequest(
                List.of(docTemporarioRequest), processo.getId().toString());

        AuthTestUtils.cleanAuthentication();
    }

    @AfterAll
    public void clean() throws IOException {
        FileUtils.delete(arquivoTemp);
    }

    @Test @Order(1)
    @DisplayName("Integration Test - Dado Usuario Nao Autenticado Quando buscarTipoDocumento() Deve Retornar Unauthorized")
    void testDadoUsuarioNaoAutenticado_QuandoBuscarTipoDocumento_DeveRetornarUnauthorized() {
        ResponseOptions<?> response = given().spec(specification)
                .when().get("/tipo-documento");

        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertNotNull(actual);
        assertEquals(HttpStatus.UNAUTHORIZED.value(), actual.getStatus());
        assertEquals(HttpStatus.UNAUTHORIZED.getReasonPhrase(), actual.getError());
        assertEquals(AccessDeniedException.class.getName(), actual.getException());
        assertEquals(Constants.UNAUTHORIZED_ERROR, actual.getMessage());
    }

    @Test @Order(2)
    @DisplayName("Integration Test - Dado TipoDocumento Cadastrados Quando buscarTipoDocumento() Deve Retornar Lista TipoDocumentoResponse")
    void testDadoTipoDocumentoCadastrados_QuandoBuscarTipoDocumento_DeveRetornarListaTipoDocumentoResponse() {
        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .when().get("/tipo-documento");

        assertEquals(HttpStatus.OK.value(), response.statusCode());
        var actual = Arrays.asList(response.body().as(TipoDocumentoResponse[].class));

        assertNotNull(actual);
        assertInstanceOf(TipoDocumentoResponse.class, actual.get(0));
    }

    @Test @Order(3)
    @DisplayName("Integration Test - Dado Usuario Nao Autenticado Quando uploadTemp() Deve Retornar Unauthorized")
    void testDadoUsuarioNaoAutenticado_QuandoUploadTemp_DeveRetornarUnauthorized() {
        ResponseOptions<?> response = given().spec(specification)
                .contentType(ContentType.MULTIPART)
                .multiPart(arquivoTemp)
                .pathParam("tipoDocumentoId", tipoDocumento.getId())
                .when().get("/upload-temp/tipo-documento/{tipoDocumentoId}");

        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertNotNull(actual);
        assertEquals(HttpStatus.UNAUTHORIZED.value(), actual.getStatus());
        assertEquals(HttpStatus.UNAUTHORIZED.getReasonPhrase(), actual.getError());
        assertEquals(AccessDeniedException.class.getName(), actual.getException());
        assertEquals(Constants.UNAUTHORIZED_ERROR, actual.getMessage());
    }

    @Test @Order(4)
    @DisplayName("Integration Test - Dado tipoDocumentoId Nao Cadastrado Quando uploadTemp() Deve Retornar NotFound")
    void testDadoTipoDocumentoIdNaoCadastrado_QuandoUploadTemp_DeveRetornarNotFound() {
        var tipoDocumentoIdNaoCadastrado = 0;

        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .contentType(ContentType.MULTIPART)
                .multiPart(arquivoTemp)
                .pathParam("tipoDocumentoId", tipoDocumentoIdNaoCadastrado)
                .when().post("/upload-temp/tipo-documento/{tipoDocumentoId}");

        assertEquals(HttpStatus.NOT_FOUND.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.NOT_FOUND.value(), actual.getStatus());
        assertEquals(HttpStatus.NOT_FOUND.getReasonPhrase(), actual.getError());
        assertEquals(ValidatorException.class.getName(), actual.getException());
        assertEquals("Não foi possível encontrar a relação entre o grupo e o tipo do arquivo!", actual.getMessage());
    }

    @Test @Order(5)
    @DisplayName("Integration Test - Dado tipoDocumentoId & Arquivo Invalido Quando uploadTemp() Deve Retornar NotAcceptable")
    void testDadoTipoDocumentoIdEArquivoInvalido_QuandoUploadTemp_DeveRetornarNotAcceptable() throws IOException {
        var arquivoInvalido = ArquivoTestUtils.createFile(
                FileUtils.getUserDirectoryPath(), UUID.randomUUID().toString(), ".sql");

        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .contentType(ContentType.MULTIPART)
                .multiPart(arquivoInvalido)
                .pathParam("tipoDocumentoId", tipoDocumento.getId())
                .when().post("/upload-temp/tipo-documento/{tipoDocumentoId}");

        assertEquals(HttpStatus.NOT_ACCEPTABLE.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.NOT_ACCEPTABLE.value(), actual.getStatus());
        assertEquals(HttpStatus.NOT_ACCEPTABLE.getReasonPhrase(), actual.getError());
        assertEquals(ValidatorException.class.getName(), actual.getException());
        assertEquals(Constants.FILE_NOT_PERMITED_ERROR, actual.getMessage());

        FileUtils.delete(arquivoInvalido);
    }

    @Test @Order(6)
    @DisplayName("Integration Test - Dado tipoDocumentoId & Arquivo Quando uploadTemp() Deve Retornar DocumentoTemporarioResponse")
    void testDadoTipoDocumentoIdEArquivo_QuandoUploadTemp_DeveRetornarDocumentoTemporarioResponse() throws IOException {
        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .contentType(ContentType.MULTIPART)
                .multiPart(arquivoTemp)
                .pathParam("tipoDocumentoId", tipoDocumento.getId())
                .when().post("/upload-temp/tipo-documento/{tipoDocumentoId}");

        assertEquals(HttpStatus.CREATED.value(), response.statusCode());
        var actual = response.body().as(DocumentoTemporarioResponse.class);

        assertNotNull(actual);
        assertInstanceOf(DocumentoTemporarioResponse.class, actual);
        assertEquals(tipoDocumento.getId(), actual.getIdTipoDocumento());
        assertEquals(arquivoTemp.getName(), actual.getNomeOriginal());
        assertNotNull(actual.getNomeTemporario());
        assertInstanceOf(UUID.class, UUID.fromString(FileNameUtils.getBaseName(actual.getNomeTemporario())));

        FileUtils.delete(new File(APPLICATION_TEMP_UPLOAD + File.separator + actual.getNomeTemporario()));
    }

    @Test @Order(7)
    @DisplayName("Integration Test - Dado Usuario Nao Autenticado Quando cadastrarDocumentos() Deve Retornar Unauthorized")
    void testDadoUsuarioNaoAutenticado_QuandoCadastrarDocumentos_DeveRetornarUnauthorized() {
        ResponseOptions<?> response = given().spec(specification)
                .when().post("/cadastro");

        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.UNAUTHORIZED.value(), actual.getStatus());
        assertEquals(HttpStatus.UNAUTHORIZED.getReasonPhrase(), actual.getError());
        assertEquals(AccessDeniedException.class.getName(), actual.getException());
        assertEquals(Constants.UNAUTHORIZED_ERROR, actual.getMessage());
    }

    @Test @Order(8)
    @DisplayName("Integration Test - Dado Usuario Nao Autorizado Quando cadastrarDocumentos() Deve Retornar Forbidden")
    void testDadoUsuarioNaoAutorizado_QuandoCadastrarDocumentos_DeveRetornarForbidden() {
        var userDetails = usuarioRepository.findByEmailAndAtivoIsTrue("vallengeo.semperfil@gmail.com")
                .orElse(null);

        var forbiddenAccessToken = JwtTestUtils.buildJwtToken(
                userDetails, null, secretKey, expiration, algorithm);

        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, forbiddenAccessToken)
                .body(processoDocumentoRequest)
                .when().post("/cadastro");

        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.UNAUTHORIZED.value(), actual.getStatus());
        assertEquals(HttpStatus.UNAUTHORIZED.getReasonPhrase(), actual.getError());
        assertEquals(AccessDeniedException.class.getName(), actual.getException());
        assertEquals(Constants.UNAUTHORIZED_ERROR, actual.getMessage());
    }

    @Test @Order(9)
    @DisplayName("Integration Test - Dado Atributos Invalidos Quando cadastrarDocumentos() Deve Retornar BadRequest")
    void testDadoAtributosInvalidos_QuandoCadastrarDocumentos_DeveRetornarBadRequest() {
        var requestInvalido = DocumentoTestUtils.getProcessoDocumentoRequest(new ArrayList<>(), "");

        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .body(requestInvalido)
                .when().post("/cadastro");

        assertEquals(HttpStatus.BAD_REQUEST.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.BAD_REQUEST.value(), actual.getStatus());
        assertEquals(HttpStatus.BAD_REQUEST.getReasonPhrase(), actual.getError());
        assertEquals(MethodArgumentNotValidException.class.getName(), actual.getException());
        assertEquals("Argumento(s) inválido(s).", actual.getMessage());
    }

    @Test @Order(10)
    @DisplayName("Integration Test - Dado ProcessoDocumentoRequest Quando cadastrarDocumentos() Deve Cadastrar Documento Definitivo")
    void testDadoProcessoDocumentoRequest_QuandoCadastrarDocumentos_DeveCadastrarDocumentoDefinitivo() throws IOException {
        doReturn("File uploaded: " + FileNameUtils.getBaseName(arquivoCadastro.toPath()))
                .when(s3Service).uploadFile(eq(arquivoCadastro), anyString(), anyString());

        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .body(processoDocumentoRequest)
                .when().post("/cadastro");

        assertEquals(HttpStatus.CREATED.value(), response.statusCode());
        assertEquals(Constants.SALVO_SUCESSO, response.body().print());

        var actual = documentoRepository.findAllByProcessoId(processo.getId()).stream().findFirst().orElse(null);

        assertNotNull(actual);
        assertInstanceOf(Documento.class, actual);
        assertEquals(docTemporarioRequest.getNomeOriginal(), actual.getNome() + actual.getExtensao());
    }

    @Test @Order(11)
    @DisplayName("Integration Test - Dado Usuario Nao Autenticado Quando buscarTipoDocumentoEnviado() Deve Retornar Unauthorized")
    void testDadoUsuarioNaoAutenticado_QuandoBuscarTipoDocumentoEnviado_DeveRetornarUnauthorized() {
        ResponseOptions<?> response = given().spec(specification)
                .pathParam("idProcesso", processo.getId())
                .when().get("/tipo-documento/enviado/{idProcesso}");

        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.UNAUTHORIZED.value(), actual.getStatus());
        assertEquals(HttpStatus.UNAUTHORIZED.getReasonPhrase(), actual.getError());
        assertEquals(AccessDeniedException.class.getName(), actual.getException());
        assertEquals(Constants.UNAUTHORIZED_ERROR, actual.getMessage());
    }

    @Test
    @Order(12)
    @DisplayName("Integration Test - Dado idProcesso Nao Cadastrado Quando buscarTipoDocumentoEnviado() Deve Retornar NotFound")
    void testDadoIdProcessoNaoCadastrado_QuandoBuscarTipoDocumentoEnviado_DeveRetornarNotFound() {
        var idProcesso = UUID.randomUUID();

        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .pathParam("idProcesso", idProcesso)
                .when().get("/tipo-documento/enviado/{idProcesso}");

        assertEquals(HttpStatus.NOT_FOUND.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.NOT_FOUND.value(), actual.getStatus());
        assertEquals(HttpStatus.NOT_FOUND.getReasonPhrase(), actual.getError());
        assertEquals(ValidatorException.class.getName(), actual.getException());
        assertEquals("Processo " + idProcesso + Constants.NOT_FOUND, actual.getMessage());
    }

    @Test
    @Order(13)
    @DisplayName("Integration Test - Dado idProcesso Quando buscarTipoDocumentoEnviado() Deve Retornar Lista TipoDocumentoResponse")
    void testDadoIdProcesso_QuandoBuscarTipoDocumentoEnviado_DeveRetornarListaTipoDocumentoResponse() {
        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .pathParam("idProcesso", processo.getId())
                .when().get("/tipo-documento/enviado/{idProcesso}");

        assertEquals(HttpStatus.OK.value(), response.statusCode());
        var actual = Arrays.asList(response.body().as(TipoDocumentoResponse[].class));

        assertNotNull(actual);
        assertEquals(1, actual.size());
        assertInstanceOf(TipoDocumentoResponse.class, actual.get(0));
        assertEquals(tipoDocumento.getId(), actual.get(0).id());
        assertEquals(tipoDocumento.getTitulo(), actual.get(0).titulo());
    }

    @Test @Order(14)
    @DisplayName("Integration Test - Dado Usuario Nao Autenticado Quando buscarDocumentoEnviado() Deve Retornar Unauthorized")
    void testDadoUsuarioNaoAutenticado_QuandoBuscarDocumentoEnviado_DeveRetornarUnauthorized() {
        ResponseOptions<?> response = given().spec(specification)
                .pathParam("idProcesso", processo.getId())
                .when().get("/enviado/{idProcesso}");

        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.UNAUTHORIZED.value(), actual.getStatus());
        assertEquals(HttpStatus.UNAUTHORIZED.getReasonPhrase(), actual.getError());
        assertEquals(AccessDeniedException.class.getName(), actual.getException());
        assertEquals(Constants.UNAUTHORIZED_ERROR, actual.getMessage());
    }

    // @Test @Order(15)
    // @DisplayName("Integration Test - Dado idProcesso Nao Cadastrado Quando buscarDocumentoEnviado() Deve Retornar NotFound")
    // void testDadoIdProcessoNaoCadastrado_QuandoBuscarDocumentoEnviado_DeveRetornarNotFound() {
    //     var idProcesso = UUID.randomUUID();
    //
    //     ResponseOptions<?> response = given().spec(specification)
    //             .header(HttpHeaders.AUTHORIZATION, accessToken)
    //             .pathParam("idProcesso", idProcesso)
    //             .when().get("/enviado/{idProcesso}");
    //
    //     assertEquals(HttpStatus.NOT_FOUND.value(), response.statusCode(),
    //             "Metodo deve retornar '404 Not Found' quando id informado não for encontrado!");
    //
    //     var actual = response.body().as(ApiExceptionCustom.class);
    //
    //     assertEquals(HttpStatus.NOT_FOUND.value(), actual.getStatus());
    //     assertEquals(HttpStatus.NOT_FOUND.getReasonPhrase(), actual.getError());
    //     assertEquals(ValidatorException.class.getName(), actual.getException());
    //     assertEquals("Processo " + idProcesso + Constants.NOT_FOUND, actual.getMessage());
    // }

    @Test @Order(16)
    @DisplayName("Integration Test - Dado idProcesso Quando buscarDocumentoEnviado() Deve Retornar Lista DocumentosEnviadosResponse")
    void testDadoIdProcesso_QuandoBuscarDocumentoEnviado_DeveRetornarListaDocumentosEnviadosResponse() {
        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .pathParam("idProcesso", processo.getId())
                .when().get("/enviado/{idProcesso}");

        assertEquals(HttpStatus.OK.value(), response.statusCode());
        var actual = List.of(response.body().as(DocumentosEnviadosResponse[].class));

        assertNotNull(actual);
        assertEquals(1, actual.size());
        assertInstanceOf(DocumentosEnviadosResponse.class, actual.get(0));
    }

    @Test @Order(17)
    @DisplayName("Integration Test - Dado Usuario Nao Autenticado Quando buscarTipoDocumentoNaoEnviado() Deve Retornar Unauthorized")
    void testDadoUsuarioNaoAutenticado_QuandoBuscarTipoDocumentoNaoEnviado_DeveRetornarUnauthorized() {
        ResponseOptions<?> response = given().spec(specification)
                .pathParam("idProcesso", processo.getId())
                .when().get("/tipo-documento/nao-enviado/{idProcesso}");

        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.UNAUTHORIZED.value(), actual.getStatus());
        assertEquals(HttpStatus.UNAUTHORIZED.getReasonPhrase(), actual.getError());
        assertEquals(AccessDeniedException.class.getName(), actual.getException());
        assertEquals(Constants.UNAUTHORIZED_ERROR, actual.getMessage());
    }

    @Test @Order(18)
    @DisplayName("Integration Test - Dado idProcesso Nao Cadastrado Quando buscarTipoDocumentoNaoEnviado() Deve Retornar NotFound")
    void testDadoIdProcessoNaoCadastrado_QuandoBuscarTipoDocumentoNaoEnviado_DeveRetornarNotFound() {
        var idProcesso = UUID.randomUUID();

        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .pathParam("idProcesso", idProcesso)
                .when().get("/tipo-documento/nao-enviado/{idProcesso}");

        assertEquals(HttpStatus.NOT_FOUND.value(), response.statusCode(),
                "Metodo deve retornar '404 Not Found' quando ID informado não for encontrado!");

        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.NOT_FOUND.value(), actual.getStatus());
        assertEquals(HttpStatus.NOT_FOUND.getReasonPhrase(), actual.getError());
        assertEquals(ValidatorException.class.getName(), actual.getException());
        assertEquals("Processo " + idProcesso + Constants.NOT_FOUND, actual.getMessage());
    }

    @Test @Order(19)
    @DisplayName("Integration Test - Dado idProcesso Quando buscarTipoDocumentoNaoEnviado() Deve Retornar Lista TipoDocumentoResponse")
    void testDadoIdProcesso_QuandoBuscarTipoDocumentoNaoEnviado_DeveRetornarListaTipoDocumentoResponse() {
        ResponseOptions<?> response = given().spec(specification)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .pathParam("idProcesso", processo.getId())
                .when().get("/tipo-documento/nao-enviado/{idProcesso}");

        assertEquals(HttpStatus.OK.value(), response.statusCode());
        var actual = List.of(response.body().as(TipoDocumentoResponse[].class));
        var tipoDocumentoEnviado = new TipoDocumentoResponse(
                tipoDocumento.getId(), tipoDocumento.getTitulo(), true,
                List.of(tipoDocumento.getFormato()));

        assertNotNull(actual);
        assertInstanceOf(TipoDocumentoResponse.class, actual.get(0));
        assertFalse(actual.contains(tipoDocumentoEnviado));
    }

    @Test @Order(20)
    @DisplayName("Integration Test - Dado Usuario Nao Autenticado Quando download() Deve Retornar Unauthorized")
    void testDadoUsuarioNaoAutenticado_QuandoDownload_DeveRetornarUnauthorized() {
        ResponseOptions<?> response = given().spec(specification)
                .pathParam("idDocumento", UUID.randomUUID())
                .when().get("/download/{idDocumento}");

        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.statusCode());
        var actual = response.body().as(ApiExceptionCustom.class);

        assertEquals(HttpStatus.UNAUTHORIZED.value(), actual.getStatus());
        assertEquals(HttpStatus.UNAUTHORIZED.getReasonPhrase(), actual.getError());
        assertEquals(AccessDeniedException.class.getName(), actual.getException());
        assertEquals(Constants.UNAUTHORIZED_ERROR, actual.getMessage());
    }

    // @Test @Order(21)
    // @DisplayName("Integration Test - Dado idDocumento Nao Cadastrado Quando download() Deve Retornar NotFound")
    // void testDadoIdDocumentoNaoCadastrado_QuandoDownload_DeveRetornarNotFound() {
    //     var idDocumento = UUID.randomUUID();
    //
    //     ResponseOptions<?> response = given().spec(specification)
    //             .header(HttpHeaders.AUTHORIZATION, accessToken)
    //             .pathParam("idDocumento", idDocumento)
    //             .when().get("/download/{idDocumento}");
    //
    //     assertEquals(HttpStatus.NOT_FOUND.value(), response.statusCode());
    // }

    @Test @Order(22)
    @DisplayName("Integration Test - Dado idDocumento Quando download() Deve Retornar Resource")
    void testDadoIdDocumento_QuandoDownload_DeveRetornarResource() throws IOException {
        var documento = new Documento(
                Arquivo.builder()
                        .nome("DownloadTestFile")
                        .extensao(".pdf")
                        .tamanho(255)
                        .dataEnvio(LocalDateTime.now())
                        .build()
        );

        documento.setProcesso(processo);
        documento.setTipoDocumento(tipoDocumento);

        documento = documentoRepository.save(documento);

        var arquivoDownload = ArquivoTestUtils.createFile(
                FileUtils.getUserDirectoryPath(), documento.getId().toString(), documento.getExtensao());

        byte[] arquivoDownloadByteArray = Files.readAllBytes(arquivoDownload.toPath());

        doReturn(arquivoDownloadByteArray).when(s3Service).downloadFile(anyString(), anyString());
        doReturn("application/pdf").when(s3Service).getContentTypeFromS3(anyString(), anyString());

        ResponseOptions<?> response = given().spec(specification)
                .contentType("application/pdf")
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .pathParam("idDocumento", documento.getId())
                .when().get("/download/{idDocumento}");

        assertEquals(HttpStatus.OK.value(), response.statusCode());
        InputStreamSource actual = new ByteArrayResource(response.body().asByteArray());

        assertNotNull(actual);
        assertInstanceOf(Resource.class, actual);
        assertEquals(arquivoDownload.length(), actual.getInputStream().readAllBytes().length);
        assertTrue(response.header(HttpHeaders.CONTENT_DISPOSITION).contains(documento.getNome() + documento.getExtensao()));

        FileUtils.delete(arquivoDownload);
    }
}