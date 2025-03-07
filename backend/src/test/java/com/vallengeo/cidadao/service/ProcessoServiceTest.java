package com.vallengeo.cidadao.service;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.cidadao.enumeration.SituacaoProcessoEnum;
import com.vallengeo.cidadao.model.Processo;
import com.vallengeo.cidadao.model.RelGrupoTipoDocumento;
import com.vallengeo.cidadao.payload.request.FiltroRelatorioRequest;
import com.vallengeo.cidadao.payload.request.ProcessoArquivarRequest;
import com.vallengeo.cidadao.payload.request.ProcessoObservacaoRequest;
import com.vallengeo.cidadao.payload.request.RelatorioRequest;
import com.vallengeo.cidadao.payload.response.TotalizadorProcessoResponse;
import com.vallengeo.cidadao.payload.response.UltimoProcessoResponse;
import com.vallengeo.cidadao.payload.response.cadastro.ProcessoResponse;
import com.vallengeo.cidadao.repository.DocumentoRepository;
import com.vallengeo.cidadao.repository.ProcessoRepository;
import com.vallengeo.cidadao.repository.RelGrupoTipoDocumentoRepository;
import com.vallengeo.cidadao.repository.RelProcessoSituacaoProcessoRepository;
import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.portal.repository.UsuarioRepository;
import com.vallengeo.utils.AuthTestUtils;
import com.vallengeo.utils.DocumentoTestUtils;
import com.vallengeo.utils.JwtTestUtils;
import com.vallengeo.utils.UsuarioTestUtils;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static com.vallengeo.core.util.Constants.NOT_FOUND;
import static org.junit.jupiter.api.Assertions.*;

@DisplayName("ProcessoService Tests")
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class ProcessoServiceTest extends AbstractIntegrationTest {

    @Autowired
    private ProcessoService processoService;
    @Autowired
    private AuthenticationManager authManager;
    @Autowired
    private DocumentoRepository documentoRepository;
    @Autowired
    private RelGrupoTipoDocumentoRepository grupoTipoDocumentoRepository;
    @Autowired
    private RelProcessoSituacaoProcessoRepository processoSituacaoProcessoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private ProcessoRepository processoRepository;

    private Processo processoCadastrado;
    private UUID processoIdNaoCadastrado;
    private MockHttpServletRequest httpServletRequest;
    private ProcessoArquivarRequest processoArquivarRequest;

    @BeforeAll
    public void setup() throws IOException {
        AuthTestUtils.setAuthentication(authManager, UsuarioTestUtils.DEFAULT_DEV_EMAIL, UsuarioTestUtils.DEFAULT_DEV_PASSWORD);

        var userDetails = usuarioRepository.findByEmailAndAtivoIsTrue(UsuarioTestUtils.DEFAULT_DEV_EMAIL).orElse(null);
        var token = JwtTestUtils.buildJwtToken(
                userDetails, UsuarioTestUtils.GRUPO_ID.toString(), secretKey, expiration, algorithm);

        httpServletRequest = new MockHttpServletRequest();
        httpServletRequest.addHeader(HttpHeaders.AUTHORIZATION, token);

        processoCadastrado = processoService.cadastrar(UsuarioTestUtils.GRUPO_ID.toString());

        processoIdNaoCadastrado = UUID.randomUUID();
        processoArquivarRequest = new ProcessoArquivarRequest();
        processoArquivarRequest.setIdProcesso(processoCadastrado.getId());
        processoArquivarRequest.setTitulo("Arquivação de processo");
        processoArquivarRequest.setDescricao("Processo arquivo por motivos XYZ. Processo com efeito imediato.");
    }

    @Test @Order(1)
    @DisplayName("Integration Test - Dado IdGrupo Nao Cadastrado Quando cadastrar Deve Lancar ValidatorException")
    void testDadoIdGrupoNaoCadastrado_QuandoCadastrar_DeveLancarValidatorException() {
        var idGrupo = UUID.randomUUID().toString();

        var actual = assertThrows(
                ValidatorException.class,
                () -> processoService.cadastrar(idGrupo));

        assertEquals(HttpStatus.NOT_FOUND, actual.getStatus());
        assertEquals(String.format("Grupo %s não encontrado!", idGrupo), actual.getMessage());
    }

    @Test @Order(2)
    @DisplayName("Integration Test - Dado IdGrupo Quando cadastrar Deve Retornar Processo")
    void testDadoIdGrupo_QuandoCadastrar_DeveRetornarProcesso() {
        AuthTestUtils.setAuthentication(authManager, "vallengeo.dev@gmail.com", "123456");
        var actual = processoService.cadastrar(UsuarioTestUtils.GRUPO_ID.toString());

        assertNotNull(actual);
        assertInstanceOf(Processo.class, actual);
        assertNotNull(actual.getProtocolo());
        assertNotNull(actual.getDataCadastro());
        assertEquals(UsuarioTestUtils.GRUPO_ID, actual.getGrupo().getId());
        assertEquals("vallengeo.dev@gmail.com", actual.getUsuario().getEmail());
    }

    @Test @Order(3)
    @DisplayName("Integration Test - Dado idProcesso Nao Cadastrado Quando validacaoPosCadastrarDocumento Deve Lancar ValidatorException")
    void testDadoIdProcessoNaoCadastrado_QuandoValidacaoPosCadastrarDocumento_DeveLancarValidatorException() {
        var idProcesso = UUID.randomUUID();

        var actual = assertThrows(
                ValidatorException.class,
                () -> processoService.validacaoPosCadastrarDocumento(idProcesso));

        assertEquals(HttpStatus.NOT_FOUND, actual.getStatus());
        assertEquals(String.format("Processo " + idProcesso + NOT_FOUND), actual.getMessage());
    }

    @Test @Order(4)
    @DisplayName("Integration Test - Dado Documentos Obrigatorios Nao Cadastrados Quando validacaoPosCadastrarDocumento Deve Nao Alterar Status")
    void testDadoDocumentosObrigatoriosNaoCadastrados_QuandoValidacaoPosCadastrarDocumento_DeveNaoAlterarStatus() {
        processoService.validacaoPosCadastrarDocumento(processoCadastrado.getId());
        var actual = processoSituacaoProcessoRepository
                .findAllByProcessoIdAndAtivoIsTrue(processoCadastrado.getId()).stream().findFirst().orElse(null);

        assertNotNull(actual);
        assertEquals(SituacaoProcessoEnum.PENDENTE_UPLOAD_ARQUIVO.toString(), actual.getSituacaoProcesso().getCodigo());
    }

    @Test @Order(5)
    @DisplayName("Integration Test - Dado Documentos Obrigatorios Cadastrados Quando validacaoPosCadastrarDocumento Deve Alterar Status")
    void testDadoDocumentosObrigatoriosCadastrados_QuandoValidacaoPosCadastrarDocumento_DeveAlterStatus() {
        var documentosObrigatorios = grupoTipoDocumentoRepository.findAll().stream()
                .filter(RelGrupoTipoDocumento::getObrigatorio).toList();

        for (RelGrupoTipoDocumento relGrupoTipoDocumento: documentosObrigatorios) {
            documentoRepository.save(DocumentoTestUtils
                    .getDocumentoByTipoDocumento(processoCadastrado, relGrupoTipoDocumento.getTipoDocumento()));
        }

        processoService.validacaoPosCadastrarDocumento(processoCadastrado.getId());
        var actual = processoSituacaoProcessoRepository
                .findAllByProcessoIdAndAtivoIsTrue(processoCadastrado.getId()).stream().findFirst().orElse(null);

        assertNotNull(actual);
        assertNotEquals(processoCadastrado.getDataAlteracao(), actual.getProcesso().getDataAlteracao());
        assertEquals(SituacaoProcessoEnum.AGUARDANDO_APROVACAO.toString(), actual.getSituacaoProcesso().getCodigo());
    }

    @Test @Order(6)
    @DisplayName("Integration Test - Dado Processos Cadastrados Quando buscarTodosPeloGrupoId Deve Retornar Lista Processo")
    public void testDadoProcessosCadastrados_QuandoBuscarTodosPeloGrupoId_DeveRetornarListaProcesso() {
        var actual = processoService.buscarTodosPeloGrupoId(httpServletRequest);

        assertNotNull(actual);
        assertFalse(actual.isEmpty());
        assertInstanceOf(Processo.class, actual.get(0));

        var actualProcesso = actual.stream().filter(
                processo -> processo.getId().equals(processoCadastrado.getId())).findFirst();

        assertTrue(actualProcesso.isPresent());
        assertEquals(processoCadastrado.getId(), actualProcesso.get().getId());
        assertEquals(processoCadastrado.getProtocolo(), actualProcesso.get().getProtocolo());
    }

    @Test @Order(7)
    @DisplayName("Integration Test - Dado processoId Nao Cadastrado Quando editar Deve Lancar ValidatorException")
    public void testDadoProcessoIdNaoCadastrado_QuandoEditar_DeveLancarValidatorException() {
        var actual = assertThrows(
                ValidatorException.class,
                () -> processoService.editar(processoIdNaoCadastrado, UsuarioTestUtils.GRUPO_ID.toString()));

        assertNotNull(actual);
        assertInstanceOf(ValidatorException.class, actual);
        assertEquals("Processo " + processoIdNaoCadastrado + NOT_FOUND, actual.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, actual.getStatus());
    }

    @Test @Order(8)
    @DisplayName("Integration Test - Dado grupoId Nao Cadastrado Quando editar Deve Lancar ValidatorException")
    public void testDadoGrupoIdNaoCadastrado_QuandoEditar_DeveLancarValidatorException() {
        var actual = assertThrows(
                ValidatorException.class,
                () -> processoService.editar(processoCadastrado.getId(), UUID.randomUUID().toString()));

        assertNotNull(actual);
        assertInstanceOf(ValidatorException.class, actual);
        assertEquals("Processo " + processoCadastrado.getId() + NOT_FOUND, actual.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, actual.getStatus());
    }

    @Test @Order(9)
    @DisplayName("Integration Test - Dado Processo Cadastrado Quando editar Deve Retornar Processo")
    public void testDadoProcessoCadastrado_QuandoEditar_DeveRetornarProcesso() {
        var actual = processoService.editar(processoCadastrado.getId(), UsuarioTestUtils.GRUPO_ID.toString());

        assertNotNull(actual);
        assertInstanceOf(Processo.class, actual);
        assertEquals(processoCadastrado.getId(), actual.getId());
        assertNotEquals(processoCadastrado.getDataAlteracao(), actual.getDataAlteracao());
    }

    @Test @Order(10)
    @DisplayName("Integration Test - Dado processoId Nao Cadastrado Quando arquivar Deve Lancar ValidatorException")
    public void testDadoProcessoIdNaoCadastrado_QuandoArquivar_DeveLancarValidatorException() {
        var arquivarProcessoNaoCadastrado = new ProcessoArquivarRequest();
        arquivarProcessoNaoCadastrado.setIdProcesso(processoIdNaoCadastrado);

        var actual = assertThrows(
                ValidatorException.class,
                () -> processoService.arquivar(arquivarProcessoNaoCadastrado));

        assertNotNull(actual);
        assertInstanceOf(ValidatorException.class, actual);
        assertEquals("Processo " + processoIdNaoCadastrado + NOT_FOUND, actual.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, actual.getStatus());
    }

    @Test @Order(11)
    @DisplayName("Integration Test - Dado ProcessoArquivarRequest Quando arquivar Deve Retornar ProcessoResponse")
    public void testDadoProcessoArquivarRequest_QuandoArquivar_DeveRetornarProcessoResponse() throws IOException {
        var actual = processoService.arquivar(processoArquivarRequest);

        assertNotNull(actual);
        assertInstanceOf(ProcessoResponse.class, actual);
        assertEquals(processoCadastrado.getId(), actual.id());
        assertEquals(processoCadastrado.getProtocolo(), actual.protocolo());

        var processoArquivado = processoRepository.findById(processoCadastrado.getId()).orElse(null);
        assertNotNull(processoArquivado);
        assertNotEquals(processoCadastrado.getDataAlteracao(), processoArquivado.getDataAlteracao());
        assertNotNull(processoArquivado.getDataCancelamento());
        assertNotEquals(processoCadastrado.getDataCancelamento(), processoArquivado.getDataCancelamento());
        assertEquals(UsuarioTestUtils.DEFAULT_DEV_EMAIL, processoArquivado.getUsuarioCancelamento().getEmail());
    }

    @Test @Order(12)
    @DisplayName("Integration Test - Dado processoId Nao Cadastrado Quando criarProtocoloObservacao Deve Lancar ValidatorException")
    public void testDadoProcessoIdNaoCadastrado_QuandoCriarProtocoloObservacao_DeveLancarValidatorException() {
        var processoObservacaoRequest = new ProcessoObservacaoRequest();
        processoObservacaoRequest.setIdProcesso(processoIdNaoCadastrado);

        var actual = assertThrows(
                ValidatorException.class,
                () -> processoService.criarProtocoloObservacao(processoObservacaoRequest));

        assertNotNull(actual);
        assertInstanceOf(ValidatorException.class, actual);
        assertEquals("Processo " + processoIdNaoCadastrado + NOT_FOUND, actual.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, actual.getStatus());
    }

    @Test @Order(13)
    @DisplayName("Integration Test - Dado ProcessoObservacaoRequest Quando criarProtocoloObservacao Deve Retornar ProcessoResponse")
    public void testDadoProcessoObservacaoRequest_QuandoCriarProtocoloObservacao_DeveRetornarProcessoResponse() {
        var processoObservacaoRequest = new ProcessoObservacaoRequest();
        processoObservacaoRequest.setIdProcesso(processoCadastrado.getId());
        processoObservacaoRequest.setTitulo(processoArquivarRequest.getTitulo());
        processoObservacaoRequest.setDescricao(processoArquivarRequest.getDescricao());

        var actual = processoService.criarProtocoloObservacao(processoObservacaoRequest);

        assertNotNull(actual);
        assertInstanceOf(ProcessoResponse.class, actual);
        assertEquals(processoCadastrado.getId(), actual.id());
        assertEquals(processoCadastrado.getProtocolo(), actual.protocolo());
    }

    @Test @Order(14)
    @DisplayName("Integration Test - Dado Processos Cadastrados Quando buscarTotalizador Deve Retornar TotalizadorProcessoResponse")
    public void testDadoProcessosCadastrados_QuandoBuscarTotalizadorDeveRetornarTotalizadorProcessoResponse() {
        var actual = processoService.buscarTotalizador(httpServletRequest);

        assertNotNull(actual);
        assertInstanceOf(TotalizadorProcessoResponse.class, actual);
        assertTrue(actual.getTotal() >= 1);
    }

    @Test @Order(15)
    @DisplayName("Integration Test - Dado Processos Recem Cadastrados Quando buscarUltimosProcessosCadastrados Deve Retornar Lista UltimoProcessoResponse")
    public void testDadoProcessosRecemCadastrados_QuandoBuscarUltimosProcessosCadastrados_DeveRetornarListaUltimoProcessoResponse() {
        var actual = processoService.buscarUltimosProcessosCadastrados(0, 10, httpServletRequest);

        assertNotNull(actual);
        assertFalse(actual.isEmpty());
        assertInstanceOf(UltimoProcessoResponse.class, actual.get(0));

        var actualProcesso = actual.stream().filter(
                ultimoProcessoResponse -> ultimoProcessoResponse.getId().equals(processoCadastrado.getId())).findFirst();

        assertTrue(actualProcesso.isPresent());
        assertEquals(processoCadastrado.getProtocolo(), actualProcesso.get().getProtocolo());
    }

    @Test @Order(16)
    @DisplayName("Integration Test - Dado Processos Recem Alterados Quando buscarUltimosProcessosAlterados Deve Retornar Lista UltimoProcessoResponse")
    public void testDadoProcessosRecemAlterados_QuandoBuscarUltimosProcessosAlterados_DeveRetornarListaUltimoProcessoResponse() {
        var actual = processoService.buscarUltimosProcessosAlterados(0, 10, httpServletRequest);

        assertNotNull(actual);
        assertFalse(actual.isEmpty());
        assertInstanceOf(UltimoProcessoResponse.class, actual.get(0));

        var actualProcesso = actual.stream().filter(
                processoAlterado -> processoAlterado.getId().equals(processoCadastrado.getId())).findFirst();

        assertTrue(actualProcesso.isPresent());
        assertEquals(processoCadastrado.getProtocolo(), actualProcesso.get().getProtocolo());
    }

    @Test @Order(17)
    @DisplayName("Integration Test - Dado Filtros Quando montaFiltroRelatorio Deve Retornar Mapa FiltroRelatorioRequest")
    public void testDadoFiltros_QuandoMontaFiltroRelatorio_DeveRetornarMapaFiltroRelatorioRequest() {
        var actual = processoService.montaFiltroRelatorio();

        assertNotNull(actual);
        assertFalse(actual.isEmpty());

        for (FiltroRelatorioRequest filtro: FiltroRelatorioRequest.values())
            assertNotNull(actual.get(filtro));
    }

    @Test @Order(18)
    @DisplayName("Integration Test - Dado processoId Quando relatorioModelAndView Deve Retornar ModelAndView")
    public void testDadoProcessoId_QuandoRelatorioModelAndView_DeveRetornarModelAndView() {
        var actual = processoService.relatorioModelAndView(
                processoCadastrado.getId().toString(), UsuarioTestUtils.GRUPO_ID.toString(), new ArrayList<>(), "");

        assertNotNull(actual);
        assertInstanceOf(ModelAndView.class, actual);
        assertEquals("relatorio/main", actual.getViewName());
        assertNotNull(actual.getModel().get("relatorios"));
    }

    @Test @Order(19)
    @DisplayName("Integration Test - Dado RelatorioRequest Quando relatorioImprimir Deve Retornar ByteArrayResource")
    public void test() {
        var relatorioRequest = new RelatorioRequest();
        relatorioRequest.setIdProcesso(processoCadastrado.getId().toString());
        relatorioRequest.setFiltros( List.of(FiltroRelatorioRequest.NOVO_IMOVEL, FiltroRelatorioRequest.EM_ANDAMENTO) );

        var actual = processoService.relatorioImprimir(relatorioRequest, httpServletRequest);

        assertNotNull(actual);
        assertInstanceOf(ByteArrayResource.class, actual);
    }
}