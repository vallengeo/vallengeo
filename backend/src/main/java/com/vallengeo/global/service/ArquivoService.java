package com.vallengeo.global.service;

import com.vallengeo.core.util.FileUnzipper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import static com.vallengeo.core.config.Config.APPLICATION_TEMP_UPLOAD;

@Slf4j
@Service
@RequiredArgsConstructor
public class ArquivoService {
  public List<String> filesUnzipped(MultipartFile file) throws IOException {
        log.info("Descompactando arquivo: {}", file.getOriginalFilename());

        final var extension = "." + FilenameUtils.getExtension(file.getOriginalFilename());
        final var tempFileId = UUID.randomUUID();
        final var tempFileName = tempFileId + extension;
        final var filePath = APPLICATION_TEMP_UPLOAD + tempFileName;
        final var unzipFilesPath = APPLICATION_TEMP_UPLOAD + tempFileId;
        final var dest = new File(filePath);
        file.transferTo(dest);

        return FileUnzipper.unzip(filePath, unzipFilesPath);
    }
}
