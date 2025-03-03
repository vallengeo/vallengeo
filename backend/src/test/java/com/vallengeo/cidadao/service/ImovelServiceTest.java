package com.vallengeo.cidadao.service;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.cidadao.payload.request.ProcessoImovelRequest;
import com.vallengeo.cidadao.payload.request.imovel.CaracterizacaoImovelRequest;
import com.vallengeo.cidadao.payload.response.*;
import com.vallengeo.cidadao.payload.response.cadastro.ProcessoResponse;
import com.vallengeo.cidadao.repository.ImovelRepository;
import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.core.util.Paginacao;
import com.vallengeo.portal.repository.GrupoRepository;
import com.vallengeo.portal.repository.UsuarioRepository;
import com.vallengeo.utils.AuthTestUtils;
import com.vallengeo.utils.ImovelTestUtils;
import com.vallengeo.utils.JwtTestUtils;
import com.vallengeo.utils.UsuarioTestUtils;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.authentication.AuthenticationManager;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

import static com.vallengeo.core.util.Constants.NOT_FOUND;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.doReturn;

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

    @SpyBean
    private ImovelRepository imovelRepository;

    private UUID processoIdNaoCadastrado;
    private ProcessoResponse processoCadastrado;
    private ProcessoImovelRequest imovelRequest;
    private MockHttpServletRequest httpServletRequest;
    private Paginacao.PaginacaoInput paginacaoInput;

    @BeforeAll
    public void setup() throws IOException {
        AuthTestUtils.setAuthentication(authManager, UsuarioTestUtils.DEFAULT_DEV_EMAIL, UsuarioTestUtils.DEFAULT_DEV_PASSWORD);

        var userDetails = usuarioRepository.findByEmailAndAtivoIsTrue(UsuarioTestUtils.DEFAULT_DEV_EMAIL).orElse(null);
        var token = JwtTestUtils.buildJwtToken(
                userDetails, UsuarioTestUtils.GRUPO_ID.toString(), secretKey, expiration, algorithm);

        httpServletRequest = new MockHttpServletRequest();
        httpServletRequest.addHeader("Authorization", token);

        imovelRequest = ImovelTestUtils.getProcessoImovelRequest(UsuarioTestUtils.GRUPO_ID.toString(), 1L);
        processoCadastrado = imovelService.cadastrar(imovelRequest);

        paginacaoInput = new Paginacao.PaginacaoInput(0, 10, null, "");
        processoIdNaoCadastrado = UUID.randomUUID();
    }

    @Test @Order(1)
    @DisplayName("Integration Test - Dado ProcessoImovelRequest Quando cadastrar() Deve Retornar ProcessoResponse")
    void testDadoProcessoImovelRequest_QuandoCadastrar_DeveRetornarProcessoResponse() {
        var actual = imovelService.cadastrar(imovelRequest);

        assertNotNull(actual);
        assertInstanceOf(ProcessoResponse.class, actual);
        assertEquals(imovelRequest.imovel().getGeorreferenciamento().getGeometria(), actual.imovel().getGeometria());
        assertEquals(imovelRequest.imovel().getCaracterizacaoImovel().setor(), actual.imovel().getCaracterizacaoImovel().getSetor());
        assertEquals(imovelRequest.imovel().getCaracterizacaoImovel().quadra(), actual.imovel().getCaracterizacaoImovel().getQuadra());
        assertEquals(imovelRequest.imovel().getCaracterizacaoImovel().lote(), actual.imovel().getCaracterizacaoImovel().getLote());
        assertEquals((double) imovelRequest.imovel().getCaracterizacaoImovel().areaTerreno(), actual.imovel().getCaracterizacaoImovel().getAreaTerreno());
        assertEquals(imovelRequest.imovel().getInformacaoImovel().tipoUso().id(), actual.imovel().getInformacaoImovel().tipoUso().id());
        assertEquals(imovelRequest.imovel().getRepresentantes().size(), actual.imovel().getRepresentantes().size());
    }

    @Test @Order(2)
    @DisplayName("Integration Test - Dado Processo Nao Cadastrado Quando fichaImovel() Deve Lancar ValidatorException")
    void testDadoProcessoNaoCadastrado_QuandoFichaImovel_DeveLancarValidatorException() {
        var actual = assertThrows(
                ValidatorException.class,
                () -> imovelService.fichaImovel(processoIdNaoCadastrado));

        assertEquals(HttpStatus.NOT_FOUND, actual.getStatus());
        assertEquals("Imóvel vinculado ao processo " + processoIdNaoCadastrado + NOT_FOUND, actual.getMessage());
    }

    @Test @Order(3)
    @DisplayName("Integration Test - Dado Processo Quando fichaImovel() Deve Retornar FichaImovelResponse")
    void testDadoProcesso_QuandoFichaImovel_DeveRetornarFichaImovelResponse() {
        var actual = imovelService.fichaImovel(processoCadastrado.id());

        assertNotNull(actual);
        assertInstanceOf(FichaImovelResponse.class, actual);
        assertEquals(processoCadastrado.id(), actual.getProcesso().getId());
        assertEquals(processoCadastrado.protocolo(), actual.getProcesso().getProtocolo());
        assertEquals(processoCadastrado.imovel().getId(), actual.getId());
        assertEquals(processoCadastrado.imovel().getGeometria(), actual.getGeometria());
        assertEquals(processoCadastrado.imovel().getInscricaoImobiliaria(), actual.getInscricaoImobiliaria());
    }

    @Test @Order(4)
    @DisplayName("Integration Test - Dado processoId Nao Cadastrado Quando fichaImovelImprimir Deve Lancar ValidatorException")
    public void testDadoProcessoIdNaoCadastrado_QuandoFichaImovelImprimir_DeveLancarValidatorException() {
        var actual = assertThrows(
                ValidatorException.class,
                () -> imovelService.editar(processoIdNaoCadastrado, imovelRequest));

        assertNotNull(actual);
        assertEquals(HttpStatus.NOT_FOUND, actual.getStatus());
        assertEquals("Processo " + processoIdNaoCadastrado + NOT_FOUND, actual.getMessage());
    }

    @Test @Order(5)
    @DisplayName("Integration Test - Dado Processo Quando fichaImovelImprimir() Deve Retornar ByteArrayResource")
    void testDadoProcesso_QuandoFichaImovelImprimir_DeveRetornarByteArrayResource() {
        var actual = imovelService.fichaImovelImprimir(processoCadastrado.id(), httpServletRequest);

        assertNotNull(actual);
        assertInstanceOf(ByteArrayResource.class, actual);
    }

    @Test @Order(6)
    @DisplayName("Integration Test - Dado Imoveis Cadastrados Quando buscarTodosCadastrados Deve Retornar Paginacao ProcessoListagemSimplificadoResponse")
    public void testDadoImoveisCadastrados_QuandoBuscarTodosCadastrados_DeveRetornarPaginacaoProcessoListagemSimplificadoResponse() {
        var actual = imovelService.buscarTodosCadastrados("", paginacaoInput, httpServletRequest);

        assertNotNull(actual);
        assertFalse(actual.getConteudo().isEmpty());
        assertInstanceOf(ProcessoListagemSimplificadoResponse.class, actual.getConteudo().get(0));
        assertEquals(paginacaoInput.getPagina(), actual.getPagina());
        assertEquals(paginacaoInput.getItensPorPagina(), actual.getItensPorPagina());

        var actualImovel = actual.getConteudo().stream().filter(
                response -> response.getProcesso().getId().equals(processoCadastrado.id())).findFirst();

        assertTrue(actualImovel.isPresent());
        assertEquals(processoCadastrado.id(), actualImovel.get().getProcesso().getId());
        assertEquals(processoCadastrado.protocolo(), actualImovel.get().getProcesso().getProtocolo());
        assertEquals(processoCadastrado.imovel().getInscricaoImobiliaria(), actualImovel.get().getInscricaoImobiliaria());
    }

    @Test @Order(7)
    @DisplayName("Integration Test - Dado Imoveis Cadastrados Quando buscarDadosMapaImovel Deve Retornar Lista MapaImovelResponse")
    public void testDadoImoveisCadastrados_QuandoBuscarDadosMapaImovel_DeveRetornarListaMapaImovelResponse() {
        var actual = imovelService.buscarDadosMapaImovel(httpServletRequest);

        assertNotNull(actual);
        assertFalse(actual.isEmpty());
        assertInstanceOf(MapaImovelResponse.class, actual.get(0));

        var actualImovel = actual.stream().filter(
                mapaImovelResponse -> mapaImovelResponse.getIdProcesso().equals(processoCadastrado.id())).findFirst();

        assertTrue(actualImovel.isPresent());
        assertEquals(processoCadastrado.id(), actualImovel.get().getIdProcesso());
        assertEquals(processoCadastrado.imovel().getGeometria(), actualImovel.get().getGeometria());
        assertEquals(processoCadastrado.imovel().getInscricaoImobiliaria(), actualImovel.get().getInscricaoImobiliaria());
    }

    @Test @Order(8)
    @DisplayName("Integration Test - Dado processoId Nao Cadastrado Quando editar Deve Lancar ValidatorException")
    public void testDadoProcessoIdNaoCadastrado_QuandoEditar_DeveLancarValidatorException() {
        var actual = assertThrows(
                ValidatorException.class,
                () -> imovelService.editar(processoIdNaoCadastrado, imovelRequest));

        assertNotNull(actual);
        assertEquals(HttpStatus.NOT_FOUND, actual.getStatus());
        assertEquals("Processo " + processoIdNaoCadastrado + NOT_FOUND, actual.getMessage());
    }

    @Test @Order(9)
    @DisplayName("Integration Test - Dado Processo Sem Imovel Cadastrado Quando editar Deve Lancar ValidatorException")
    public void testDadoProcessoSemImovelCadastrado_QuandoEditar_DeveLancarValidatorException() {
        doReturn(Optional.empty()).when(imovelRepository).findByProcessoId(processoCadastrado.id());

        var actual = assertThrows(
                ValidatorException.class,
                () -> imovelService.editar(processoCadastrado.id(), imovelRequest));

        assertNotNull(actual);
        assertEquals(HttpStatus.NOT_FOUND, actual.getStatus());
        assertEquals("Imóvel vinculado ao processo " + processoCadastrado.id() + NOT_FOUND, actual.getMessage());
    }

    @Test @Order(10)
    @DisplayName("Integration Test - Dado processoId E ProcessoImovelRequest Quando editar Deve Retornar ProcessoResponse")
    public void testDadoProcessoIdEProcessoImovelRequest_QuandoEditar_DeveRetornarProcessoResponse() {
        var caracterizacaoImovel = new CaracterizacaoImovelRequest(
                "XYZ", "55", "256", "4C", 640F,35F, null, LocalDate.now().minusDays(5));

        imovelRequest.imovel().setCaracterizacaoImovel(caracterizacaoImovel);

        var actual = imovelService.editar(processoCadastrado.id(), imovelRequest);

        assertNotNull(actual);
        assertEquals(processoCadastrado.id(), actual.id());
        assertNotEquals(processoCadastrado.imovel().getCaracterizacaoImovel(), actual.imovel().getCaracterizacaoImovel());
        assertEquals(caracterizacaoImovel.setor(), actual.imovel().getCaracterizacaoImovel().getSetor());
        assertEquals(caracterizacaoImovel.quadra(), actual.imovel().getCaracterizacaoImovel().getQuadra());
        assertEquals(caracterizacaoImovel.lote(), actual.imovel().getCaracterizacaoImovel().getLote());
        assertEquals(caracterizacaoImovel.unidade(), actual.imovel().getCaracterizacaoImovel().getUnidade());
        assertEquals((double) caracterizacaoImovel.areaTerreno(), actual.imovel().getCaracterizacaoImovel().getAreaTerreno());
        assertEquals((double) caracterizacaoImovel.testadaPrincipal(), actual.imovel().getCaracterizacaoImovel().getTestadaPrincipal());
        assertEquals(caracterizacaoImovel.dataInclusao(), actual.imovel().getCaracterizacaoImovel().getDataInclusao());

        processoCadastrado.imovel().setInscricaoImobiliaria(actual.imovel().getInscricaoImobiliaria());
    }

    @Test @Order(11)
    @DisplayName("Integration Test - Dado processoId Nao Cadastrado Quando buscaProtocolo Deve Lancar ValidatorException")
    public void testDadoProcessoIdNaoCadastrado_QuandoBuscaProtocolo_DeveLancarValidatorException() {
        var actual = assertThrows(
                ValidatorException.class,
                () -> imovelService.buscaProtocolo(processoIdNaoCadastrado));

        assertNotNull(actual);
        assertEquals(HttpStatus.NOT_FOUND, actual.getStatus());
        assertEquals("Imóvel vinculado ao processo " + processoIdNaoCadastrado + NOT_FOUND, actual.getMessage());
    }

    @Test @Order(12)
    @DisplayName("Integration Test - Dado processoId Quando buscaProtocolo Deve Retornar ProtocoloResponse")
    public void testDadoProcessoId_QuandoBuscaProtocolo_DeveRetornarProtocoloResponse() {
        var actual = imovelService.buscaProtocolo(processoCadastrado.id());

        assertNotNull(actual);
        assertInstanceOf(ProtocoloResponse.class, actual);
        assertEquals(processoCadastrado.id(), actual.getProcesso().getId());
        assertEquals(processoCadastrado.protocolo(), actual.getProcesso().getProtocolo());
        assertEquals(processoCadastrado.imovel().getId(), actual.getId());
        assertEquals(processoCadastrado.imovel().getInscricaoImobiliaria(), actual.getInscricaoImobiliaria());
    }

    @Test @Order(13)
    @DisplayName("Integration Test - Dado processoId Nao Cadastrado Quando fichaImovelAnalista Deve Lancar ValidatorException")
    public void testDadoProcessoIdNaoCadastrado_QuandoFichaImovelAnalista_DeveLancarValidatorException() {
        var actual = assertThrows(
                ValidatorException.class,
                () -> imovelService.fichaImovelAnalista(processoIdNaoCadastrado));

        assertNotNull(actual);
        assertEquals(HttpStatus.NOT_FOUND, actual.getStatus());
        assertEquals("Imóvel vinculado ao processo " + processoIdNaoCadastrado + NOT_FOUND, actual.getMessage());
    }

    @Test @Order(14)
    @DisplayName("Integration Test - Dado processoId Quando fichaImovelAnalista Deve Retornar FichaImovelAnalistaResponse")
    public void testDadoProcessoId_QuandoFichaImovelAnalista_DeveRetornarFichaImovelAnalistaResponse() {
        var actual = imovelService.fichaImovelAnalista(processoCadastrado.id());

        assertNotNull(actual);
        assertInstanceOf(FichaImovelAnalistaResponse.class, actual);
        assertEquals(processoCadastrado.id(), actual.getProcesso().getId());
        assertEquals(processoCadastrado.imovel().getId(), actual.getId());
        assertEquals(processoCadastrado.imovel().getInscricaoImobiliaria(), actual.getInscricaoImobiliaria());
        assertEquals(processoCadastrado.imovel().getGeometria(), actual.getGeometria());
    }
}