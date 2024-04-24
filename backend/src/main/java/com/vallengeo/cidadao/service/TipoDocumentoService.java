package com.vallengeo.cidadao.service;

import com.vallengeo.cidadao.enumeration.TipoDocumentoEnum;
import com.vallengeo.cidadao.model.Documento;
import com.vallengeo.cidadao.model.Processo;
import com.vallengeo.cidadao.model.TipoDocumento;
import com.vallengeo.cidadao.payload.response.TipoDocumentoResponse;
import com.vallengeo.cidadao.repository.ProcessoRepository;
import com.vallengeo.cidadao.repository.RelGrupoTipoDocumentoRepository;
import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.core.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

import static com.vallengeo.core.util.Constants.NOT_FOUND;

@Slf4j
@Service
@RequiredArgsConstructor
public class TipoDocumentoService {
    private final RelGrupoTipoDocumentoRepository relGrupoTipoDocumentoRepository;
    private final ProcessoRepository processoRepository;
    private final DocumentoService documentoService;

    public List<TipoDocumentoResponse> buscarTipoDocumento(HttpServletRequest request) {
        List<TipoDocumentoResponse> output = new ArrayList<>();
        relGrupoTipoDocumentoRepository.findAllByGrupoId(UUID.fromString(SecurityUtils.getUserJwt(request).getIdGrupo())).forEach(relGrupoTipoDocumento -> output.add(
                new TipoDocumentoResponse(
                        relGrupoTipoDocumento.getTipoDocumento().getId(),
                        relGrupoTipoDocumento.getTipoDocumento().getTitulo(),
                        relGrupoTipoDocumento.getObrigatorio(),
                        Objects.nonNull(relGrupoTipoDocumento.getTipoDocumento().getFormato())
                                ? List.of(relGrupoTipoDocumento.getTipoDocumento().getFormato().split(","))
                                : new ArrayList<>()
                )
        ));

        return ordenar(output);
    }

     public List<TipoDocumentoResponse> buscarTipoDocumentoEnviadoPeloProcesso(UUID processoId) {
        List<TipoDocumentoResponse> output = new ArrayList<>();

        Processo processo = processoRepository.findById(processoId).orElseThrow(
                () -> new ValidatorException("Processo " + processoId + NOT_FOUND, HttpStatus.NOT_FOUND));

        List<TipoDocumento> tipoDocumentosEnviados = this.buscarTipoDocumentoEnviadoPeloProcessoId(processoId);

        relGrupoTipoDocumentoRepository.findAllByGrupoId(processo.getGrupo().getId())
                .stream()
                .filter(relGrupoTipoDocumento -> tipoDocumentosEnviados.contains(relGrupoTipoDocumento.getTipoDocumento()))
                .forEach(relGrupoTipoDocumento ->
                        output.add(
                                new TipoDocumentoResponse(
                                        relGrupoTipoDocumento.getTipoDocumento().getId(),
                                        relGrupoTipoDocumento.getTipoDocumento().getTitulo(),
                                        relGrupoTipoDocumento.getObrigatorio(),
                                        Objects.nonNull(relGrupoTipoDocumento.getTipoDocumento().getFormato())
                                                ? List.of(relGrupoTipoDocumento.getTipoDocumento().getFormato().split(","))
                                                : new ArrayList<>()
                                )
                        ));

        return ordenar(output);
    }


    public List<TipoDocumentoResponse> buscarTipoDocumentoNaoEnviadoPeloProcesso(UUID processoId) {
        List<TipoDocumentoResponse> output = new ArrayList<>();

        Processo processo = processoRepository.findById(processoId).orElseThrow(
                () -> new ValidatorException("Processo " + processoId + NOT_FOUND, HttpStatus.NOT_FOUND));

        List<TipoDocumento> tipoDocumentosEnviados = this.buscarTipoDocumentoEnviadoPeloProcessoId(processoId);

        relGrupoTipoDocumentoRepository.findAllByGrupoId(processo.getGrupo().getId())
                .stream()
                .filter(relGrupoTipoDocumento -> !tipoDocumentosEnviados.contains(relGrupoTipoDocumento.getTipoDocumento()))
                .forEach(relGrupoTipoDocumento ->
                        output.add(
                                new TipoDocumentoResponse(
                                        relGrupoTipoDocumento.getTipoDocumento().getId(),
                                        relGrupoTipoDocumento.getTipoDocumento().getTitulo(),
                                        relGrupoTipoDocumento.getObrigatorio(),
                                        Objects.nonNull(relGrupoTipoDocumento.getTipoDocumento().getFormato())
                                                ? List.of(relGrupoTipoDocumento.getTipoDocumento().getFormato().split(","))
                                                : new ArrayList<>()
                                )
                        ));

        return ordenar(output);
    }

    private List<TipoDocumento> buscarTipoDocumentoEnviadoPeloProcessoId(UUID processoId) {
        return documentoService.buscarDocumentoEnviadoPeloProcessoId(processoId)
                .stream()
                .map(Documento::getTipoDocumento).distinct()
                .toList();
    }

    private List<TipoDocumentoResponse> ordenar(List<TipoDocumentoResponse> lista) {
        List<TipoDocumentoResponse> output = new ArrayList<>(lista.stream()
                .filter(response -> !response.id().equals(TipoDocumentoEnum.OUTROS.getCodigo())).toList());

        // Ordenar a lista filtrada
        output.sort(Comparator.comparing((TipoDocumentoResponse td) -> !td.obrigatorio()).thenComparing(TipoDocumentoResponse::titulo));

        // Adicionar "Outros" no final da lista
        lista.stream().filter(response -> response.id().equals(TipoDocumentoEnum.OUTROS.getCodigo())).findFirst().ifPresent(output::add);

        return output;
    }
}
