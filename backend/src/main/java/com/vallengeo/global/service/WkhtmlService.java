package com.vallengeo.global.service;

import com.github.jhonnymertz.wkhtmltopdf.wrapper.Pdf;
import com.github.jhonnymertz.wkhtmltopdf.wrapper.params.Param;
import com.google.common.base.Throwables;
import com.vallengeo.global.payload.request.wkhtml.ParamsHtmlRequest;
import com.vallengeo.global.payload.request.wkhtml.ParamsRequest;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Slf4j
@Component
public class WkhtmlService {
    public byte[] pdf(@RequestBody ParamsRequest paramsDTO) {
        Pdf pdf = new Pdf();
        if (Objects.nonNull(paramsDTO.getHtml())) {
            addPdfFromString(paramsDTO, pdf);
        } else {
            pdf.addPageFromUrl(paramsDTO.getUrl());
        }

        if (Objects.nonNull(paramsDTO.getOptions())) {
            for (Map.Entry<String, Object> keyValue : paramsDTO.getOptions().entrySet()) {
                if (keyValue.getKey().equals("--custom-header")) {
                    List<String> keyValueHeader = Arrays.stream(keyValue.getValue().toString().split(" ")).toList();
                    if (keyValueHeader.get(0).equals("Authorization")) {
                        pdf.addParam(new Param(keyValue.getKey(), keyValueHeader.get(0), keyValueHeader.get(1) + " " + keyValueHeader.get(2)));
                    } else {
                        pdf.addParam(new Param(keyValue.getKey(), keyValueHeader.get(0), keyValueHeader.get(1)));
                    }
                } else {
                    pdf.addParam(new Param(keyValue.getKey(), keyValue.getValue().toString()));
                }
            }
        }
        try {
            return pdf.getPDF();
        } catch (Exception e) {
            log.error(Throwables.getStackTraceAsString(e));
        } finally {
            cleanAllTempFiles();
        }
        return null;
    }

    private static void addPdfFromString(ParamsRequest paramsDTO, Pdf pdf) {
        if (Objects.nonNull(paramsDTO.getHtml().getBody()) && !paramsDTO.getHtml().getBody().isEmpty()) {
            pdf.addPageFromString(paramsDTO.getHtml().getBody());
        }

        if (Objects.nonNull(paramsDTO.getHtml().getFooter()) && !paramsDTO.getHtml().getFooter().isEmpty()) {
            addFromString(paramsDTO.getHtml().getFooter(), pdf, "footer");
        }

        if (Objects.nonNull(paramsDTO.getHtml().getHeader()) && !paramsDTO.getHtml().getHeader().isEmpty()) {
            addFromString(paramsDTO.getHtml().getHeader(), pdf, "header");
        }
    }

    /**
     * @param html Html que será adicionado como footer ou header
     * @param pdf  Instancia do PDF
     * @param type footer ou header
     */
    private static void addFromString(String html, Pdf pdf, String type) {
        String filePath = System.getProperty("java.io.tmpdir") + File.separator + type + "_" + System.currentTimeMillis() + "_java-wkhtmltopdf-wrapper.html";
        BufferedWriter output = null;
        try {
            final File newFile = new File(filePath);
            output = new BufferedWriter(new FileWriter(newFile));
            output.write(html);
            pdf.addParam(new Param("--" + type + "-html", filePath));
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (output != null) {
                try {
                    output.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public void saveHtml(@RequestBody ParamsHtmlRequest paramsHtmlDTO) {
        String text = paramsHtmlDTO.getHtml();
        BufferedWriter output = null;
        try {
            final File homeDirectory = new File(paramsHtmlDTO.getPath());
            if (!homeDirectory.exists()) {
                homeDirectory.mkdir();
            }
            final File newDirectory = new File(paramsHtmlDTO.getPath() + paramsHtmlDTO.getType());
            output = new BufferedWriter(new FileWriter(newDirectory));
            output.write(text);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (output != null) {
                try {
                    output.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public ResponseEntity<String> clean(@RequestBody ParamsHtmlRequest paramsHtmlDTO) {
        File dir = new File(paramsHtmlDTO.getPath());
        try {
            FileUtils.forceDelete(new File(dir.getParent()));
        } catch (Exception e) {
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    public static void cleanAllTempFiles() {
        String pastaTmp = System.getProperty("java.io.tmpdir");
        File diretorio = new File(pastaTmp);
        if (diretorio.isDirectory()) {
            File[] arquivos = diretorio.listFiles();
            if (arquivos != null) {
                for (File arquivo : arquivos) {
                    if (arquivo.getName().contains("java-wkhtmltopdf-wrapper")) {
                        arquivo.delete();
                    }
                }
            }
        }
    }
}
