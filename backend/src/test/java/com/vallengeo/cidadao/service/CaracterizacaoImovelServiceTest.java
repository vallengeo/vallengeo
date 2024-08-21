package com.vallengeo.cidadao.service;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.cidadao.model.CaracterizacaoImovel;
import com.vallengeo.cidadao.payload.request.imovel.CaracterizacaoImovelRequest;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Caracterizacao Imovel Service Tests")
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class CaracterizacaoImovelServiceTest extends AbstractIntegrationTest {

    @Autowired
    private CaracterizacaoImovelService caracterizacaoImovelService;

    private CaracterizacaoImovelRequest caracterizacaoImovelRequest;

    @BeforeAll
    public void setup() {
        caracterizacaoImovelRequest = new CaracterizacaoImovelRequest(
                "ABC", "10", "5", "2255", 200F, 10F, 0F, LocalDate.now());
    }

    @Test
    @DisplayName("Integration Test - Dado CaracterizacaoImovelRequest Quando cadastrar() Deve Retornar CaracterizacaoImovel")
    void testDadoCaracterizacaoImovelRequest_QuandoCadastrar_DeveRetornarCaracterizacaoImovel() {
        var actual = caracterizacaoImovelService.cadastrar(caracterizacaoImovelRequest);

        assertNotNull(actual);
        assertInstanceOf(CaracterizacaoImovel.class, actual);
        assertEquals(caracterizacaoImovelRequest.setor(), actual.getSetor());
        assertEquals(caracterizacaoImovelRequest.quadra(), actual.getQuadra());
        assertEquals(caracterizacaoImovelRequest.lote(), actual.getLote());
        assertEquals(caracterizacaoImovelRequest.unidade(), actual.getUnidade());
        assertEquals(caracterizacaoImovelRequest.areaTerreno(), actual.getAreaTerreno());
        assertEquals(caracterizacaoImovelRequest.testadaPrincipal(), actual.getTestadaPrincipal());
        assertEquals(caracterizacaoImovelRequest.fracaoIdeal(), actual.getFracaoIdeal());
    }

}