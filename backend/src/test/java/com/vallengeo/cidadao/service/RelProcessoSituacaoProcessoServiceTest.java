package com.vallengeo.cidadao.service;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.cidadao.enumeration.SituacaoProcessoEnum;
import com.vallengeo.cidadao.model.Processo;
import com.vallengeo.cidadao.model.RelProcessoSituacaoProcesso;
import com.vallengeo.cidadao.repository.ProcessoRepository;
import com.vallengeo.cidadao.repository.RelProcessoSituacaoProcessoRepository;
import com.vallengeo.portal.repository.GrupoRepository;
import com.vallengeo.utils.AuthTestUtils;
import com.vallengeo.utils.ImovelTestUtils;
import com.vallengeo.utils.UsuarioTestUtils;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.AuthenticationManager;

import java.util.Collections;
import java.util.function.Predicate;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Rel Processo SituacaoProcesso Service Tests")
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class RelProcessoSituacaoProcessoServiceTest extends AbstractIntegrationTest {

    @Autowired
    private RelProcessoSituacaoProcessoService processoSituacaoProcessoService;
    @Autowired
    private RelProcessoSituacaoProcessoRepository processoSituacaoProcessoRepository;
    @Autowired
    private ProcessoRepository processoRepository;
    @Autowired
    private GrupoRepository grupoRepository;
    @Autowired
    private AuthenticationManager authManager;

    private static Processo processo;

    @BeforeAll
    public void setup() {
        AuthTestUtils.setAuthentication(authManager, "vallengeo.dev@gmail.com", "123456");
        var grupo = grupoRepository.findById(UsuarioTestUtils.GRUPO_ID).orElse(null);

        processo = ImovelTestUtils.getProcesso(grupo);
        processoRepository.save(processo);
    }

    @Test @Order(1)
    @DisplayName("Integration Test - Dado Processo Quando cadastrar() Deve Cadastrar RelProcessoSituacaoProcesso")
    void testDadoProcesso_QuandoCadastrado_DeveCadastrarRelProcessoSituacaoProcesso() {
        processoSituacaoProcessoService.cadastrar(processo.getId(), SituacaoProcessoEnum.PENDENTE_UPLOAD_ARQUIVO);
        var actual = processoSituacaoProcessoRepository.findAllByProcessoIdAndAtivoIsTrue(processo.getId()).get(0);

        assertNotNull(actual);
        assertInstanceOf(RelProcessoSituacaoProcesso.class, actual);
        assertEquals(processo.getId(), actual.getProcesso().getId());
        assertEquals(SituacaoProcessoEnum.PENDENTE_UPLOAD_ARQUIVO.toString(), actual.getSituacaoProcesso().getCodigo());
        assertTrue(actual.getAtivo());
    }

    @Test @Order(2)
    @DisplayName("Integration Test - Dado Processo Quando alterar() Deve Alterar SituacaoProcesso")
    void testDadoProcesso_QuandoAlterar_DeveAlterarSituacaoProcesso() {
        processoSituacaoProcessoService.alterar(processo.getId(), Collections.singletonList(SituacaoProcessoEnum.AGUARDANDO_APROVACAO));
        var situacoesProcesso = processoSituacaoProcessoRepository.findAll();

        var inativo = situacoesProcesso.stream().filter(Predicate.not(RelProcessoSituacaoProcesso::getAtivo)).findFirst().orElse(null);
        assertNotNull(inativo);
        assertInstanceOf(RelProcessoSituacaoProcesso.class, inativo);
        assertFalse(inativo.getAtivo());
        assertEquals(processo.getId(), inativo.getProcesso().getId());
        assertEquals(SituacaoProcessoEnum.PENDENTE_UPLOAD_ARQUIVO.toString(), inativo.getSituacaoProcesso().getCodigo());

        var ativo = situacoesProcesso.stream().filter(RelProcessoSituacaoProcesso::getAtivo).findFirst().orElse(null);
        assertNotNull(ativo);
        assertInstanceOf(RelProcessoSituacaoProcesso.class, ativo);
        assertTrue(ativo.getAtivo());
        assertEquals(processo.getId(), ativo.getProcesso().getId());
        assertEquals(SituacaoProcessoEnum.AGUARDANDO_APROVACAO.toString(), ativo.getSituacaoProcesso().getCodigo());
        assertTrue(inativo.getDataAcao().isBefore(ativo.getDataAcao()));

    }
}