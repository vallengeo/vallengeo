package com.vallengeo.cidadao.service;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.utils.ArquivoTestUtils;
import net.bytebuddy.utility.RandomString;
import org.apache.commons.compress.utils.FileNameUtils;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import software.amazon.awssdk.awscore.exception.AwsServiceException;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.doThrow;

@DisplayName("S3Service Tests")
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class S3ServiceTest extends AbstractIntegrationTest {

    @Autowired
    private S3Service s3Service;
    @MockBean
    private S3Client s3Client;

    private File testFile;
    private MockMultipartFile testMultipartFile;

    private final String PDF_EXTENSION = ".pdf";

    @BeforeAll
    public void setup() {
        testMultipartFile = new MockMultipartFile(
                UUID.randomUUID().toString(),
                "documento_XYZ.pdf",
                "application/pdf",
                RandomString.make(255).getBytes()
        );

        testFile = ArquivoTestUtils.createFile(FileUtils.getTempDirectoryPath(), "test_file", PDF_EXTENSION);
    }

    @AfterAll
    public void clean() throws IOException {
        FileUtils.delete(testFile);
    }

    @Test
    @DisplayName("Integration Test - Dado Upload Error Quando uploadMultipartFile Deve Lancar RuntimeException")
    public void testDadoUploadError_QuandoUploadMultipartFile_DeveLancarRuntimeException() {
        doThrow(S3Exception.class)
                .when(s3Client).putObject(any(PutObjectRequest.class), any(RequestBody.class));

        assertThrows(
                RuntimeException.class,
                () -> s3Service.uploadMultipartFile(testMultipartFile, testMultipartFile.getName(), PDF_EXTENSION)
        );
    }

    @Test
    @DisplayName("Integration Test - Dado MultipartFile Quando uploadMultipartFile Deve Retornar String")
    public void testDadoMultipartFile_QuandoUploadMultipartFile_DeveRetornarString() {
        doReturn(PutObjectResponse.builder().build())
                .when(s3Client).putObject(any(PutObjectRequest.class), any(RequestBody.class));

        var actual = s3Service.uploadMultipartFile(testMultipartFile, testMultipartFile.getName(), PDF_EXTENSION);

        assertNotNull(actual);
        assertEquals("File uploaded: " + testMultipartFile.getName() + PDF_EXTENSION, actual);
    }

    @Test
    @DisplayName("Integration Test - Dado Upload Error Quando uploadFile Deve Lancar RuntimeException")
    public void testDadoUploadError_QuandoUploadFile_DeveLancarRuntimeException() {
        doThrow(S3Exception.class)
                .when(s3Client).putObject(any(PutObjectRequest.class), any(RequestBody.class));

        assertThrows(
                RuntimeException.class,
                () -> s3Service.uploadFile(testFile, testFile.getName(), PDF_EXTENSION)
        );
    }

    @Test
    @DisplayName("Integration Test - Dado MultipartFile Quando uploadFile Deve Retornar String")
    public void testDadoMultipartFile_QuandoUploadFile_DeveRetornarString() {
        doReturn(PutObjectResponse.builder().build())
                .when(s3Client).putObject(any(PutObjectRequest.class), any(RequestBody.class));

        var actual = s3Service.uploadFile(testFile, testFile.getName(), PDF_EXTENSION);

        assertNotNull(actual);
        assertEquals("File uploaded: " + testFile.getName() + PDF_EXTENSION, actual);
    }

    @Test
    @DisplayName("Integration Test - Dado Nome De Arquivo Nao Cadastrado Quando downloadFile Deve Lancar RuntimeException")
    public void testDadoNomeDeArquivoNaoCadastrado_QuandoDownloadFile_DeveLancarRuntimeException() {
        doThrow(AwsServiceException.class).when(s3Client).getObject(any(GetObjectRequest.class));

        assertThrows(
                RuntimeException.class,
                () -> s3Service.downloadFile(testFile.getName(), PDF_EXTENSION));
    }

    @Test
    @DisplayName("Integration Test - Dado Nome Arquivo Cadastrado Quando downloadFile Deve Retornar ByteArray")
    public void testDadoNomeArquivoCadastrado_QuandoDownloadFile_DeveRetornarByteArray() throws FileNotFoundException {
        GetObjectResponse response = GetObjectResponse.builder()
                .contentType("application/pdf")
                .build();

        ResponseInputStream<GetObjectResponse> responseInputStream = new ResponseInputStream<>(response, new FileInputStream(testFile));
        doReturn(responseInputStream).when(s3Client).getObject(any(GetObjectRequest.class));

        var actual = s3Service.downloadFile(testFile.getName(), PDF_EXTENSION);

        assertNotNull(actual);
        assertInstanceOf(byte[].class, actual);
    }

    @Test
    @DisplayName("Integration Test - Dado Nome De Arquivo Nao Cadastrado Quando getContentTypeFromS3 Deve Lancar RuntimeException")
    public void testDadoNomeDeArquivoNaoCadastrado_QuandoGetContentTypeFromS3_DeveLancarRuntimeException() {
        doThrow(AwsServiceException.class).when(s3Client).headObject(any(HeadObjectRequest.class));

        var actual = assertThrows(
                RuntimeException.class,
                () -> s3Service.getContentTypeFromS3(FilenameUtils.getBaseName(testFile.getName()), PDF_EXTENSION));

        assertNotNull(actual);
        assertEquals("Erro ao buscar Content-Type do S3 para o arquivo: " + testFile.getName(), actual.getMessage());
    }

    @Test
    @DisplayName("Integration Test - Dado Nome Arquivo Quando getContentTypeFromS3 Deve Retornar ContentType")
    public void testDadoNomeArquivo_QuandoGetContentTypeFromS3_DeveRetornarContentType() throws IOException {
        var headObjectResponse = HeadObjectResponse.builder()
                .contentType("application/pdf")
                .build();

        doReturn(headObjectResponse).when(s3Client).headObject(any(HeadObjectRequest.class));

        var actual = s3Service.getContentTypeFromS3(FileNameUtils.getBaseName(testFile.getName()),PDF_EXTENSION);

        assertNotNull(actual);
        assertEquals(Files.probeContentType(testFile.toPath()), actual);
    }
}