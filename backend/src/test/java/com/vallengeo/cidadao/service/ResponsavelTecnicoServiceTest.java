package com.vallengeo.cidadao.service;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.cidadao.model.ResponsavelTecnico;
import com.vallengeo.cidadao.payload.request.ResponsavelTecnicoRequest;
import com.vallengeo.cidadao.repository.ResponsavelTecnicoRepository;
import com.vallengeo.core.util.DocumentoUtil;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Responsavel Tecnico Service Tests")
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class ResponsavelTecnicoServiceTest extends AbstractIntegrationTest {

    @Autowired
    private ResponsavelTecnicoService responsavelTecnicoService;
    @Autowired
    private ResponsavelTecnicoRepository responsavelTecnicoRepository;

    private static ResponsavelTecnico responsavelTecnico;

    @BeforeAll
    public void setup() {
        responsavelTecnico = responsavelTecnicoRepository.save(
                ResponsavelTecnico.builder()
                        .cpf("97855286772")
                        .email("tecnico.responsavel@gmail.com")
                        .dataCadastro(LocalDateTime.now())
                        .build()
        );
    }

    @Test
    @DisplayName("Integration Test - Dado ResponsavelTecnicoRequest Quando cadastrar() Deve Retornar Objeto ResponsavelTecnico")
    void testDadoResponsavelTecnicoRequest_QuandoCadastrar_DeveRetornarObjetoResponsavelTecnico() {
        var request = new ResponsavelTecnicoRequest("334.876.041-08", "responsavel_tecnico@gmail.com");
        var actual = responsavelTecnicoService.cadastrar(request);

        assertNotNull(actual);
        assertInstanceOf(ResponsavelTecnico.class, actual);
        assertEquals(DocumentoUtil.removeMascara(request.cpf()), actual.getCpf());
        assertEquals(request.email(), actual.getEmail());
        assertNotNull(actual.getId());
    }

    @Test
    @DisplayName("Integration Test - Dado CPF Cadastrado Quando cadastrar() Deve Retornar Objeto ResponsavelTecnico")
    void testDadoCPFCadastrado_QuandoCadastrar_DeveRetornarObjetoResponsavelTecnico() {
        var request = new ResponsavelTecnicoRequest(responsavelTecnico.getCpf(), responsavelTecnico.getEmail());
        var actual = responsavelTecnicoService.cadastrar(request);

        assertNotNull(actual);
        assertInstanceOf(ResponsavelTecnico.class, actual);
        assertEquals(responsavelTecnico.getCpf(), actual.getCpf());
        assertEquals(responsavelTecnico.getEmail(), actual.getEmail());
        assertEquals(responsavelTecnico.getId(), actual.getId());
    }
}