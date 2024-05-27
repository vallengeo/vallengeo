package com.vallengeo.portal.service;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.core.exceptions.InvalidPasswordException;
import com.vallengeo.core.exceptions.custom.UnauthorizedException;
import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.core.util.Constants;
import com.vallengeo.portal.model.Tela;
import com.vallengeo.portal.model.Usuario;
import com.vallengeo.portal.payload.request.usuario.CadastroRequest;
import com.vallengeo.portal.payload.request.usuario.CadastroSimplificadoRequest;
import com.vallengeo.portal.payload.request.usuario.EsqueciMinhaSenhaRequest;
import com.vallengeo.portal.payload.request.usuario.RedefinirSenhaRequest;
import com.vallengeo.portal.payload.response.UsuarioResponse;
import com.vallengeo.portal.repository.TelaRepository;
import com.vallengeo.portal.repository.UsuarioRepository;
import com.vallengeo.utils.UsuarioTestUtils;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Usuario Service Tests")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class UsuarioServiceTest extends AbstractIntegrationTest {

    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private TelaRepository telaRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Value("${usuario.codigoAcesso.validade.minutos}")
    private Long validadeCodigoAcesso;

    private static Usuario usuarioCadastrado;
    private static CadastroRequest cadastroRequest;
    private static CadastroSimplificadoRequest simplificadoRequest;
    private static List<CadastroSimplificadoRequest.Grupo> grupos;
    private static List<CadastroSimplificadoRequest.Perfil> perfis;


    private static final String PREFEITURA = "PREFEITURA";

    @BeforeAll
    public static void setup() {
        perfis = List.of(
                new CadastroSimplificadoRequest.Perfil("aae3d727-2f2c-4539-a2a0-0ce34ecf5529")); // ANALISTA

        grupos = List.of(
                new CadastroSimplificadoRequest.Grupo("4d3c1497-af40-4ddf-8b06-d8f40c8df139")); // CRUZEIRO

        simplificadoRequest = new CadastroSimplificadoRequest(
                "cadastro.simplificado@gmail.com", perfis, grupos, PREFEITURA);

        cadastroRequest = new CadastroRequest(
                "cadastro@gmail.com", perfis, grupos, new ArrayList<>(), PREFEITURA);
    }

    @Test @Order(1)
    @DisplayName("Integration Test - Dado Usuarios Cadastrados Quando buscaTodos() Deve Retornar Lista de UsuarioResponse")
    void testBuscaTodos() {
        var actual = usuarioService.buscaTodos();

        assertEquals(4, actual.size());
        assertInstanceOf(UsuarioResponse.class, actual.get(0));
    }

    @Test @Order(2)
    @DisplayName("Integration Test - Dado CadastroSimplificadoRequest Quando cadastroSimplificado() Deve Cadastrar Usuario")
    void testDadoCadastroSimplificadoRequest_QuandoCadastroSimplificado_DeveCadastrarUsuario() {
        usuarioService.cadastroSimplificado(simplificadoRequest);
        var actual = usuarioRepository.findByEmail(simplificadoRequest.email());

        assertTrue(actual.isPresent());
        assertNotNull(actual.get().getId());
        assertFalse(actual.get().getAtivo());
        assertNotNull(actual.get().getDataCadastro());
        assertEquals(simplificadoRequest.email(), actual.get().getEmail());
        assertEquals(grupos.size(), actual.get().getGrupos().size());
        assertEquals(perfis.size(), actual.get().getPerfis().size());
    }

    @Test @Order(3)
    @DisplayName("Integration Test - Dado Email Ja Cadastrado Quando cadastroSimplificado() Deve Lancar DataIntegrityViolationException")
    void testDadoEmailJaCadastrado_QuandoCadastroSimplificado_DeveLancarDataIntegrityViolationException() {
        assertThrows(
                DataIntegrityViolationException.class,
                () -> usuarioService.cadastroSimplificado(simplificadoRequest));
    }

    @Test @Order(4)
    @DisplayName("Integration Test - Dado CadastroRequest Quando cadastro() Deve Cadastrar Usuario")
    void testDadoCadastroRequest_QuandoCadastro_DeveCadastrarUsuario() {
        var telas = telaRepository.findAll();
        for (Tela tela: telas) {
            cadastroRequest.telas().add(
                    new CadastroRequest.Tela(
                            tela.getId().toString(),
                            UsuarioTestUtils.getTelaPermissoes(tela)
                    )
            );
        }

        usuarioService.cadastro(cadastroRequest);
        var actual = usuarioRepository.findByEmail(cadastroRequest.email());

        assertTrue(actual.isPresent());
        assertNotNull(actual.get().getId());
        assertFalse(actual.get().getAtivo());
        assertNotNull(actual.get().getDataCadastro());
        assertEquals(cadastroRequest.email(), actual.get().getEmail());
        assertEquals(grupos.size(), actual.get().getGrupos().size());
        assertEquals(perfis.size(), actual.get().getPerfis().size());
    }

    @Test @Order(5)
    @DisplayName("Integration Test - Dado Email Ja Cadastrado Quando cadastro() Deve Lancar DataIntegrityViolationException")
    void testDadoEmailJaCadastrado_QuandoCadastro_DeveLancarDataIntegrityViolationException() {
        assertThrows(
                DataIntegrityViolationException.class,
                () -> usuarioService.cadastro(cadastroRequest));
    }

    @Test @Order(6)
    @DisplayName("Integration Test - Dado Email Nao Cadastrado Quando esqueciMinhaSenha() Deve Lancar ValidatorException")
    void testDadoEmailNaoCadastrado_QuandoEsqueciMinhaSenha_DeveLancarValidatorException() {
        var request = new EsqueciMinhaSenhaRequest("naocadastrado@email.com", PREFEITURA);

        var actual = assertThrows(
                ValidatorException.class,
                () -> usuarioService.esqueciMinhaSenha(request));

        assertEquals(HttpStatus.NOT_FOUND, actual.getStatus());
        assertEquals(String.format("Usuário do email %s não encontrado!", request.email()), actual.getMessage());
    }

    @Test @Order(7)
    @DisplayName("Integration Test - Dado EsqueciMinhaSenhaRequest Quando esqueciMinhaSenha() Deve Adicionar Codigo Acesso")
    void testDadoEsqueciMinhaSenhaRequest_QuandoEsqueciMinhaSenha_DeveAdicionarCodigoAcesso() {
        var request = new EsqueciMinhaSenhaRequest(
                "vallengeo.dev@gmail.com", PREFEITURA);

        usuarioService.esqueciMinhaSenha(request);
        var actual = usuarioRepository.findByEmail(request.email());

        assertTrue(actual.isPresent());
        assertNotNull(actual.get().getCodigoAcesso());
        assertNotNull(actual.get().getValidadeCodigo());
        assertEquals(request.email(), actual.get().getEmail());

        usuarioCadastrado = actual.get();
    }

    @Test @Order(8)
    @DisplayName("Integration Test - Dado Senha Invalida Quando redefinirSenha() Deve Lancar InvalidPasswordException")
    void testDadoSenhaInvalida_QuandoRedefinirSenha_DeveLancarInvalidPasswordException() {
        var request = new RedefinirSenhaRequest("senhaInvalida", usuarioCadastrado.getCodigoAcesso());

        var actual = assertThrows(
                InvalidPasswordException.class,
                () -> usuarioService.redefinirSenha(request));

        assertEquals(Constants.INVALID_PASSWORD, actual.getMessage());
    }

    @Test @Order(9)
    @DisplayName("Integration Test - Dado Codigo Acesso Nao Cadastrado Quando redefinirSenha() Deve Lancar ValidatorException")
    void testDadoCodigoAcessoNaoCadastrado_QuandoRedefinirSenha_DeveLancarValidatorException() {
        var request = new RedefinirSenhaRequest(UsuarioTestUtils.DEFAULT_PASSWORD, "ABC123");

        var actual = assertThrows(
                ValidatorException.class,
                () -> usuarioService.redefinirSenha(request));

        assertEquals(HttpStatus.NOT_FOUND, actual.getStatus());
        assertEquals(
                String.format("Usuário com o código de acesso %s não encontrado!", request.codigoAcesso()),
                actual.getMessage()
        );
    }

    @Test @Order(10)
    @DisplayName("Integration Test - Dado Codigo Acesso Expirado Quando redefinirSenha() Deve Lancar UnauthorizedException")
    void testDadoCodigoAcessoExpirado_QuandoRedefinirSenha_DeveLancarUnauthorizedException() {
        usuarioCadastrado.setValidadeCodigo(LocalDateTime.now().minusMinutes(validadeCodigoAcesso));
        usuarioRepository.save(usuarioCadastrado);

        var request = new RedefinirSenhaRequest(UsuarioTestUtils.DEFAULT_PASSWORD, usuarioCadastrado.getCodigoAcesso());

        var actual = assertThrows(
                UnauthorizedException.class,
                () -> usuarioService.redefinirSenha(request));

        assertEquals("Código de acesso expirado.", actual.getMessage());
    }

    @Test @Order(11)
    @DisplayName("Integration Test - Dado RedefinirSenhaRequest Quando redefinirSenha() Deve Alterar Senha")
    void testDadoRedefinirSenhaRequest_QuandoRedefinirSenha_DeveAlterarSenha() {
        usuarioCadastrado.setValidadeCodigo(LocalDateTime.now().plusMinutes(validadeCodigoAcesso));
        usuarioRepository.save(usuarioCadastrado);

        var request = new RedefinirSenhaRequest(UsuarioTestUtils.DEFAULT_PASSWORD, usuarioCadastrado.getCodigoAcesso());
        usuarioService.redefinirSenha(request);

        var actual = usuarioRepository.findByEmail(usuarioCadastrado.getEmail());

        assertTrue(actual.isPresent());
        assertNull(actual.get().getCodigoAcesso());
        assertNull(actual.get().getValidadeCodigo());
        assertNotEquals(usuarioCadastrado.getPassword(), actual.get().getPassword());
        assertTrue(passwordEncoder.matches(request.senha(), actual.get().getPassword()));
    }
}