package com.vallengeo.cidadao.service;

import com.google.common.base.Throwables;
import com.vallengeo.cidadao.enumeration.TipoDocumentoEnum;
import com.vallengeo.cidadao.model.Documento;
import com.vallengeo.cidadao.model.Processo;
import com.vallengeo.cidadao.model.TipoDocumento;
import com.vallengeo.cidadao.payload.request.DocumentoTemporarioRequest;
import com.vallengeo.cidadao.payload.request.ProcessoDocumentoRequest;
import com.vallengeo.cidadao.payload.response.DocumentoResponse;
import com.vallengeo.cidadao.payload.response.DocumentoTemporarioResponse;
import com.vallengeo.cidadao.repository.DocumentoRepository;
import com.vallengeo.cidadao.repository.RelGrupoTipoDocumentoRepository;
import com.vallengeo.cidadao.repository.TipoDocumentoRepository;
import com.vallengeo.cidadao.service.mapper.DocumentoMapper;
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
    public List<Documento> cadastrar(ProcessoDocumentoRequest input, Processo processo) {
        try {
            List<Documento> documentos = new ArrayList<>();

            for (DocumentoTemporarioRequest request : input.getDocumentos()) {
                final File tempFile = new File(APPLICATION_TEMP_UPLOAD + File.separator + request.getNomeTemporario());
                var extensao = "." + FilenameUtils.getExtension(request.getNomeOriginal());
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

                documentos.add(repository.save(documento));
                moverParaPastaDefinitiva(tempFile, documento.getId().toString(), documento.getExtensao());
            }

            return documentos;
        } catch (Exception e) {
            log.error("Erro ao ler o arquivo." + " " + Throwables.getStackTraceAsString(e));
            throw new ValidatorException("Erro ao ler o arquivo.");
        }
    }

    public List<Documento> buscarDocumentoEnviadoPeloProcessoId(UUID processoId) {
        return repository.findAllByProcessoId(processoId);
    }

    public List<DocumentoResponse> buscarDocumentoEnviadoPeloProcesso(UUID idProcesso) {
        List<DocumentoResponse> output = new ArrayList<>();
        this.buscarDocumentoEnviadoPeloProcessoId(idProcesso)
                .forEach(documento -> output.add(DocumentoMapper.INSTANCE.toResponse(documento)));
        output.sort(Comparator.comparing(DocumentoResponse::getDataEnvio).reversed());
        return output;
    }

    private void moverParaPastaDefinitiva(File temp, String nome, String extensao) throws IOException {
        final File definitive = new File(APPLICATION_DEFINITIVE_UPLOAD + File.separator + nome + extensao);
        FileUtils.copyFile(temp, definitive);
        Files.delete(temp.toPath());
    }
}
