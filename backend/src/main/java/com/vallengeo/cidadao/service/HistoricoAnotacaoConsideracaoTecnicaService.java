package com.vallengeo.cidadao.service;


import com.vallengeo.cidadao.model.Documento;
import com.vallengeo.cidadao.model.HistoricoAnotacaoConsideracaoTecnica;
import com.vallengeo.cidadao.model.Processo;
import com.vallengeo.cidadao.payload.request.HistoricoAnotacaoConsideracaoTecnicaRequest;
import com.vallengeo.cidadao.payload.request.ProcessoDocumentoRequest;
import com.vallengeo.cidadao.payload.response.HistoricoAnotacaoConsideracaoTecnicaResponse;
import com.vallengeo.cidadao.repository.HistoricoAnotacaoConsideracaoTecnicaRepository;
import com.vallengeo.core.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import static com.vallengeo.cidadao.enumeration.TipoDocumentoEnum.ANOTACAO_CONSIDERACAO_TECNICA;
import static com.vallengeo.core.helpers.DateHelpers.convertDateToLocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class HistoricoAnotacaoConsideracaoTecnicaService {
    private final HistoricoAnotacaoConsideracaoTecnicaRepository repository;
    private final DocumentoService documentoService;

    @Transactional
    public void cadastrar(HistoricoAnotacaoConsideracaoTecnicaRequest input, Processo processo) {
        // converte o tipo de documento para ACT
        input.getDocumentos().forEach(d -> d.setIdTipoDocumento(ANOTACAO_CONSIDERACAO_TECNICA.getCodigo()));

        HistoricoAnotacaoConsideracaoTecnica historico = new HistoricoAnotacaoConsideracaoTecnica();

        List<Documento> documentos = documentoService.cadastrar(ProcessoDocumentoRequest.builder()
                .idProcesso(input.getIdProcesso().toString())
                .documentos(input.getDocumentos())
                .build());

        historico.setDocumentos(documentos);
        historico.setDataCadastro(convertDateToLocalDateTime(new Date()));
        historico.setTitulo(input.getTitulo());
        historico.setDescricao(input.getDescricao());
        historico.setProcesso(processo);
        historico.setUsuario(SecurityUtils.getUserSession());

        repository.save(historico);

    }

    public List<HistoricoAnotacaoConsideracaoTecnicaResponse> historicoPorProcessoId(UUID processoId) {
        List<HistoricoAnotacaoConsideracaoTecnicaResponse> responses = new ArrayList<>();
        repository.findAllByProcessoId(processoId).forEach(historico -> {
            responses.add(
                    HistoricoAnotacaoConsideracaoTecnicaResponse.builder()
                            .id(historico.getId())
                            .titulo(historico.getTitulo())
                            .descricao(historico.getDescricao())
                            .dataCadastro(historico.getDataCadastro())
                            .documentosEnviados(documentoService.montaDocumentosEnviadosResponsePorDocumentos(historico.getDocumentos(), processoId))
                            .build()
            );
        });

        return responses;
    }
}
