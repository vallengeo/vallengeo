package com.vallengeo.portal.service;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.core.util.Constants;
import com.vallengeo.portal.enumeration.TipoPessoaEnum;
import com.vallengeo.portal.payload.request.pessoa.PessoaRequest;
import com.vallengeo.portal.payload.response.PessoaResponse;
import com.vallengeo.portal.repository.PessoaRepository;
import com.vallengeo.utils.EnderecoTestUtils;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Pessoa Service Tests")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class PessoaServiceTest extends AbstractIntegrationTest {

    @Autowired
    private PessoaService pessoaService;
    @Autowired
    private PessoaRepository pessoaRepository;

    private static PessoaRequest.PessoaFisicaRequest pessoaFisicaRequest;
    private static PessoaRequest.PessoaJuridicaRequest pessoaJuridicaRequest;

    private static String pessoaFisicaId;

    @BeforeEach
    public void setup() {
        pessoaFisicaRequest = new PessoaRequest.PessoaFisicaRequest();
        pessoaFisicaRequest.setEmail("pessoa.fisica@email.com");
        pessoaFisicaRequest.setTelefone("11 922334466");
        pessoaFisicaRequest.setTipoPessoa(TipoPessoaEnum.FISICA);
        pessoaFisicaRequest.setEndereco(EnderecoTestUtils.getEnderecoRequest());
        pessoaFisicaRequest.setNome("Juliana Oliveira Silva");
        pessoaFisicaRequest.setCpf("35966137447");
        pessoaFisicaRequest.setRg("268456823");

        pessoaJuridicaRequest = new PessoaRequest.PessoaJuridicaRequest();
        pessoaJuridicaRequest.setEmail("pessoa.juridica@email.com");
        pessoaJuridicaRequest.setTelefone("11 922334466");
        pessoaJuridicaRequest.setTipoPessoa(TipoPessoaEnum.JURIDICA);
        pessoaJuridicaRequest.setEndereco(EnderecoTestUtils.getEnderecoRequest());
        pessoaJuridicaRequest.setRazaoSocial("Pessoa Juridica LTDA");
        pessoaJuridicaRequest.setCnpj("47217253000185");
        pessoaJuridicaRequest.setResponsavel(pessoaFisicaRequest);
    }

    @Test @Order(1)
    @DisplayName("Integration Test - Dado PessoaFisicaRequest Quando cadastrar() Deve Retornar PessoaResponse")
    void testDadoPessoaFisicaRequest_QuandoCadastrar_DeveRetornarPessoaResponse() {
        var actual = pessoaService.cadastrar(pessoaFisicaRequest);

        assertInstanceOf(PessoaResponse.class, actual);
        assertNotNull(actual.getId());
        assertEquals(pessoaFisicaRequest.getEmail(), actual.getEmail());
        assertEquals(pessoaFisicaRequest.getTelefone(), actual.getTelefone());
        assertEquals(pessoaFisicaRequest.getTipoPessoa().getNome(), ((PessoaResponse.PessoaFisica) actual).getTipoPessoa());
        assertEquals(pessoaFisicaRequest.getNome(), ((PessoaResponse.PessoaFisica) actual).getNome());
        assertEquals(pessoaFisicaRequest.getCpf(), ((PessoaResponse.PessoaFisica) actual).getCpf());
        assertEquals(pessoaFisicaRequest.getRg(), ((PessoaResponse.PessoaFisica) actual).getRg());

        pessoaFisicaId = actual.getId();
    }

    @Test @Order(2)
    @DisplayName("Integration Test - Dado Pessoa Fisica Ja Cadastrada Quando cadastrar() Deve Lancar ValidatorException")
    void testDadoUsuarioJaCadastrado_QuandoCadastrar_DeveLancarValidatorException() {
        var actual = assertThrows(
                ValidatorException.class,
                () -> pessoaService.cadastrar(pessoaFisicaRequest));

        assertEquals(HttpStatus.CONFLICT, actual.getStatus());
        assertEquals("CPF já cadastrado no sistema.", actual.getMessage());
    }

    @Test @Order(3)
    @DisplayName("Integration Test - Dado PessoaJuridicaRequest Quando cadastrar() Deve Retornar PessoaResponse")
    void testDadoPessoaJuridicaRequest_QuandoCadastrar_DeveRetornarPessoaResponse() {
        var actual = pessoaService.cadastrar(pessoaJuridicaRequest);

        assertInstanceOf(PessoaResponse.class, actual);
        assertNotNull(actual.getId());
        assertEquals(pessoaJuridicaRequest.getEmail(), actual.getEmail());
        assertEquals(pessoaJuridicaRequest.getTelefone(), actual.getTelefone());
        assertEquals(pessoaJuridicaRequest.getResponsavel().getCpf(), ((PessoaResponse.PessoaJuridica) actual).getResponsavel().getCpf());
        assertEquals(pessoaJuridicaRequest.getTipoPessoa().getNome(), ((PessoaResponse.PessoaJuridica) actual).getTipoPessoa());
        assertEquals(pessoaJuridicaRequest.getRazaoSocial(), ((PessoaResponse.PessoaJuridica) actual).getRazaoSocial());
        assertEquals(pessoaJuridicaRequest.getCnpj(), ((PessoaResponse.PessoaJuridica) actual).getCnpj());

        pessoaRepository.deleteById(UUID.fromString(actual.getId()));
    }

    @Test @Order(4)
    @DisplayName("Integration Test - Dado Responsavel Nao Cadastrado Quando cadastrar() Deve Retornar PessoaResponse")
    void testDadoResponsavelNaoCadastrado_QuandoCadastrar_DeveRetornarPessoaResponse() {
        pessoaFisicaRequest.setCpf("79578495633");
        pessoaFisicaRequest.setEmail("responsavel@gmail.com");

        var actual = pessoaService.cadastrar(pessoaJuridicaRequest);

        assertInstanceOf(PessoaResponse.class, actual);
        assertNotNull(actual.getId());
        assertEquals(pessoaJuridicaRequest.getEmail(), actual.getEmail());
        assertEquals(pessoaJuridicaRequest.getTelefone(), actual.getTelefone());
        assertEquals(pessoaJuridicaRequest.getResponsavel().getCpf(), ((PessoaResponse.PessoaJuridica) actual).getResponsavel().getCpf());
        assertEquals(pessoaJuridicaRequest.getTipoPessoa().getNome(), ((PessoaResponse.PessoaJuridica) actual).getTipoPessoa());
        assertEquals(pessoaJuridicaRequest.getRazaoSocial(), ((PessoaResponse.PessoaJuridica) actual).getRazaoSocial());
        assertEquals(pessoaJuridicaRequest.getCnpj(), ((PessoaResponse.PessoaJuridica) actual).getCnpj());
    }

    @Test @Order(5)
    @DisplayName("Integration Test - Dado Pessoa Juridica Ja Cadastrada Quando cadastrar() Deve Lancar ValidatorException")
    void testDadoPessoaJuridicaJaCadastrada_QuandoCadastrar_DeveLancarValidatorException() {
        var actual = assertThrows(
                ValidatorException.class,
                () -> pessoaService.cadastrar(pessoaJuridicaRequest));

        assertEquals(HttpStatus.CONFLICT, actual.getStatus());
        assertEquals("CNPJ já cadastrado no sistema.", actual.getMessage());
    }

    @Test @Order(6)
    @DisplayName("Integration Test - Dado Ids Diferentes Quando editar() Deve Lancar ValidatorException")
    void testDadoIdsDiferentes_QuandoEditar_DeveLancarValidatorException() {
        pessoaFisicaRequest.setId(pessoaFisicaId);

        var actual = assertThrows(
                ValidatorException.class,
                () -> pessoaService.editar(UUID.randomUUID(), pessoaFisicaRequest));

        assertEquals(HttpStatus.NOT_ACCEPTABLE, actual.getStatus());
        assertEquals(Constants.PARAMETER_DIVERGENT, actual.getMessage());
    }

    @Test @Order(7)
    @DisplayName("Integration Test - Dado Id Nao Cadastrado editar() Deve Lancar ValidatorException")
    void testDadoIdNaoCadastrado_QuandoEditar_DeveLancarValidatorException() {
        var idNaoCadastrado = UUID.randomUUID();
        pessoaFisicaRequest.setId(idNaoCadastrado.toString());

        var actual = assertThrows(
                ValidatorException.class,
                () -> pessoaService.editar(idNaoCadastrado, pessoaFisicaRequest));

        assertEquals(HttpStatus.NOT_FOUND, actual.getStatus());
        assertEquals(
                String.format("Pessoa com o identificador %s não encontrado!", idNaoCadastrado),actual.getMessage());
    }

    @Test @Order(8)
    @DisplayName("Integration Test - Dado PessoaRequest Quando editar() Deve Retornar PessoaResponse")
    void testDadoPessoaRequest_QuandoEditar_DeveRetornarPessoaResponse() {
        pessoaFisicaRequest.setId(pessoaFisicaId);
        pessoaFisicaRequest.setTelefone("8734473075");
        pessoaFisicaRequest.setNome("Alice Medeiros Silva");

        var actual = pessoaService.editar(UUID.fromString(pessoaFisicaRequest.getId()), pessoaFisicaRequest);

        assertInstanceOf(PessoaResponse.class, actual);
        assertEquals(pessoaFisicaId, actual.getId());
        assertEquals(pessoaFisicaRequest.getTelefone(), actual.getTelefone());
        assertEquals(pessoaFisicaRequest.getNome(), ((PessoaResponse.PessoaFisica) actual).getNome());
    }

    @Test @Order(9)
    @DisplayName("Integration Test - Dado Pessoas Cadastradas Quando buscarTodas() Deve Retornar PessoaResponse List")
    void testDadoPessoasCadastradas_QuandoBuscarTodos_DeveRetornarPessoaResponseList() {
        var actual = pessoaService.buscarTodas();

        assertEquals(3, actual.size());
        assertInstanceOf(PessoaResponse.class, actual.get(0));
    }

    @Test @Order(10)
    @DisplayName("Integration Test - Dado Documento Nao Cadastrado Quando buscarPorDocumento() Deve Retornar Optional Empty")
    void testDadoDocumentoNaoCadastrado_QuandoBuscarPorDocumento_DeveRetornarOptionalEmpty() {
        var actual =  pessoaService.buscarPorDocumento("12345678910");

        assertInstanceOf(Optional.class, actual);
        assertTrue(actual.isEmpty());
    }

    @Test @Order(11)
    @DisplayName("Integration Test - Dado Documento Quando buscarPorDocumento() Deve Retornar Optional PessoaResponse")
    void testDadoDocumento_QuandoBuscarPorDocumento_DeveRetornarOptionalPessoaResponse() {
        var actual = pessoaService.buscarPorDocumento(pessoaFisicaRequest.getCpf());

        assertTrue(actual.isPresent());
        assertInstanceOf(PessoaResponse.class, actual.get());
        assertEquals(pessoaFisicaRequest.getCpf(), ((PessoaResponse.PessoaFisica) actual.get()).getCpf());
    }

    @Test @Order(12)
    @DisplayName("Integration Test - Dado Id Nao Cadastrado Quando buscarPorId() Deve Retornar Optional Empty")
    void testDadoIdNaoCadastrado_QuandoBuscarPorId_DeveRetornarOptionalEmpty() {
        var actual = pessoaService.buscarPorId(UUID.randomUUID());

        assertInstanceOf(Optional.class, actual);
        assertTrue(actual.isEmpty());
    }

    @Test @Order(12)
    @DisplayName("Integration Test - Dado Id Quando buscarPorId() Deve Retornar Optional PessoaResponse")
    void testDadoId_QuandoBuscarPorId_DeveRetornarOptionalPessoaResponse() {
        var actual = pessoaService.buscarPorId(UUID.fromString(pessoaFisicaId));

        assertTrue(actual.isPresent());
        assertInstanceOf(PessoaResponse.class, actual.get());
        assertEquals(pessoaFisicaId, actual.get().getId());
    }
}