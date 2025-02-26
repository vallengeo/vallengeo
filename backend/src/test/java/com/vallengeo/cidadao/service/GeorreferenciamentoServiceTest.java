package com.vallengeo.cidadao.service;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.cidadao.payload.response.GeometriaPorAquivoResponse;
import com.vallengeo.core.exceptions.InvalidFileException;
import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.core.util.Constants;
import com.vallengeo.global.payload.response.geoserver.GeorreferenciamentoFeatureColletionResponse;
import com.vallengeo.global.service.GeoserverService;
import com.vallengeo.portal.repository.UsuarioRepository;
import com.vallengeo.utils.*;
import net.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.Geometry;
import org.opengis.referencing.FactoryException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.authentication.AuthenticationManager;
import org.testcontainers.shaded.org.apache.commons.io.FileUtils;
import org.testcontainers.shaded.org.apache.commons.io.FilenameUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.doReturn;

@DisplayName("GeorreferenciamentoService Tests")
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class GeorreferenciamentoServiceTest extends AbstractIntegrationTest {

    @Autowired
    private GeorreferenciamentoService georreferenciamentoService;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private AuthenticationManager authManager;

    @MockBean
    private GeoserverService geoserverService;

    private Coordinate[] coordinates;
    private MockMultipartFile prjFile;
    private MockMultipartFile dbfFile;
    private MockMultipartFile shapefile;
    private MockMultipartFile zippedFile;
    private MockHttpServletRequest httpServletRequest;
    private static GeorreferenciamentoFeatureColletionResponse featureColletionResponse;

    @BeforeAll
    public void setup() throws IOException, FactoryException {
        var userDetails = usuarioRepository.findByEmailAndAtivoIsTrue(UsuarioTestUtils.DEFAULT_DEV_EMAIL).orElse(null);
        var accessToken = JwtTestUtils.buildJwtToken(
                userDetails, UsuarioTestUtils.GRUPO_ID.toString(), secretKey, expiration, algorithm);

        httpServletRequest = new MockHttpServletRequest();
        httpServletRequest.addHeader(HttpHeaders.AUTHORIZATION, accessToken);

        AuthTestUtils.setAuthentication(authManager, UsuarioTestUtils.DEFAULT_DEV_EMAIL, UsuarioTestUtils.DEFAULT_DEV_PASSWORD);

        coordinates = ImovelTestUtils.getGeorreferenciamentoRequest().getGeometria().getCoordinates();
        shapefile = ArquivoTestUtils.fileToMockMultipartFile(ArquivoTestUtils.createShapefile(coordinates, "EPSG:4674"));

        prjFile = ArquivoTestUtils.fileToMockMultipartFile(
                new File(FileUtils.getTempDirectoryPath() + File.separator + FilenameUtils.getBaseName(shapefile.getOriginalFilename()) + ".prj"));

        dbfFile = ArquivoTestUtils.fileToMockMultipartFile(
                new File(FileUtils.getTempDirectoryPath() + File.separator + FilenameUtils.getBaseName(shapefile.getOriginalFilename()) + ".dbf"));

        byte[] zippedFileByteArray = ArquivoTestUtils.createMockZipFile(shapefile, prjFile, dbfFile);
        zippedFile = new MockMultipartFile(
                "zipped_file", "zipped_file.zip", "application/zip", zippedFileByteArray);

        var propriedades = new GeorreferenciamentoFeatureColletionResponse.Feature.Propriedade();
        propriedades.setFid(1);
        propriedades.setCd_geocodm("3513405");
        propriedades.setNm_municip("CRUZEIRO");
        propriedades.setEstado("SÃO PAULO");
        propriedades.setArea(305.698669283);

        var feature = new GeorreferenciamentoFeatureColletionResponse.Feature();
        feature.setType("Feature");
        feature.setId("limite_municipal.1875");
        feature.setGeometry_name("geom");
        feature.setProperties(propriedades);

        featureColletionResponse = new GeorreferenciamentoFeatureColletionResponse();
        featureColletionResponse.setType("FeatureCollection");
        featureColletionResponse.setFeatures(List.of(feature));
    }

    @Test
    @DisplayName("Integration Test - Dado Arquivo Nao Compactado Quando obterGeometriaPorShapeFile Deve Lancar InvalidFileException")
    public void testDadoArquivoNaoCompactado_QuandoObterGeometriaPorShapeFile_DeveLancarInvalidFileException() {
        var arquivoNaoCompactado = ArquivoTestUtils.mockMultipartFile(
                "arquivoNaoCompactado", "arquivoNaoCompactado.pdf", "application/pdf", RandomString.make(255).getBytes());

        var actual = assertThrows(
                InvalidFileException.class,
                () -> georreferenciamentoService.obterGeometriaPorShapeFile(arquivoNaoCompactado, httpServletRequest)
        );

        assertNotNull(actual);
        assertInstanceOf(InvalidFileException.class, actual);
        assertEquals(Constants.FILE_INVALID_ERROR, actual.getMessage());
    }

    @Test
    @DisplayName("Integration Test - Dado Arquivo Faltante Quando obterGeometriaPorShapeFile Deve Lancar InvalidFileException")
    public void testDadoArquivoFaltante_QuandoObterGeometriaPorShapeFile_DeveLancarInvalidFileException() throws IOException {
        byte[] arquivoFaltanteByteArray = ArquivoTestUtils.createMockZipFile(shapefile, prjFile);
        var arquivoFaltante = new MockMultipartFile(
                "zipped_file", "zipped_file.zip", "application/zip", arquivoFaltanteByteArray);

        var actual = assertThrows(
                InvalidFileException.class,
                () -> georreferenciamentoService.obterGeometriaPorShapeFile(arquivoFaltante, httpServletRequest)
        );

        assertNotNull(actual);
        assertInstanceOf(InvalidFileException.class, actual);
        assertEquals(Constants.FILE_INVALID_ERROR, actual.getMessage());
    }

    @Test
    @DisplayName("Integration Test - Dado Arquivo PRJ Invalido Quando obterGeometriaPorShapeFile Deve Lancar InvalidFileException")
    public void testDadoArquivoPRJInvalido_QuandoObterGeometriaPorShapeFile_DeveLancarInvalidFileException() throws IOException, FactoryException {
        var tempShapefile = ArquivoTestUtils.fileToMockMultipartFile(
                ArquivoTestUtils.createShapefile(coordinates, "EPSG:3857"));

        var arquivoPrj = ArquivoTestUtils.fileToMockMultipartFile(
                new File(FileUtils.getTempDirectoryPath() + File.separator + FilenameUtils.getBaseName(tempShapefile.getOriginalFilename()) + ".prj"));

        var arquivoDbf = ArquivoTestUtils.fileToMockMultipartFile(
                new File(FileUtils.getTempDirectoryPath() + File.separator + FilenameUtils.getBaseName(tempShapefile.getOriginalFilename()) + ".dbf"));

        byte[] arquivoZipByteArray = ArquivoTestUtils.createMockZipFile(tempShapefile, arquivoPrj, arquivoDbf);
        var arquivoZip = new MockMultipartFile(
                "zipped_file", "zipped_file.zip", "application/zip", arquivoZipByteArray);

        var actual = assertThrows(
                InvalidFileException.class,
                () -> georreferenciamentoService.obterGeometriaPorShapeFile(arquivoZip, httpServletRequest)
        );

        assertNotNull(actual);
        assertInstanceOf(InvalidFileException.class, actual);
        assertEquals(Constants.FILE_INVALID_ERROR, actual.getMessage());
    }

    @Test
    @DisplayName("Integration Test - Dado Arquivo SHP Sem Geometrias Quando obterGeometriaPorShapeFile Deve Lancar InvalidFileException")
    public void testDadoArquivoSHPSemGeometrias_QuandoObterGeometriaPorShapeFile_DeveLancarInvalidFileException() throws FactoryException, IOException {
        Coordinate[] coordinates = {};
        File tempShapefile = ArquivoTestUtils.createShapefile(coordinates, "EPSG:4674");
        var shapefileMultipartFile = new MockMultipartFile(
                "temp_shapefile", tempShapefile.getName(), "application/shp", Files.readAllBytes(tempShapefile.toPath()));

        var zipByteArray = ArquivoTestUtils.createMockZipFile(shapefileMultipartFile, prjFile, dbfFile);
        var zipMultipartFile = ArquivoTestUtils.mockMultipartFile(
                "zipped_file", "zipped_file.zip", "application/zip", zipByteArray);

        var actual = assertThrows(
                InvalidFileException.class,
                () -> georreferenciamentoService.obterGeometriaPorShapeFile(zipMultipartFile, httpServletRequest));

        assertNotNull(actual);
        assertInstanceOf(InvalidFileException.class, actual);
        assertEquals(Constants.FILE_INVALID_ERROR, actual.getMessage());
    }

    @Test
    @DisplayName("Integration Test - Dado Geometria Sem Intersecoes Quando obterGeometriaPorShapeFile Deve Lancar ValidatorException")
    public void testDadoGeometriaSemIntersecoes_QuandoObterGeometriaPorShapeFile_DeveLancarValidatorException() {
        doReturn(null).when(geoserverService).contidoNaCamadaDoGrupo(any(Geometry.class), anyString());

        var actual = assertThrows(
                ValidatorException.class,
                () -> georreferenciamentoService.obterGeometriaPorShapeFile(zippedFile, httpServletRequest));

        assertNotNull(actual);
        assertInstanceOf(ValidatorException.class, actual);
        assertEquals(HttpStatus.NOT_ACCEPTABLE, actual.getStatus());
        assertEquals(Constants.GEOMETRY_WHITHOUT_INTERSECTS, actual.getMessage());
    }

    @Test
    @DisplayName("Integration Test - Dado Shapefile Quando obterGeometriaPorShapeFile Deve Retornar GeometriaPorAquivoResponse")
    public void testDadoShapefile_QuandoObterGeometriaPorShapeFile_DeveRetornarGeometriaPorAquivoResponse() {
        doReturn(featureColletionResponse).when(geoserverService)
                .contidoNaCamadaDoGrupo(any(Geometry.class), eq("limite_municipal"));

        var actual = georreferenciamentoService.obterGeometriaPorShapeFile(zippedFile, httpServletRequest);

        assertNotNull(actual);
        assertInstanceOf(GeometriaPorAquivoResponse.class, actual);
    }
}