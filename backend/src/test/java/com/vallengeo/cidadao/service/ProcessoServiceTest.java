package com.vallengeo.cidadao.service;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.cidadao.enumeration.SituacaoProcessoEnum;
import com.vallengeo.cidadao.model.Processo;
import com.vallengeo.cidadao.model.RelGrupoTipoDocumento;
import com.vallengeo.cidadao.repository.DocumentoRepository;
import com.vallengeo.cidadao.repository.RelGrupoTipoDocumentoRepository;
import com.vallengeo.cidadao.repository.RelProcessoSituacaoProcessoRepository;
import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.utils.AuthTestUtils;
import com.vallengeo.utils.DocumentoTestUtils;
import com.vallengeo.utils.UsuarioTestUtils;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Processo Service Tests")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class ProcessoServiceTest extends AbstractIntegrationTest {

    @Autowired
    private ProcessoService processoService;
    @Autowired
    private AuthenticationManager authManager;
    @Autowired
    private DocumentoRepository documentoRepository;
    @Autowired
    private RelGrupoTipoDocumentoRepository grupoTipoDocumentoRepository;
    @Autowired
    private RelProcessoSituacaoProcessoRepository processoSituacaoProcessoRepository;

    private static Processo processoCadastrado;

    @Test @Order(1)
    @DisplayName("Integration Test - Dado IdGrupo Nao Cadastrado Quando cadastrar() Deve Lancar ValidatorException")
    void testDadoIdGrupoNaoCadastrado_QuandoCadastrar_DeveLancarValidatorException() {
        var idGrupo = UUID.randomUUID().toString();

        var actual = assertThrows(
                ValidatorException.class,
                () -> processoService.cadastrar(idGrupo));

        assertEquals(HttpStatus.NOT_FOUND, actual.getStatus());
        assertEquals(String.format("Grupo %s não encontrado!", idGrupo), actual.getMessage());
    }

    @Test @Order(2)
    @DisplayName("Integration Test - Dado IdGrupo Quando cadastrar() Deve Retornar Processo")
    void testDadoIdGrupo_QuandoCadastrar_DeveRetornarProcesso() {
        AuthTestUtils.setAuthentication(authManager, "vallengeo.dev@gmail.com", "123456");
        var actual = processoService.cadastrar(UsuarioTestUtils.GRUPO_ID.toString());

        assertNotNull(actual);
        assertInstanceOf(Processo.class, actual);
        assertNotNull(actual.getProtocolo());
        assertNotNull(actual.getDataCadastro());
        assertEquals(UsuarioTestUtils.GRUPO_ID, actual.getGrupo().getId());
        assertEquals("vallengeo.dev@gmail.com", actual.getUsuario().getEmail());

        processoCadastrado = actual;
    }

    @Test @Order(3)
    @DisplayName("Integration Test - Dado idProcesso Nao Cadastrado Quando validacaoPosCadastrarDocumento() Deve Lancar ValidatorException")
    void testDadoIdProcessoNaoCadastrado_QuandoValidacaoPosCadastrarDocumento_DeveLancarValidatorException() {
        var idProcesso = UUID.randomUUID();

        var actual = assertThrows(
                ValidatorException.class,
                () -> processoService.validacaoPosCadastrarDocumento(idProcesso));

        assertEquals(HttpStatus.NOT_FOUND, actual.getStatus());
        assertEquals(String.format("Processo %s não encontrado!", idProcesso), actual.getMessage());
    }

    @Test @Order(4)
    @DisplayName("Integration Test - Dado Documentos Obrigatorios Nao Cadastrados Quando validacaoPosCadastrarDocumento() Deve Retornar Void")
    void testDadoDocumentosObrigatoriosNaoCadastrados_QuandoValidacaoPosCadastrarDocumento_DeveAlterStatus() {
        processoService.validacaoPosCadastrarDocumento(processoCadastrado.getId());
        var actual = processoSituacaoProcessoRepository
                .findAllByProcessoIdAndAtivoIsTrue(processoCadastrado.getId()).stream().findFirst().orElse(null);

        assertNotNull(actual);
        assertEquals(SituacaoProcessoEnum.PENDENTE_UPLOAD_ARQUIVO.toString(), actual.getSituacaoProcesso().getCodigo());
    }

    @Test @Order(5)
    @DisplayName("Integration Test - Dado Documentos Obrigatorios Cadastrados Quando validacaoPosCadastrarDocumento() Deve Alterar Status")
    void testDadoDocumentosObrigatoriosCadastrados_QuandoValidacaoPosCadastrarDocumento_DeveAlterStatus() {
        var documentosObrigatorios = grupoTipoDocumentoRepository.findAll().stream()
                .filter(RelGrupoTipoDocumento::getObrigatorio).toList();

        for (RelGrupoTipoDocumento relGrupoTipoDocumento: documentosObrigatorios) {
            documentoRepository.save(DocumentoTestUtils
                    .getDocumentoByTipoDocumento(processoCadastrado, relGrupoTipoDocumento.getTipoDocumento()));
        }

        processoService.validacaoPosCadastrarDocumento(processoCadastrado.getId());
        var actual = processoSituacaoProcessoRepository
                .findAllByProcessoIdAndAtivoIsTrue(processoCadastrado.getId()).stream().findFirst().orElse(null);

        assertNotNull(actual);
        assertNotEquals(processoCadastrado.getDataAlteracao(), actual.getProcesso().getDataAlteracao());
        assertEquals(SituacaoProcessoEnum.AGUARDANDO_APROVACAO.toString(), actual.getSituacaoProcesso().getCodigo());
    }
}