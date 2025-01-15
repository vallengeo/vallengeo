package com.vallengeo.global.service;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.cidadao.service.S3Service;
import com.vallengeo.core.config.Config;
import com.vallengeo.core.exceptions.InvalidFileException;
import com.vallengeo.core.util.Constants;
import com.vallengeo.global.model.Arquivo;
import com.vallengeo.global.repository.ArquivoRepository;
import com.vallengeo.utils.ArquivoTestUtils;
import net.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mock.web.MockMultipartFile;
import org.testcontainers.shaded.org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.doReturn;

@DisplayName("Arquivo Service Tests")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class ArquivoServiceTest extends AbstractIntegrationTest {

    @Autowired
    private ArquivoRepository arquivoRepository;
    @Autowired
    private ArquivoService arquivoService;

    @MockBean
    private S3Service s3Service;

    private static Arquivo arquivo;

    @BeforeAll
    public static void setup() {
        arquivo = Arquivo.builder()
                .nome("pdf_test_file")
                .extensao(".pdf")
                .tamanho(255)
                .dataEnvio(LocalDateTime.now())
                .build();
    }

    @Test @Order(1)
    @DisplayName("Integration Test - Dado Arquivo Invalido Quando filesUnzipped() Deve Lancar InvalidFileException")
    void testDadoArquivoInvalido_QuandoFilesUnzipped_DeveLancarInvalidFileException() {
        MockMultipartFile file = new MockMultipartFile(
                "test_file",
                "test_file.txt",
                "application/txt",
                RandomString.make(255).getBytes()
        );

        var actual = assertThrows(
                InvalidFileException.class,
                () -> arquivoService.filesUnzipped(file));

        assertEquals(Constants.FILE_INVALID_ERROR, actual.getMessage());
    }

    @Test @Order(2)
    @DisplayName("Integration Test - Dado Arquivo Zip Quando filesUnzipped() Deve Retornar String List")
    void testDadoArquivoZip_QuandoFilesUnzipped_DeveRetornarStringList() throws IOException {
        byte[] mockZipFile = ArquivoTestUtils.createMockZipFile();

        MockMultipartFile file = new MockMultipartFile(
                "test_file",
                "test_file.zip",
                "application/zip",
                mockZipFile
        );

        var actual = arquivoService.filesUnzipped(file);

        assertNotNull(actual);
        assertFalse(actual.isEmpty());
        assertInstanceOf(String.class, actual.get(0));
        assertTrue(new File(actual.get(0)).exists());
    }

    @Test @Order(3)
    @DisplayName("Integration Test - Dado Id Nao Cadastrado Quando findById() Deve Retornar Optional Empty")
    void testDadoIdNaoCadastrado_QuandoFindById_DeveRetornarOptionalEmpty() {
        var id = UUID.randomUUID();
        var actual = arquivoService.findById(id);

        assertNotNull(actual);
        assertInstanceOf(Optional.class, actual);
        assertTrue(actual.isEmpty());
    }

    @Test @Order(4)
    @DisplayName("Integration Test - Dado Id Quando findById() Deve Retornar Optional Arquivo")
    void testDadoId_QuandoFindById_DeveRetornarOptionalArquivo() {
        var arquivoSalvo = arquivoRepository.save(arquivo);
        var actual = arquivoService.findById(arquivoSalvo.getId());

        assertNotNull(actual);
        assertTrue(actual.isPresent());
        assertInstanceOf(Arquivo.class, actual.get());
        assertEquals(arquivoSalvo.getNome(), actual.get().getNome());
        assertEquals(arquivoSalvo.getExtensao(), actual.get().getExtensao());
        assertEquals(arquivoSalvo.getTamanho(), actual.get().getTamanho());
    }

    @Test @Order(5)
    @DisplayName("Integration Test - Dado Arquivo Quando getContentType() Deve Retornar ContentType")
    void testDadoArquivo_QuandoGetContentType_DeveRetornarContentType() {
        doReturn("application/pdf").when(s3Service).getContentTypeFromS3(arquivo.getId().toString(), arquivo.getExtensao());

        var actual = arquivoService.getContentType(arquivo);

        assertNotNull(actual);
        assertInstanceOf(String.class, actual);
        assertEquals("application/pdf", actual);
    }

    @Test @Order(6)
    @DisplayName("Integration Test - Dado Arquivo Quando readFile() Deve Retornar ByteArrayResource")
    void testDadoArquivo_QuandoReadFile_DeveRetornarByteArrayResource() throws IOException {
        var file = ArquivoTestUtils.createFile(
                FileUtils.getUserDirectoryPath(), arquivo.getId().toString(), arquivo.getExtensao());

        var fileByteArray = Files.readAllBytes(file.toPath());
        doReturn(fileByteArray).when(s3Service).downloadFile(arquivo.getId().toString(), arquivo.getExtensao());

        var actual = arquivoService.getResource(arquivo);

        assertNotNull(actual);
        assertInstanceOf(ByteArrayResource.class, actual);

        FileUtils.delete(file);
    }
}
