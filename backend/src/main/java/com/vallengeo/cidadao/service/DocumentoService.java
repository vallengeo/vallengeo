package com.vallengeo.cidadao.service;

import com.google.common.base.Throwables;
import com.vallengeo.cidadao.enumeration.TipoDocumentoEnum;
import com.vallengeo.cidadao.model.Documento;
import com.vallengeo.cidadao.model.Processo;
import com.vallengeo.cidadao.model.RelGrupoTipoDocumento;
import com.vallengeo.cidadao.model.TipoDocumento;
import com.vallengeo.cidadao.payload.request.DocumentoTemporarioRequest;
import com.vallengeo.cidadao.payload.request.ProcessoDocumentoRequest;
import com.vallengeo.cidadao.payload.response.DocumentoTemporarioResponse;
import com.vallengeo.cidadao.payload.response.DocumentosEnviadosResponse;
import com.vallengeo.cidadao.payload.response.TipoDocumentoResponse;
import com.vallengeo.cidadao.repository.DocumentoRepository;
import com.vallengeo.cidadao.repository.ProcessoRepository;
import com.vallengeo.cidadao.repository.RelGrupoTipoDocumentoRepository;
import com.vallengeo.cidadao.repository.TipoDocumentoRepository;
import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.core.util.SecurityUtils;
import com.vallengeo.global.model.Arquivo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.*;
import java.util.stream.Collectors;

import static com.vallengeo.core.config.Config.APPLICATION_DEFINITIVE_UPLOAD;
import static com.vallengeo.core.config.Config.APPLICATION_TEMP_UPLOAD;
import static com.vallengeo.core.helpers.DateHelpers.convertDateToLocalDateTime;
import static com.vallengeo.core.util.Constants.FILE_NOT_PERMITED_ERROR;
import static com.vallengeo.core.util.Constants.NOT_FOUND;

@Slf4j
@Service
@RequiredArgsConstructor
public class DocumentoService {
    private final RelGrupoTipoDocumentoRepository relGrupoTipoDocumentoRepository;
    private final TipoDocumentoRepository tipoDocumentoRepository;
    private final DocumentoRepository repository;
    private final ProcessoRepository processoRepository;
    private final TipoDocumentoService tipoDocumentoService;
    private final ProcessoService processoService;
    public static final String LOG_PREFIX = "[DOCUMENTO] - ";

    @Transactional
    public DocumentoTemporarioResponse uploadTemp(Long tipoDocumentoId, MultipartFile file, HttpServletRequest request) throws IOException {

        String id = UUID.randomUUID().toString();
        String extension = "." + FilenameUtils.getExtension(file.getOriginalFilename());
        String nomeTemporario = id + extension;
        File dest = new File(APPLICATION_TEMP_UPLOAD + File.separator + nomeTemporario);

        TipoDocumento tipoDocumento = relGrupoTipoDocumentoRepository.findByGrupoIdAndTipoDocumentoId(SecurityUtils.extractGrupoId(request), tipoDocumentoId).orElseThrow(() -> new ValidatorException("Não foi possível encontrar a relação entre o grupo e o tipo do arquivo!", HttpStatus.NOT_FOUND)).getTipoDocumento();

        // tipo "Outros" não validar formato
        if (Boolean.FALSE.equals(TipoDocumentoEnum.OUTROS.getCodigo().equals(tipoDocumento.getId()))) {
            List<String> formatosPermitidos = Arrays.asList(tipoDocumento.getFormato().split(","));

            if (Boolean.FALSE.equals(formatosPermitidos.contains(extension))) {
                log.error("O formato {} não é permitido!", extension);
                throw new ValidatorException(FILE_NOT_PERMITED_ERROR, HttpStatus.NOT_ACCEPTABLE);
            }
        }

        file.transferTo(dest);

        return DocumentoTemporarioResponse.builder()
                .idTipoDocumento(tipoDocumentoId)
                .nomeTemporario(nomeTemporario)
                .nomeOriginal(file.getOriginalFilename())
                .dataEnvio(convertDateToLocalDateTime(new Date()))
                .build();
    }

    @Transactional
    public void cadastrar(ProcessoDocumentoRequest input) {

        List<Documento> documentos = new ArrayList<>();

        UUID processoId = UUID.fromString(input.getIdProcesso());

        log.info(LOG_PREFIX + "Cadastro de documentos para o processo {}", processoId);
        Processo processo = processoRepository.findById(processoId).orElseThrow(
                () -> new ValidatorException("Processo " + input.getIdProcesso() + NOT_FOUND, HttpStatus.NOT_FOUND));

        for (DocumentoTemporarioRequest request : input.getDocumentos()) {
            try {
                final File tempFile = new File(APPLICATION_TEMP_UPLOAD + File.separator + request.getNomeTemporario());

                if (tempFile.exists() && !tempFile.isDirectory()) {
                    String extensao = "." + FilenameUtils.getExtension(request.getNomeOriginal());
                    Arquivo arquivo = Arquivo.builder()
                            .nome(request.getNomeOriginal().replace(extensao, ""))
                            .extensao(extensao)
                            .tamanho(FileUtils.readFileToByteArray(tempFile).length)
                            .dataEnvio(request.getDataEnvio())
                            .build();
                    Documento documento = new Documento(arquivo);
                    documento.setProcesso(processo);
                    documento.setTipoDocumento(tipoDocumentoRepository.findById(request.getIdTipoDocumento()).orElseThrow(
                            () -> new ValidatorException("Tipo do documento" + request.getNomeOriginal() + NOT_FOUND, HttpStatus.NOT_FOUND)));

                    documentos.add(documento);
                    moverParaPastaDefinitiva(tempFile, documento.getId().toString(), documento.getExtensao());
                }
            } catch (Exception e) {
                log.error("Erro ao ler o arquivo." + " " + Throwables.getStackTraceAsString(e));
                throw new ValidatorException("Erro ao ler o arquivo.");
            }
        }

        repository.saveAll(documentos);
        processoService.validacaoPosCadastrarDocumento(input);
    }

    public List<Documento> buscarDocumentoEnviadoPeloProcessoId(UUID processoId) {
        return repository.findAllByProcessoId(processoId);
    }

    public List<DocumentosEnviadosResponse> buscarDocumentoEnviadoPeloProcesso(UUID idProcesso) {
        List<DocumentosEnviadosResponse> output = new ArrayList<>();

        try {
            List<Documento> documentos = buscarDocumentoEnviadoPeloProcessoId(idProcesso);

            // Ordenar tipos de documento
            List<TipoDocumento> tipoDocumentosOrdenados = ordenar(documentos.stream().map(Documento::getTipoDocumento).toList(), idProcesso);

            // Agrupar documentos por tipo usando a lista ordenada
            Map<TipoDocumento, List<Documento>> documentosPorTipo = documentos.stream()
                    .filter(documento -> tipoDocumentosOrdenados.contains(documento.getTipoDocumento()))
                    .collect(Collectors.groupingBy(Documento::getTipoDocumento));

            documentosPorTipo.forEach((tipoDocumento, listaDocumentos) -> {
                List<DocumentosEnviadosResponse.Documento> documentosResponse = listaDocumentos.stream().map(documento ->
                        DocumentosEnviadosResponse.Documento.builder()
                                .id(documento.getId())
                                .nome(documento.getNome())
                                .extensao(documento.getExtensao())
                                .tamanho(documento.getTamanho())
                                .dataEnvio(documento.getDataEnvio())
                                .build()
                ).toList();

                output.add(DocumentosEnviadosResponse.builder()
                        .id(tipoDocumento.getId())
                        .titulo(tipoDocumento.getTitulo())
                        .documentos(documentosResponse)
                        .build()
                );
            });

        } catch (Exception e) {
            log.error("Erro ao buscar documentos pelo processo: " + Throwables.getStackTraceAsString(e));
        }

        return output;
    }

 public List<TipoDocumentoResponse> buscarTipoDocumento(HttpServletRequest request) {
        return tipoDocumentoService.buscarTipoDocumento(request);
    }

    public List<TipoDocumentoResponse> buscarTipoDocumentoEnviadoPeloProcesso(UUID idProcesso) {
        return tipoDocumentoService.buscarTipoDocumentoEnviadoPeloProcesso(idProcesso);
    }

    public List<TipoDocumentoResponse> buscarTipoDocumentoNaoEnviadoPeloProcesso(UUID idProcesso) {
        return tipoDocumentoService.buscarTipoDocumentoNaoEnviadoPeloProcesso(idProcesso);
    }

    private void moverParaPastaDefinitiva(File temp, String nome, String extensao) throws IOException {
        final File definitive = new File(APPLICATION_DEFINITIVE_UPLOAD + File.separator + nome + extensao);
        FileUtils.copyFile(temp, definitive);
        Files.delete(temp.toPath());
    }

    private List<TipoDocumento> ordenar(List<TipoDocumento> lista, UUID idProcesso) {
        try {
            // Filtrar e remover "Outros" da lista
            List<TipoDocumento> filtrados = lista.stream()
                    .filter(td -> !td.getId().equals(TipoDocumentoEnum.OUTROS.getCodigo()))
                    .collect(Collectors.toList());

            // Buscar relações de grupo de tipo de documento pelo id do processo
            List<RelGrupoTipoDocumento> grupoTipoDocumentos = relGrupoTipoDocumentoRepository.findAllByProcessoId(idProcesso);

            // Ordenar a lista filtrada
            filtrados.sort(Comparator.comparing((TipoDocumento td) -> {
                RelGrupoTipoDocumento rel = grupoTipoDocumentos.stream()
                        .filter(r -> r.getTipoDocumento().getId().equals(td.getId()))
                        .findFirst()
                        .orElseThrow(() -> new NoSuchElementException("Relação não encontrada para TipoDocumento: " + td.getId()));

                return !rel.getObrigatorio();
            }).thenComparing(TipoDocumento::getTitulo));

            // Adicionar "Outros" no final da lista
            lista.stream()
                    .filter(td -> td.getId().equals(TipoDocumentoEnum.OUTROS.getCodigo()))
                    .findFirst()
                    .ifPresent(filtrados::add);

            return filtrados;

        } catch (Exception e) {
            log.error("Erro ao ordenar tipos de documento: " + Throwables.getStackTraceAsString(e));
            return lista;
        }
    }
}
