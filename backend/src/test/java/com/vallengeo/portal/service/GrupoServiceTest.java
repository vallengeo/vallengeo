package com.vallengeo.portal.service;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.portal.payload.response.GrupoResponse;
import com.vallengeo.portal.payload.response.ModuloResponse;
import com.vallengeo.portal.repository.GrupoRepository;
import com.vallengeo.portal.repository.UsuarioRepository;
import com.vallengeo.utils.AuthTestUtils;
import com.vallengeo.utils.JwtTestUtils;
import com.vallengeo.utils.UsuarioTestUtils;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.authentication.AuthenticationManager;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.doReturn;

@DisplayName("GrupoService Tests")
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class GrupoServiceTest extends AbstractIntegrationTest {

    @Autowired
    private GrupoService grupoService;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private AuthenticationManager authManager;

    @SpyBean
    private GrupoRepository grupoRepository;
    private MockHttpServletRequest httpServletRequest;

    @BeforeAll
    public void setup() {
        AuthTestUtils.setAuthentication(authManager, UsuarioTestUtils.DEFAULT_DEV_EMAIL, UsuarioTestUtils.DEFAULT_DEV_PASSWORD);

        var userDetails = usuarioRepository.findByEmail(UsuarioTestUtils.DEFAULT_DEV_EMAIL).orElse(null);
        var token = JwtTestUtils.buildJwtToken(
                userDetails, UsuarioTestUtils.GRUPO_ID.toString(), secretKey, expiration, algorithm);

        httpServletRequest = new MockHttpServletRequest();
        httpServletRequest.addHeader(HttpHeaders.AUTHORIZATION, token);
    }

    @Test
    @DisplayName("Integration Test - Dado Grupos Cadastrados Quando buscarTodos Deve Retornar Lista GrupoResponse")
    public void testDadoGruposCadastrados_QuandoBuscarTodos_DeveRetornarListaGrupoResponse() {
        var actual = grupoService.buscarTodos();

        assertNotNull(actual);
        assertFalse(actual.isEmpty());
        assertInstanceOf(GrupoResponse.class, actual.get(0));

        var actualGrupo = actual.stream().filter(
                grupoResponse -> grupoResponse.id().equals(UsuarioTestUtils.GRUPO_ID)).findFirst();

        assertNotNull(actualGrupo);
        assertTrue(actualGrupo.isPresent());
        assertEquals(UsuarioTestUtils.GRUPO_ID, actualGrupo.get().id());
    }

    @Test
    @DisplayName("Integration Test - Dado grupoId Nao Cadastrado Quando buscarModulos Deve Lancar ValidatorException")
    public void testDadoGrupoIdNaoCadastrado_QuandoBuscarModulos_DeveLancarValidatorException() {
        doReturn(Optional.empty()).when(grupoRepository).findById(UsuarioTestUtils.GRUPO_ID);

        var actual = assertThrows(
                ValidatorException.class,
                () -> grupoService.buscarModulos(httpServletRequest));

        assertNotNull(actual);
        assertEquals(HttpStatus.NOT_FOUND, actual.getStatus());
        assertEquals("Não foi possível encontrar o grupo.", actual.getMessage());
    }

    @Test
    @DisplayName("Integration Test - Dado grupoId Quando buscarModulos Deve Retornar Lista ModuloResponse")
    public void testDadoGrupoId_QuandoBuscarModulos_DeveRetornarListaModuloResponse() {
        var actual = grupoService.buscarModulos(httpServletRequest);

        assertNotNull(actual);
        assertFalse(actual.isEmpty());
        assertInstanceOf(ModuloResponse.class, actual.get(0));
    }
}