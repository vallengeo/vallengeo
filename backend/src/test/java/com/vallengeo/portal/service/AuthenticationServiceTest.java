package com.vallengeo.portal.service;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.core.exceptions.custom.UnauthorizedException;
import com.vallengeo.core.util.Constants;
import com.vallengeo.portal.payload.request.autenticacao.LoginRequest;
import com.vallengeo.utils.UsuarioTestUtils;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Authentication Service Tests")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class AuthenticationServiceTest extends AbstractIntegrationTest {

    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private BCryptPasswordEncoder encoder;

    @Test
    @DisplayName("Integration Test - Dado Email Nao Cadastrado Quando authenticate() Deve Lancar BadCredentialsException")
    void testDadoEmailNaoCadastrado_QuandoAuthenticate_DeveLancarInternalAuthenticationServiceException() {
        var loginRequest = new LoginRequest("nao.cadastrado@gmail.com", "123456", null);

         var actual = assertThrows(
                InternalAuthenticationServiceException.class,
                () -> authenticationService.authenticate(loginRequest));

         assertEquals("Usuário: " + loginRequest.email() + Constants.NOT_FOUND, actual.getMessage());
    }

    @Test
    @DisplayName("Integration Test - Dado Senha Incorreta Quando authenticate() Deve Lancar BadCredentialsException")
    void testDadoSenhaIncorreta_QuandoAuthenticate_DeveLancarBadCredentialsException() {
        var loginRequest = new LoginRequest(
                UsuarioTestUtils.DEFAULT_DEV_EMAIL, "senhaIncorreta@123", UsuarioTestUtils.MUNICIPIO_ID);

        assertThrows(
                BadCredentialsException.class,
                () -> authenticationService.authenticate(loginRequest));
    }


    @Test
    @DisplayName("Integration Test - Dado Grupo Invalido Quando authenticate() Deve Lancar UnauthorizedException")
    void testDadoGrupoInvalido_QuandoAuthenticate_DeveLancarUnauthorizedException() {
        var loginRequest = new LoginRequest(
                UsuarioTestUtils.DEFAULT_DEV_EMAIL, UsuarioTestUtils.DEFAULT_DEV_PASSWORD, null);

        var actual = assertThrows(
                UnauthorizedException.class,
                () -> authenticationService.authenticate(loginRequest));

        assertEquals("Usuário não vinculado a prefeitura informada!", actual.getMessage());
    }

    @Test
    @DisplayName("Integration Test - Dado LoginRequest Quando authenticate() Deve Retornar UserDetails")
    void testDadoLoginRequest_QuandoAuthenticate_DeveRetornarUserDetails() {
        var loginRequest = new LoginRequest(
                UsuarioTestUtils.DEFAULT_DEV_EMAIL, UsuarioTestUtils.DEFAULT_DEV_PASSWORD, UsuarioTestUtils.MUNICIPIO_ID);

        var actual = authenticationService.authenticate(loginRequest);

        assertInstanceOf(UserDetails.class, actual);
        assertEquals(loginRequest.email(), actual.getUsername());
        assertTrue(encoder.matches(loginRequest.senha(), actual.getPassword()));
    }
}