package com.vallengeo.cidadao.service;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.cidadao.model.InformacaoImovel;
import com.vallengeo.cidadao.payload.request.imovel.InformacaoImovelRequest;
import com.vallengeo.cidadao.payload.request.imovel.TipoUsoRequest;
import com.vallengeo.utils.EnderecoTestUtils;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Informacao Imovel Service Tests")
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class InformacaoImovelServiceTest extends AbstractIntegrationTest {

    @Autowired
    private InformacaoImovelService informacaoImovelService;

    private InformacaoImovelRequest informacaoImovelRequest;

    @BeforeAll
    public void setup() {
        informacaoImovelRequest = new InformacaoImovelRequest(
                new TipoUsoRequest(1L), EnderecoTestUtils.getEnderecoRequest());
    }

    @Test
    @DisplayName("Integration Test - Dado InformacaoImovelRequest Quando cadastrar() Deve Retornar InformacaoImovel")
    void testDadoInformacaoImovelRequest_QuandoCadastrar_DeveRetornarInformacaoImovel() {
        var actual = informacaoImovelService.cadastrar(informacaoImovelRequest);

        assertNotNull(actual);
        assertInstanceOf(InformacaoImovel.class, actual);
        assertEquals(informacaoImovelRequest.tipoUso().id(), actual.getTipoUso().getId());
        assertEquals(informacaoImovelRequest.endereco().cep(), actual.getEndereco().getCep());
    }
}