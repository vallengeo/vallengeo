package com.vallengeo.global.service;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.global.model.Endereco;
import com.vallengeo.global.payload.request.EnderecoRequest;
import com.vallengeo.global.repository.EnderecoRepository;
import com.vallengeo.global.repository.MunicipioRepository;
import com.vallengeo.global.service.mapper.EnderecoMapper;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Endereco Service Tests")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class EnderecoServiceTest extends AbstractIntegrationTest {

    @Autowired
    private EnderecoService enderecoService;
    @Autowired
    private EnderecoRepository repository;
    @Autowired
    private MunicipioRepository municipioRepository;

    private static Long enderecoId;
    private static EnderecoRequest enderecoRequest;

    @BeforeAll
    public static void setup() {
        enderecoRequest = new EnderecoRequest(
                "12070370",
               "Rua Coronel Bento Monteiro",
               "Vila São José",
               "115",
               "Próximo ao Hospital XYZ",
                3554102 //Id Referente ao Munícipio de Taubaté
        );
    }

    @Test @Order(1)
    @DisplayName("Integration Test - Dado Municipio Nao Cadastrado Quando salvar() Deve Lancar ValidatorException")
    void testDadoMunicipioNaoCadastrado_QuandoSalvar_DeveLancarValidatorException() {
        var request = new EnderecoRequest(
                "12070370",
                "Rua Coronel Bento Monteiro",
                "Vila São José",
                "115",
                null,
                101010
        );

        var actual = assertThrows(
                ValidatorException.class,
                () -> enderecoService.salvar(request));

        assertEquals(HttpStatus.NOT_FOUND, actual.getStatus());
        assertEquals(
                String.format("Município Id %s não encontrado!", request.idMunicipio()), actual.getMessage());
    }

    @Test @Order(2)
    @DisplayName("Integration Test - Dado EnderecoRequest Quando salvar() Deve Retornar Endereco")
    void testDadoEnderecoRequest_QuandoSalvar_DeveRetornarEndereco() {
        var actual = enderecoService.salvar(enderecoRequest);
        enderecoId = actual.getId();

        assertInstanceOf(Endereco.class, actual);
        assertNotNull(actual.getId());
        assertEquals(enderecoRequest.cep(), actual.getCep());
        assertEquals(enderecoRequest.logradouro(), actual.getLogradouro());
        assertEquals(enderecoRequest.bairro(), actual.getBairro());
        assertEquals(enderecoRequest.numero(), actual.getNumero());
        assertEquals(enderecoRequest.complemento(), actual.getComplemento());
        assertEquals(enderecoRequest.idMunicipio(), actual.getMunicipio().getId());
    }

    @Test @Order(3)
    @DisplayName("Integration Test - Dado Endereco Existente Quando salvar() Deve Retornar Endereco")
    void testDadoEnderecoExistente_QuandoSalvar_DeveRetornarEndereco() {
        var actual = enderecoService.salvar(enderecoRequest);

        assertInstanceOf(Endereco.class, actual);
        assertEquals(enderecoId, actual.getId());
        assertEquals(enderecoRequest.cep(), actual.getCep());
        assertEquals(enderecoRequest.logradouro(), actual.getLogradouro());
        assertEquals(enderecoRequest.bairro(), actual.getBairro());
        assertEquals(enderecoRequest.numero(), actual.getNumero());
        assertEquals(enderecoRequest.complemento(), actual.getComplemento());
        assertEquals(enderecoRequest.idMunicipio(), actual.getMunicipio().getId());
    }

    @Test @Order(4)
    @DisplayName("Integration Test - Dado Atributos Invalidos Quando buscaEnderecoPorDadosCompletos() Deve Lancar ValidatorException")
    void testDadoAtributosInvalidos_QuandoBuscaEnderecoPorDadosCompletos_DeveLancarValidatorException() {
        var endereco = new Endereco();
        endereco.setCep("14810446");
        endereco.setLogradouro("Avenida XYZ");
        endereco.setNumero("335");
        endereco.setBairro("ABC");

        var actual = assertThrows(
                ValidatorException.class,
                () -> enderecoService.buscaEnderecoPorDadosCompletos(endereco));

        assertEquals(HttpStatus.NOT_FOUND, actual.getStatus());
        assertEquals("Endereço informado  não encontrado!", actual.getMessage());
    }

    @Test @Order(5)
    @DisplayName("Integration Test - Dado Atributos Quando buscaEnderecoPorDadosCompletos() Deve Retornar Endereco")
    void testDadoAtributos_QuandoBuscaEnderecoPorDadosCompletos_DeveRetornarEndereco() {
        var actual = enderecoService.buscaEnderecoPorDadosCompletos(
                EnderecoMapper.INSTANCE.toEntity(enderecoRequest));

        assertInstanceOf(Endereco.class, actual);
        assertEquals(enderecoRequest.cep(), actual.getCep());
        assertEquals(enderecoRequest.logradouro(), actual.getLogradouro());
        assertEquals(enderecoRequest.bairro(), actual.getBairro());
        assertEquals(enderecoRequest.numero(), actual.getNumero());
        assertEquals(enderecoRequest.complemento(), actual.getComplemento());
        assertEquals(enderecoRequest.idMunicipio(), actual.getMunicipio().getId());
    }
}