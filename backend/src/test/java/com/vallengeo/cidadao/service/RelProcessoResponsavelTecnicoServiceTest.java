package com.vallengeo.cidadao.service;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.cidadao.model.Processo;
import com.vallengeo.cidadao.model.RelProcessoResponsavelTecnico;
import com.vallengeo.cidadao.payload.request.ResponsavelTecnicoRequest;
import com.vallengeo.cidadao.repository.ProcessoRepository;
import com.vallengeo.cidadao.repository.RelProcessoResponsavelTecnicoRepository;
import com.vallengeo.portal.repository.GrupoRepository;
import com.vallengeo.utils.AuthTestUtils;
import com.vallengeo.utils.ImovelTestUtils;
import com.vallengeo.utils.UsuarioTestUtils;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.AuthenticationManager;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Rel Processo ResponsavelTecnico Service Tests")
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class RelProcessoResponsavelTecnicoServiceTest extends AbstractIntegrationTest {

    @Autowired
    private RelProcessoResponsavelTecnicoService processoResponsavelTecnicoService;
    @Autowired
    private RelProcessoResponsavelTecnicoRepository processoResponsavelTecnicoRepository;
    @Autowired
    private ProcessoRepository processoRepository;
    @Autowired
    private AuthenticationManager authManager;
    @Autowired
    private GrupoRepository grupoRepository;

    private static Processo processo;

    @BeforeAll
    public void setup() {
        AuthTestUtils.setAuthentication(authManager, "vallengeo.dev@gmail.com", "123456");
        var grupo = grupoRepository.findById(UsuarioTestUtils.GRUPO_ID).orElse(null);

        processo = ImovelTestUtils.getProcesso(grupo);
        processoRepository.save(processo);
    }

    @Test
    @DisplayName("Integration Test - Dado Lista ResponsavelTecnicoRequest Quando cadastrar() Deve Cadastrar RelProcessoResponsavelTecnico")
    void testDadoListaResponsavelTecnicoRequest_QuandoCadastrar_DeveCadastrarRelProcessoResponsavelTecnico() {
        var request = new ResponsavelTecnicoRequest("26795025586", "responsavel_tecnico@gmail.com");

        processoResponsavelTecnicoService.cadastrar(processo.getId(), List.of(request));
        var actual = processoResponsavelTecnicoRepository.findAll().stream().findFirst().orElse(null);

        assertNotNull(actual);
        assertInstanceOf(RelProcessoResponsavelTecnico.class, actual);
        assertEquals(processo.getId(), actual.getProcesso().getId());
        assertEquals(request.cpf(), actual.getResponsavelTecnico().getCpf());
        assertEquals(request.email(), actual.getResponsavelTecnico().getEmail());
    }
}