package com.vallengeo.portal.service;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.core.exceptions.custom.UnauthorizedException;
import com.vallengeo.portal.payload.request.autenticacao.LoginRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.UUID;

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

         assertThrows(
                BadCredentialsException.class,
                () -> authenticationService.authenticate(loginRequest));
    }

    @Test
    @DisplayName("Integration Test - Dado Senha Incorreta Quando authenticate() Deve Lancar BadCredentialsException")
    void testDadoSenhaIncorreta_QuandoAuthenticate_DeveLancarBadCredentialsException() {
        var loginRequest = new LoginRequest(
                "vallengeo.dev@gmail.com", "senhaIncorreta@123", null);

        assertThrows(
                BadCredentialsException.class,
                () -> authenticationService.authenticate(loginRequest));
    }


    @Test
    @DisplayName("Integration Test - Dado Grupo Invalido Quando authenticate() Deve Lancar UnauthorizedException")
    void testDadoGrupoInvalido_QuandoAuthenticate_DeveLancarUnauthorizedException() {
        var loginRequest = new LoginRequest(
                "vallengeo.dev@gmail.com", "123456", UUID.randomUUID().toString());

        var actual = assertThrows(
                UnauthorizedException.class,
                () -> authenticationService.authenticate(loginRequest));

        assertEquals("Usuário não vinculado a prefeitura informada!", actual.getMessage());
    }

    @Test
    @DisplayName("Integration Test - Dado LoginRequest Quando authenticate() Deve Retornar UserDetails")
    void testDadoLoginRequest_QuandoAuthenticate_DeveRetornarUserDetails() {
        var loginRequest = new LoginRequest(
                "vallengeo.dev@gmail.com", "123456", "4d3c1497-af40-4ddf-8b06-d8f40c8df139");

        var actual = authenticationService.authenticate(loginRequest);

        assertInstanceOf(UserDetails.class, actual);
        assertEquals(loginRequest.email(), actual.getUsername());
        assertTrue(encoder.matches(loginRequest.senha(), actual.getPassword()));
    }
}