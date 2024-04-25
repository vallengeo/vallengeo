package com.vallengeo.portal.repository;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.portal.model.Usuario;
import com.vallengeo.utils.UsuarioTestUtils;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Usuario Repository Tests")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(webEnvironment = WebEnvironment.DEFINED_PORT)
public class UsuarioRepositoryTest extends AbstractIntegrationTest {

    @Autowired
    private UsuarioRepository usuarioRepository;

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    private static Usuario usuario;

    @BeforeAll
    public static void setup() {
        usuario = Usuario.builder()
                .email("joao@test.com")
                .senhaHash(encoder.encode(UsuarioTestUtils.DEFAULT_PASSWORD))
                .ativo(true)
                .dataCadastro(LocalDateTime.now())
                .codigoAcesso("XYZ123")
                .validadeCodigo(LocalDateTime.now().plusMinutes(10))
                .build();
    }

    @Test @Order(1)
    @DisplayName("Integration Test - Dado Usuario Quando save() Deve Retornar Usuario")
    public void testDadoUsuario_QuandoSave_DeveRetornarUsuario() {
        Usuario actual = usuarioRepository.save(usuario);

        assertNotNull(actual);
        assertNotNull(actual.getId());
        assertTrue(actual.getAtivo());
        assertEquals(usuario.getEmail(), actual.getEmail());
        assertTrue(encoder.matches(UsuarioTestUtils.DEFAULT_PASSWORD, actual.getPassword()));
    }

    @Test @Order(2)
    @DisplayName("Integration Test - Quando findAll() Deve Retornar Lista de Usuarios")
    public void testQuandoFindAll_DeveRetornarListaDeUsuarios() {
        List<Usuario> actual = usuarioRepository.findAll();

        assertNotNull(actual);
        assertEquals(4, actual.size());
        assertInstanceOf(Usuario.class, actual.get(0));
    }

    @Test @Order(3)
    @DisplayName("Integration Test - Dado Email Quando findByEmailAndAtivoIsTrue() Deve Retornar UserDetails")
    public void testDadoEmail_QuandoFindByEmailAndAtivoIsTrue_DeveRetornarUserDetails() {
        UserDetails actual = usuarioRepository.findByEmailAndAtivoIsTrue(usuario.getEmail());

        assertNotNull(actual);
        assertInstanceOf(UserDetails.class, actual);
        assertTrue(actual.isEnabled());
        assertEquals(usuario.getEmail(), actual.getUsername());
        assertTrue(encoder.matches(UsuarioTestUtils.DEFAULT_PASSWORD, actual.getPassword()));
    }

    @Test @Order(4)
    @DisplayName("Integration Test - Dado Email Nao Cadastrado Quando findByEmailAndAtivoIsTrue() Deve Retornar Null")
    public void testDadoEmailNaoCadastrado_QuandoFindByEmailAndAtivoIsTrue_DeveRetornarNull() {
        UserDetails actual = usuarioRepository.findByEmailAndAtivoIsTrue("andre@email.com");
        assertNull(actual);
    }

    @Test @Order(5)
    @DisplayName("Integration Test - Dado Email Quando findByEmail() Deve Retornar Optional<Usuario>")
    public void testDadoEmail_QuandoFindByEmail_DeveRetornarOptionalUsuario() {
        Optional<Usuario> actual = usuarioRepository.findByEmail(usuario.getEmail());

        assertNotNull(actual);
        assertTrue(actual.isPresent());
        assertInstanceOf(Usuario.class, actual.get());
        assertEquals(usuario.getId(), actual.get().getId());
        assertEquals(usuario.getEmail(), actual.get().getUsername());
        assertTrue(encoder.matches(UsuarioTestUtils.DEFAULT_PASSWORD, actual.get().getPassword()));
    }

    @Test @Order(6)
    @DisplayName("Integration Test - Dado Email Nao Cadastrado Quando findByEmail() Deve Retornar Optional Empty")
    public void testDadoEmailNaoCadastrado_QuandoFindByEmail_DeveRetornarOptionalEmpty() {
        Optional<Usuario> actual = usuarioRepository.findByEmail("andre@email.com");

        assertNotNull(actual);
        assertTrue(actual.isEmpty());
    }

    @Test @Order(7)
    @DisplayName("Integration Test - Dado CodigoAcesso Quando findByCodigoAcesso() Deve Retornar Optional<Usuario>")
    public void testDadoCodigoAcesso_QuandoFindByCodigoAcesso_DeveRetornarOptionalUsuario() {
        Optional<Usuario> actual = usuarioRepository.findByCodigoAcesso(usuario.getCodigoAcesso());

        assertNotNull(actual);
        assertTrue(actual.isPresent());
        assertInstanceOf(Usuario.class, actual.get());
        assertEquals(usuario.getId(), actual.get().getId());
        assertEquals(usuario.getEmail(), actual.get().getUsername());
        assertEquals(usuario.getCodigoAcesso(), actual.get().getCodigoAcesso());
        assertTrue(encoder.matches(UsuarioTestUtils.DEFAULT_PASSWORD, actual.get().getPassword()));
    }

    @Test @Order(8)
    @DisplayName("Integration Test - Given CodigoAcesso Nao Cadastrado Quando findByCodigoAcesso() Deve Retornar Optional Empty")
    public void testDadoCodigoAcessoNaoCadastrado_QuandoFindByCodigoAcesso_DeveRetornarOptionalEmpty() {
        Optional<Usuario> actual = usuarioRepository.findByCodigoAcesso("ABC321");

        assertNotNull(actual);
        assertTrue(actual.isEmpty());
    }

    @Test @Order(9)
    @DisplayName("Integration Test - Dado Usuario Quando delete() Deve Retornar Void")
    public void testDadoUsuario_QuandoDelete_DeveRetornarVoid() {
        var usuarioId = usuario.getId();
        assertTrue(usuarioRepository.findById(usuarioId).isPresent());

        usuarioRepository.delete(usuario);
        Optional<Usuario> actual = usuarioRepository.findById(usuarioId);

        assertNotNull(actual);
        assertTrue(actual.isEmpty());
    }
}