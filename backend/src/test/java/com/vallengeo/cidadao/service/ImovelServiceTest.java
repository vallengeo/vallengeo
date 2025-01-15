package com.vallengeo.cidadao.service;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.cidadao.payload.request.ProcessoImovelRequest;
import com.vallengeo.cidadao.payload.request.imovel.*;
import com.vallengeo.cidadao.payload.response.FichaImovelResponse;
import com.vallengeo.cidadao.payload.response.cadastro.ProcessoResponse;
import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.portal.repository.GrupoRepository;
import com.vallengeo.portal.repository.UsuarioRepository;
import com.vallengeo.utils.*;
import org.geojson.Feature;
import org.geojson.LngLatAlt;
import org.geojson.Point;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.authentication.AuthenticationManager;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import static com.vallengeo.core.util.Constants.NOT_FOUND;
import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Imovel Service Tests")
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class ImovelServiceTest extends AbstractIntegrationTest {

    @Autowired
    private ImovelService imovelService;
    @Autowired
    private AuthenticationManager authManager;
    @Autowired
    private GrupoRepository grupoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    private ProcessoResponse processo;
    private ProcessoImovelRequest request;
    private InformacaoImovelRequest informacaoImovel;
    private GeorreferenciamentoRequest geoRefRequest;
    private List<RepresentanteRequest> representantes;
    private CaracterizacaoImovelRequest caracterizacaoImovel;
    private MockHttpServletRequest httpServletRequest;

    @BeforeAll
    public void setup() throws IOException {
        AuthTestUtils.setAuthentication(authManager, UsuarioTestUtils.DEFAULT_DEV_EMAIL, UsuarioTestUtils.DEFAULT_DEV_PASSWORD);

        var grupo = Objects.requireNonNull(grupoRepository.findById(UsuarioTestUtils.GRUPO_ID).orElse(null));
        var userDetails = usuarioRepository.findByEmailAndAtivoIsTrue(UsuarioTestUtils.DEFAULT_DEV_EMAIL).orElse(null);
        var token = JwtTestUtils.buildJwtToken(
                userDetails, grupo.getId().toString(), secretKey, expiration, algorithm);

        httpServletRequest = new MockHttpServletRequest();
        httpServletRequest.addHeader("Authorization", token);

        informacaoImovel = new InformacaoImovelRequest(
                new TipoUsoRequest(1L), EnderecoTestUtils.getEnderecoRequest());

        caracterizacaoImovel = new CaracterizacaoImovelRequest(
                "ABC", "10", "5", "2255", 200F, 10F, 0F, LocalDate.now());

        representantes = List.of(
                RepresentanteTestUtils.getRepresentantePessoaFisicaRequest(),
                RepresentanteTestUtils.getRepresentantePessoaJuridicaRequest()
        );

        Point point = new Point(new LngLatAlt(-47.92972, -15.77972));
        Feature feature = new Feature();

        feature.setGeometry(point);
        feature.setProperty("name", "Brasília");

        geoRefRequest = new GeorreferenciamentoRequest();
        geoRefRequest.setGeoJson(feature);

        var imovelRequest = new ImovelRequest();
        imovelRequest.setInformacaoImovel(informacaoImovel);
        imovelRequest.setCaracterizacaoImovel(caracterizacaoImovel);
        imovelRequest.setGeorreferenciamento(geoRefRequest);
        imovelRequest.setRepresentantes(representantes);

        request = new ProcessoImovelRequest(UsuarioTestUtils.GRUPO_ID.toString(), imovelRequest);
    }

    @Test @Order(1)
    @DisplayName("Integration Test - Dado ProcessoImovelRequest Quando cadastrar() Deve Retornar ProcessoResponse")
    void testDadoProcessoImovelRequest_QuandoCadastrar_DeveRetornarProcessoResponse() {
        var actual = imovelService.cadastrar(request);
        processo = actual;

        assertNotNull(actual);
        assertInstanceOf(ProcessoResponse.class, actual);
        assertEquals(geoRefRequest.getGeometria(), actual.imovel().getGeometria());
        assertEquals(caracterizacaoImovel.setor(), actual.imovel().getCaracterizacaoImovel().getSetor());
        assertEquals(caracterizacaoImovel.quadra(), actual.imovel().getCaracterizacaoImovel().getQuadra());
        assertEquals(caracterizacaoImovel.lote(), actual.imovel().getCaracterizacaoImovel().getLote());
        assertEquals((double) caracterizacaoImovel.areaTerreno(), actual.imovel().getCaracterizacaoImovel().getAreaTerreno());
        assertEquals(informacaoImovel.tipoUso().id(), actual.imovel().getInformacaoImovel().tipoUso().id());
        assertEquals(representantes.size(), actual.imovel().getRepresentantes().size());
    }

    @Test @Order(2)
    @DisplayName("Integration Test - Dado Processo Nao Cadastrado Quando fichaImovel() Deve Lancar ValidatorException")
    void testDadoProcessoNaoCadastrado_QuandoFichaImovel_DeveLancarValidatorException() {
        var processoId = UUID.randomUUID();

        var actual = assertThrows(
                ValidatorException.class,
                () -> imovelService.fichaImovel(processoId));

        assertEquals(HttpStatus.NOT_FOUND, actual.getStatus());
        assertEquals("Imóvel vinculado ao processo " + processoId + NOT_FOUND, actual.getMessage());
    }

    @Test @Order(3)
    @DisplayName("Integration Test - Dado Processo Quando fichaImovel() Deve Retornar FichaImovelResponse")
    void testDadoProcesso_QuandoFichaImovel_DeveRetornarFichaImovelResponse() {
        var actual = imovelService.fichaImovel(processo.id());

        assertNotNull(actual);
        assertInstanceOf(FichaImovelResponse.class, actual);
    }

    @Test @Order(4)
    @DisplayName("Integration Test - Dado Processo Quando fichaImovelImprimir() Deve Retornar ByteArrayResource")
    void testDadoProcesso_QuandoFichaImovelImprimir_DeveRetornarByteArrayResource() {
        var actual = imovelService.fichaImovelImprimir(processo.id(), httpServletRequest);

        assertNotNull(actual);
        assertInstanceOf(ByteArrayResource.class, actual);
    }
}