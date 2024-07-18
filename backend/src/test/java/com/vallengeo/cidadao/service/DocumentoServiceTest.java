package com.vallengeo.cidadao.service;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.cidadao.model.Documento;
import com.vallengeo.cidadao.model.Processo;
import com.vallengeo.cidadao.model.TipoDocumento;
import com.vallengeo.cidadao.payload.request.DocumentoTemporarioRequest;
import com.vallengeo.cidadao.payload.response.DocumentoTemporarioResponse;
import com.vallengeo.cidadao.payload.response.DocumentosEnviadosResponse;
import com.vallengeo.cidadao.repository.DocumentoRepository;
import com.vallengeo.cidadao.repository.ProcessoRepository;
import com.vallengeo.cidadao.repository.RelGrupoTipoDocumentoRepository;
import com.vallengeo.cidadao.repository.TipoDocumentoRepository;
import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.core.util.Constants;
import com.vallengeo.portal.repository.GrupoRepository;
import com.vallengeo.portal.repository.UsuarioRepository;
import com.vallengeo.utils.*;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.authentication.AuthenticationManager;
import org.testcontainers.shaded.org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.*;

import static com.vallengeo.core.config.Config.APPLICATION_TEMP_UPLOAD;
import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Documento Service Tests")
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class DocumentoServiceTest extends AbstractIntegrationTest {

    @Autowired
    private DocumentoService documentoService;
    @Autowired
    private DocumentoRepository documentoRepository;
    @Autowired
    private AuthenticationManager authManager;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private TipoDocumentoRepository tipoDocumentoRepository;
    @Autowired
    private RelGrupoTipoDocumentoRepository grupoTipoDocumentoRepository;
    @Autowired
    private ProcessoRepository processoRepository;
    @Autowired
    private GrupoRepository grupoRepository;

    @Value("${api.security.token.secret}")
    private String secretKey;
    @Value("${api.security.token.expiration}")
    private Long expiration;
    @Value("${api.security.token.algorithm}")
    private String algorithm;

    private MockHttpServletRequest httpServletRequest;
    private TipoDocumento tipoDocumento;
    private Processo processo;
    private String extensao;
    private File arquivo;

    @BeforeAll
    public void setup() {
        AuthTestUtils.setAuthentication(authManager, UsuarioTestUtils.DEFAULT_DEV_EMAIL, UsuarioTestUtils.DEFAULT_DEV_PASSWORD);

        var grupo = Objects.requireNonNull(grupoRepository.findById(UsuarioTestUtils.GRUPO_ID).orElse(null));
        var userDetails = usuarioRepository.findByEmailAndAtivoIsTrue(UsuarioTestUtils.DEFAULT_DEV_EMAIL);
        var token = JwtTestUtils.buildJwtToken(
                userDetails, grupo.getId().toString(), secretKey, expiration, algorithm);

        httpServletRequest = new MockHttpServletRequest();
        httpServletRequest.addHeader("Authorization", token);

        tipoDocumento = Objects.requireNonNull(
                grupoTipoDocumentoRepository.findAllByGrupoId(grupo.getId())
                        .stream().filter(value -> value.getTipoDocumento().getFormato() != null).findFirst().orElse(null)
        ).getTipoDocumento();

        extensao = tipoDocumento.getFormato().split(",")[0];
        processo = processoRepository.save(ImovelTestUtils.getProcesso(grupo));

        arquivo = ArquivoTestUtils.createFile(APPLICATION_TEMP_UPLOAD, UUID.randomUUID().toString(), extensao);
    }

     @AfterAll
    public void finish() throws IOException {
        Files.delete(arquivo.toPath());
    }

    @Test
    @DisplayName("Integration Test - Dado Grupo & TipoDocumento Invalidos Quando uploadTemp() Deve Lancar ValidatorException")
    void testDadoGrupoTipoDocumentoInvalidos_QuandoUploadTemp_DeveLancarValidatorException() throws IOException {
        var tipoDocumentoId = new Random().nextLong();
        var multipartFile = new MockMultipartFile(
                "test_file",
                "test_file.zip",
                "application/zip",
                Files.readAllBytes(arquivo.toPath()));

        var actual = assertThrows(
                ValidatorException.class,
                () -> documentoService.uploadTemp(tipoDocumentoId, multipartFile, httpServletRequest)
        );

        assertEquals(HttpStatus.NOT_FOUND, actual.getStatus());
        assertEquals("Não foi possível encontrar a relação entre o grupo e o tipo do arquivo!", actual.getMessage());
    }

    @Test
    @DisplayName("Integration Test - Dado Formato Invalido Quando uploadTemp() Deve Lancar Validator Exception")
    void testDadoFormatoInvalido_QuandoUploadTemp_DeveLancarValidatorException() throws IOException {
        var arquivoInvalido = ArquivoTestUtils.createFile(APPLICATION_TEMP_UPLOAD, "test_file", ".py");
        var multipartFile = new MockMultipartFile(
                "test_file",
                "test_file.py",
                "application/py",
                Files.readAllBytes(arquivoInvalido.toPath()));

        var actual = assertThrows(
                ValidatorException.class,
                () -> documentoService.uploadTemp(tipoDocumento.getId(), multipartFile, httpServletRequest));

        assertEquals(HttpStatus.NOT_ACCEPTABLE, actual.getStatus());
        assertEquals(Constants.FILE_NOT_PERMITED_ERROR, actual.getMessage());

        FileUtils.delete(arquivoInvalido);
    }

    @Test
    @DisplayName("Integration Test - Dado TipoDocumento Outros Quando uploadTemp() Deve Retornar DocumentoTemporarioResponse")
    void testDadoTipoDocumentoOutros_QuandoUploadTemp_DeveRetornarDocumentoTemporarioResponse() throws IOException {
        var tipoDocumentoOutros = Objects.requireNonNull(tipoDocumentoRepository.findById(1L).orElse(null));

        var multipartFile = new MockMultipartFile(
                "test_file",
                "test_file" + extensao,
                "application/" + extensao.replace(".", ""),
                Files.readAllBytes(arquivo.toPath()));

        var actual = documentoService.uploadTemp(tipoDocumentoOutros.getId(), multipartFile, httpServletRequest);

        assertNotNull(actual);
        assertInstanceOf(DocumentoTemporarioResponse.class, actual);
        assertEquals(tipoDocumentoOutros.getId(), actual.getIdTipoDocumento());
        assertNotNull(actual.getNomeTemporario());
        assertEquals(multipartFile.getOriginalFilename(), actual.getNomeOriginal());
        assertNotNull(actual.getDataEnvio());

       Files.delete(Path.of(APPLICATION_TEMP_UPLOAD, actual.getNomeTemporario()));
    }

    @Test
    @DisplayName("Integration Test - Dado Arquivo Quando uploadTemp() Deve Retornar DocumentoTemporarioResponse")
    void testDadoArquivo_QuandoUploadTemp_DeveRetornarDocumentoTemporarioResponse() throws IOException {
        var multipartFile = new MockMultipartFile(
                "test_file",
                "test_file" + extensao,
                "application/" + extensao.replace(".", ""),
                Files.readAllBytes(arquivo.toPath()));

        var actual = documentoService.uploadTemp(tipoDocumento.getId(), multipartFile, httpServletRequest);

        assertNotNull(actual);
        assertInstanceOf(DocumentoTemporarioResponse.class, actual);
        assertEquals(tipoDocumento.getId(), actual.getIdTipoDocumento());
        assertNotNull(actual.getNomeTemporario());
        assertEquals(multipartFile.getOriginalFilename(), actual.getNomeOriginal());
        assertNotNull(actual.getDataEnvio());

        Files.delete(Path.of(APPLICATION_TEMP_UPLOAD, actual.getNomeTemporario()));
    }

    @Test
    @DisplayName("Integration Test - Dado Processo Nao Cadastrado Quando cadastrar() Deve Lancar ValidatorException")
    void testDadoProcessoNaoCadastrado_QuandoCadastrar_DeveLancarValidatorException() {
        var processoId = UUID.randomUUID().toString();
        var request = DocumentoTestUtils.getProcessoDocumentoRequest(new ArrayList<>(), processoId);

        var actual = assertThrows(
                ValidatorException.class,
                () -> documentoService.cadastrar(request));

        assertEquals(HttpStatus.NOT_FOUND, actual.getStatus());
        assertEquals("Processo " + processoId + " não encontrado!" , actual.getMessage());
    }

    @Test
    @DisplayName("Integration Test - Dado Arquivo Nao Cadastrado Quando cadastrar() Deve Lancar ValidatorException")
    void testDadoArquivoNaoCadastrado_QuandoCadastrar_DeveLancarValidatorException() throws IOException {
        var arquivoNaoCadastrado = ArquivoTestUtils.createFile(APPLICATION_TEMP_UPLOAD, "temp-file", extensao);

        var docTemporarioRequest = new DocumentoTemporarioRequest();
        docTemporarioRequest.setIdTipoDocumento(tipoDocumento.getId());
        docTemporarioRequest.setNomeTemporario(arquivoNaoCadastrado.getName());
        docTemporarioRequest.setNomeOriginal("file" + extensao);
        docTemporarioRequest.setDataEnvio(LocalDateTime.now());

        var request = DocumentoTestUtils.getProcessoDocumentoRequest(
                List.of(docTemporarioRequest), processo.getId().toString());

        var actual = assertThrows(ValidatorException.class, () -> documentoService.cadastrar(request));
        assertEquals("Erro ao ler o arquivo.", actual.getMessage());

        Files.delete(arquivoNaoCadastrado.toPath());
    }

    @Test
    @DisplayName("Integration Test - Dado Tipo Documento Nao Cadastrado Quando cadastrar() Deve Lancar ValidatorException")
    void testDadoTipoDocumentoNaoCadastrado_QuandoCadastrar_DeveLancarValidatorException() throws IOException {
        var arquivoTipoNaoCadastrado = ArquivoTestUtils.createFile(APPLICATION_TEMP_UPLOAD, UUID.randomUUID().toString(), ".java");
        var docTemporarioRequest = DocumentoTestUtils.getDocTemporarioRequest(
                arquivoTipoNaoCadastrado.getName(), "TestDocumento.java", new Random().nextLong());

        var request = DocumentoTestUtils.getProcessoDocumentoRequest(
                List.of(docTemporarioRequest), processo.getId().toString());

        var actual = assertThrows(
                ValidatorException.class,
                () -> documentoService.cadastrar(request));

        assertEquals(HttpStatus.NOT_FOUND, actual.getStatus());
        assertEquals("Tipo do documento " + docTemporarioRequest.getNomeOriginal() + " não encontrado!", actual.getMessage());

        Files.delete(arquivoTipoNaoCadastrado.toPath());
    }

    @Test @Order(1)
    @DisplayName("Integration Test - Dado ProcessoDocumentoRequest Quando cadastrar() Deve Cadastrar Documentos")
    void testDadoProcessoDocumentoRequest_QuandoCadastrar_DeveCadastrarDocumentos() throws IOException {
        var arquivoValido = ArquivoTestUtils.createFile(APPLICATION_TEMP_UPLOAD, UUID.randomUUID().toString(), extensao);
        var docTemporarioRequest = DocumentoTestUtils.getDocTemporarioRequest(
                arquivoValido.getName(), "test-file" + extensao, tipoDocumento.getId());

        var request = DocumentoTestUtils.getProcessoDocumentoRequest(
                List.of(docTemporarioRequest), processo.getId().toString());

        documentoService.cadastrar(request);
        var actual = documentoRepository.findAllByProcessoId(processo.getId());

        assertNotNull(actual);
        assertEquals(request.getDocumentos().size(), actual.size());
        assertInstanceOf(Documento.class, actual.get(0));
        assertEquals(docTemporarioRequest.getIdTipoDocumento(), actual.get(0).getTipoDocumento().getId());
        assertEquals(docTemporarioRequest.getNomeOriginal().replace(extensao, ""), actual.get(0).getNome());
    }

    @Test
    @DisplayName("Integration Test - Dado Documentos Cadastrados Quando buscarDocumentoEnviadoPeloProcessoId() Deve Retornar Documento List")
    void testDadoDocumentosCadastrados_QuandoBuscarDocumentoEnviadoPeloProcessoId_DeveRetornarDocumentoList() {
        var actual = documentoService.buscarDocumentoEnviadoPeloProcessoId(processo.getId());

        assertNotNull(actual);
        assertEquals(1, actual.size());
        assertInstanceOf(Documento.class, actual.get(0));
    }

    @Test
    @DisplayName("Integration Test - Dado Processo Nao Cadastrado Quando buscarDocumentoEnviadoPeloProcesso() Deve Lancar ValidatorException")
    void testDadoProcessoNaoCadastrado_QuandoBuscarDocumentoEnviadoPeloProcesso_DeveLancarValidatorException() {
        var processoId = UUID.randomUUID();
        var actual = documentoService.buscarDocumentoEnviadoPeloProcesso(processoId);

        assertNotNull(actual);
        assertEquals(0, actual.size());
    }

    @Test
    @DisplayName("Integration Test - Dado Documentos Cadastrados Quando buscarDocumentoEnviadoPeloProcesso() Deve Retornar DocumentosEnviadosResponse List")
    void testDadoDocumentosCadastrados_QuandoBuscarDocumentoEnviadoPeloProcesso_DeveRetornarDocumentosEnviadosResponseList() {
        var actual = documentoService.buscarDocumentoEnviadoPeloProcesso(processo.getId());

        assertNotNull(actual);
        assertEquals(1, actual.size());
        assertInstanceOf(DocumentosEnviadosResponse.class, actual.get(0));
    }

    @Test
    @DisplayName("Integration Test - Dado ")
    void test() {

    }
}