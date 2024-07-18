package com.vallengeo.cidadao.service;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.cidadao.model.Representante;
import com.vallengeo.cidadao.payload.request.imovel.RepresentanteRequest;
import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.utils.RepresentanteTestUtils;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Representante Service Tests")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class RepresentanteServiceTest extends AbstractIntegrationTest {

    @Autowired
    private RepresentanteService representanteService;

    private static UUID representanteId;
    private static RepresentanteRequest.PessoaFisicaRequest representanteFisicoRequest;
    private static RepresentanteRequest.PessoaJuridicaRequest representanteJuridicoRequest;

    @BeforeAll
    public static void setup() {
        // Representante Pessoa Fisica
        representanteFisicoRequest = RepresentanteTestUtils.getRepresentantePessoaFisicaRequest();

        // Representante Pessoa Juridica
        representanteJuridicoRequest = RepresentanteTestUtils.getRepresentantePessoaJuridicaRequest();
    }

    @Test @Order(1)
    @DisplayName("Integration Test - Dado Contato Nulo Quando cadastrar() Deve Lancar ValidatorException")
    void testDadoContatoNulo_QuandoCadastrar_DeveLancarValidatorException() {
        var request = new RepresentanteRequest();

        var actual = assertThrows(
                ValidatorException.class,
                () -> representanteService.cadastrar(request));

        assertEquals(HttpStatus.NOT_ACCEPTABLE, actual.getStatus());
        assertEquals("Não foi possível encontrar informações de contato do representante", actual.getMessage());
    }

    @Test @Order(2)
    @DisplayName("Integration Test - Dado Atribuicoes Invalidas Quando cadastrar() Deve Lancar ValidatorException")
    void testDadoAtribuicoesInvalidas_QuandoCadastrar_DeveLancarValidatorException() {
        var contato = RepresentanteTestUtils.getContato();
        contato.setResponsavelTecnico(true);
        contato.setRepresentanteLegal(true);
        contato.setOutro(true);

        var request = new RepresentanteRequest();
        request.setContato(contato);

        var actual = assertThrows(ValidatorException.class, () -> representanteService.cadastrar(request));

        assertEquals(HttpStatus.NOT_ACCEPTABLE, actual.getStatus());
        assertEquals("O tipo informações de contato do representante é obrigatório.", actual.getMessage());
    }

    @Test @Order(3)
    @DisplayName("Integration Test - Dado RepresentanteRequest Quando cadastrar() Deve Retornar Representante")
    void testDadoRepresentanteRequest_QuandoCadastrar_DeveRetornarRepresentante() {
        var actual = representanteService.cadastrar(representanteFisicoRequest);

        assertNotNull(actual);
        assertInstanceOf(Representante.class, actual);
        assertEquals(representanteFisicoRequest.getContato().getNome(), actual.getContatoNome());
        assertEquals(representanteFisicoRequest.getContato().getEmail(), actual.getContatoEmail());
        assertEquals(representanteFisicoRequest.getContato().getTelefone(), actual.getContatoTelefone());
        assertEquals(representanteFisicoRequest.getContato().getDocumento(), actual.getContatoDocumento());
        assertTrue(actual.getResponsavelTecnico());
        assertFalse(actual.getRepresentanteLegal());
        assertFalse(actual.getOutro());

        representanteId = actual.getId();
    }

    @Test @Order(4)
    @DisplayName("Integration Test - Dado Representante Ja Cadastrado Quando cadastrar() Deve Retornar Representante")
    void testDadoRepresentanteJaCadastrado_QuandoCadastrar_DeveRetornarRepresentante() {
        var actual = representanteService.cadastrar(representanteFisicoRequest);

        assertNotNull(actual);
        assertInstanceOf(Representante.class, actual);
        assertEquals(representanteId, actual.getId());
        assertEquals(representanteFisicoRequest.getContato().getNome(), actual.getContatoNome());
        assertEquals(representanteFisicoRequest.getContato().getEmail(), actual.getContatoEmail());
        assertEquals(representanteFisicoRequest.getContato().getTelefone(), actual.getContatoTelefone());
        assertEquals(representanteFisicoRequest.getContato().getDocumento(), actual.getContatoDocumento());
        assertTrue(actual.getResponsavelTecnico());
        assertFalse(actual.getRepresentanteLegal());
        assertFalse(actual.getOutro());
    }

    @Test @Order(5)
    @DisplayName("Integration Test - Dado Lista RepresentanteRequest Quando cadastrar() Deve Retornar Lista Representante")
    void testDadoListaRepresentanteRequest_QuandoCadastrar_DeveRetornarListaRepresentante() {
        var actual = representanteService.cadastrar(
                List.of(representanteFisicoRequest, representanteJuridicoRequest));

        assertNotNull(actual);
        assertEquals(2, actual.size());
        assertInstanceOf(Representante.class, actual.get(0));
    }
}