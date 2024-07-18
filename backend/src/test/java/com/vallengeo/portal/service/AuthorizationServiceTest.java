package com.vallengeo.portal.service;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.core.exceptions.custom.ForbiddenException;
import com.vallengeo.portal.repository.PerfilRepository;
import com.vallengeo.portal.repository.UsuarioRepository;
import com.vallengeo.utils.AuthTestUtils;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Authorization Service Test")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class AuthorizationServiceTest extends AbstractIntegrationTest {

    @Autowired
    private AuthorizationService authorizationService;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private PerfilRepository perfilRepository;
    @Autowired
    private AuthenticationManager authManager;

    @BeforeAll
    public static void setup() {
        AuthTestUtils.cleanAuthentication();
    }

    @Test @Order(1)
    @DisplayName("Integration Test - Dado Email Nao Cadastrado Quando loadUserByUsername() Deve Lancar UsernameNotFoundException")
    void testDadoEmailNaoCadastrado_QuandoLoadUserByUsername_DeveLancarUsernameNotFoundException() {
        var actual = assertThrows(
                UsernameNotFoundException.class,
                () -> authorizationService.loadUserByUsername("nao.cadastrado@gmail.com"));

        assertEquals("Usuário e/ou senha inválidos.", actual.getMessage());
    }

    @Test @Order(2)
    @DisplayName("Integration Test - Dado Email Quando loadUserByUsername() Deve Retornar UserDetails")
    void testDadoEmail_QuandoLoadUserByUsername_DeveRetornarUserDetails() {
        var email = "vallengeo.dev@gmail.com";
        var actual = authorizationService.loadUserByUsername(email);

        assertInstanceOf(UserDetails.class, actual);
        assertEquals(email, actual.getUsername());
    }

    @Test @Order(3)
    @DisplayName("Integration Test - Dado Usuario Nao Autenticado Quando hasPerfil() Deve Retornar False")
    void testDadoUsuarioNaoAutenticado_QuandoHasPerfil_DeveRetornarFalse() {
        assertFalse(authorizationService.hasPerfil("ADMINISTRADOR"));
    }

    @Test @Order(4)
    @DisplayName("Integration Test - Dado Usuario Sem Perfil Quando hasPerfil() Deve Retornar False")
    void testDadoUsuarioSemPerfil_QuandoHasPerfil_DeveRetornarFalse() {
        AuthTestUtils.setAuthentication(authManager, "vallengeo.semperfil@gmail.com", "123456");
        assertFalse(authorizationService.hasPerfil("ADMINISTRADOR"));
    }

    @Test @Order(5)
    @DisplayName("Integration Test - Dado Perfil Nao Atribuido Quando hasPerfil() Deve Lancar ForbiddenException")
    void testDadoPerfilNaoAtribuido_QuandoHasPerfil_DeveLancarForbiddenException() {
        AuthTestUtils.setAuthentication(authManager, "vallengeo.cidadao@gmail.com", "123456");
        assertThrows(ForbiddenException.class, () -> authorizationService.hasPerfil("ADMINISTRADOR"));
    }

    @Test @Order(6)
    @DisplayName("Integration Test - Dado Perfil Quando hasPerfil() Deve Retornar True")
    void testDadoPerfil_QuandoHasPerfil_DeveRetornarTrue() {
        AuthTestUtils.setAuthentication(authManager, "vallengeo.dev@gmail.com", "123456");
        assertTrue(authorizationService.hasPerfil("ADMINISTRADOR"));
    }
}