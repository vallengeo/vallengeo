package com.vallengeo.cidadao.service;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.cidadao.model.Processo;
import com.vallengeo.cidadao.payload.response.TipoDocumentoResponse;
import com.vallengeo.cidadao.repository.DocumentoRepository;
import com.vallengeo.cidadao.repository.TipoDocumentoRepository;
import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.portal.repository.UsuarioRepository;
import com.vallengeo.utils.AuthTestUtils;
import com.vallengeo.utils.DocumentoTestUtils;
import com.vallengeo.utils.JwtTestUtils;
import com.vallengeo.utils.UsuarioTestUtils;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.authentication.AuthenticationManager;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("TipoDocumento Service Tests")
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class TipoDocumentoServiceTest extends AbstractIntegrationTest {

    @Autowired
    private TipoDocumentoService tipoDocumentoService;
    @Autowired
    private AuthenticationManager authManager;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private ProcessoService processoService;
    @Autowired
    private DocumentoRepository documentoRepository;
    @Autowired
    private TipoDocumentoRepository tipoDocumentoRepository;

    @Value("${api.security.token.secret}")
    private String secretKey;
    @Value("${api.security.token.expiration}")
    private Long expiration;
    @Value("${api.security.token.algorithm}")
    private String algorithm;

    private static MockHttpServletRequest httpServletRequest;
    private static Processo processo;

    @BeforeAll
    public void setup() {
        var userDetails = usuarioRepository.findByEmailAndAtivoIsTrue("vallengeo.dev@gmail.com").orElse(null);
        var token = JwtTestUtils.buildJwtToken(
                userDetails, UsuarioTestUtils.GRUPO_ID.toString(), secretKey, expiration, algorithm);

        AuthTestUtils.setAuthentication(authManager, "vallengeo.dev@gmail.com", "123456");

        httpServletRequest = new MockHttpServletRequest();
        httpServletRequest.addHeader("Authorization", "Bearer " + token);

        processo = processoService.cadastrar(UsuarioTestUtils.GRUPO_ID.toString());
        var tipoDocumento = tipoDocumentoRepository.findAll().stream().findFirst().orElse(null);

        documentoRepository.save(DocumentoTestUtils.getDocumento(processo, tipoDocumento));
    }

    @Test
    @DisplayName("Integration Test - Dado Grupo do Usuario Quando buscarTipoDocumento() Deve Retornar TipoDocumentoResponse List")
    void testDadoGrupoUsuario_QuandoBuscarTipoDocumento_DeveRetornarTipoDocumentoResponseList() {
        var actual = tipoDocumentoService.buscarTipoDocumento(httpServletRequest);

        assertNotNull(actual);
        assertInstanceOf(TipoDocumentoResponse.class, actual.get(0));
    }

    @Test
    @DisplayName("Integration Test - Dado Processo Nao Cadastrado Quando buscarTipoDocumentoEnviadoPeloProcesso() Deve Lancar ValidatorException")
    void testDadoProcessoNaoCadastrado_QuandoBuscarTipoDocumentoEnviadoPeloProcesso_DeveLancarValidatorException() {
        var processoId = UUID.randomUUID();

        var actual = assertThrows(
                ValidatorException.class,
                () -> tipoDocumentoService.buscarTipoDocumentoEnviadoPeloProcesso(processoId));

        assertEquals(HttpStatus.NOT_FOUND, actual.getStatus());
        assertEquals("Processo "+ processoId + " não encontrado!", actual.getMessage());
    }

    @Test
    @DisplayName("Integration Test - Dado Processo Quando buscarTipoDocumentoEnviadoPeloProcesso() Deve Retornar TipoDocumentoResponse List")
    void testDadoProcesso_QuandoBuscarTipoDocumentoEnviadoPeloProcesso_DeveRetornarTipoDocumentoResponseList() {
        var actual = tipoDocumentoService.buscarTipoDocumentoEnviadoPeloProcesso(processo.getId());

        assertNotNull(actual);
        assertEquals(1, actual.size());
        assertInstanceOf(TipoDocumentoResponse.class, actual.get(0));
    }

    @Test
    @DisplayName("Integration Test - Dado Processo Nao Cadastrado Quando buscarTipoDocumentoNaoEnviadoPeloProcesso() Deve Lancar ValidatorException")
    void testDadoProcessoNaoCadastrado_QuandoBuscarTipoDocumentoNaoEnviadoPeloProcesso_DeveLancarValidatorException() {
        var processoId = UUID.randomUUID();
        var actual = assertThrows(
                ValidatorException.class,
                () -> tipoDocumentoService.buscarTipoDocumentoNaoEnviadoPeloProcesso(processoId));

        assertEquals(HttpStatus.NOT_FOUND, actual.getStatus());
        assertEquals("Processo "+ processoId + " não encontrado!", actual.getMessage());
    }

    @Test
    @DisplayName("Integration Test - Dado Processo Quando buscarTipoDocumentoNaoEnviadoPeloProcesso() Deve Retornar TipoDocumentoResponse List")
    void testDadoProcesso_QuandoBuscarTipoDocumentoNaoEnviadoPeloProcesso_DeveRetornarTipoDocumentoResponseList() {
        var actual = tipoDocumentoService.buscarTipoDocumentoNaoEnviadoPeloProcesso(processo.getId());

        assertNotNull(actual);
        assertInstanceOf(TipoDocumentoResponse.class, actual.get(0));
    }
}