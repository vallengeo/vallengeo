package com.vallengeo.cidadao.controller;

import com.vallengeo.cidadao.payload.response.FichaImovelResponse;
import com.vallengeo.cidadao.service.ImovelService;
import com.vallengeo.global.payload.request.wkhtml.ParamsHtmlRequest;
import com.vallengeo.global.payload.request.wkhtml.ParamsRequest;
import com.vallengeo.global.payload.response.ExportarOutput;
import com.vallengeo.global.service.WkhtmlService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.geotools.geojson.geom.GeometryJSON;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;
import org.thymeleaf.ITemplateEngine;
import org.thymeleaf.context.Context;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.util.LinkedHashMap;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
public class testeController {

    private final ImovelService imovelService;
    private final WkhtmlService wkhtmlService;
    private final ITemplateEngine templateEngine;

    @GetMapping(value = "/ficha/v2", produces = MediaType.APPLICATION_JSON_VALUE)
    public ModelAndView newFile(@Param("id") String id) {
        FichaImovelResponse ficha = imovelService.fichaImovel(UUID.fromString(id));

        ModelAndView modelAndView = new ModelAndView();

        /* visao geral */
        modelAndView.addObject("protocolo", ficha.getProcesso().getProtocolo());
        modelAndView.addObject("inscricaoImobiliaria", ficha.getInscricaoImobiliaria());
        modelAndView.addObject("ultimaAtualizacao", ficha.getProcesso().getUltimaAtualizacaoFormatada());
        modelAndView.addObject("situacao", ficha.getProcesso().getSituacao());

        /* geometria */
        modelAndView.addObject("geometria", new GeometryJSON(15).toString(ficha.getGeometria()));

        /* representantes */
        modelAndView.addObject("representantes", ficha.getRepresentantes());

        /* caracterização */
        modelAndView.addObject("caracterizacaoImovel", ficha.getCaracterizacaoImovel());

        modelAndView.setViewName("ficha/main");
        return modelAndView;
    }

    @GetMapping("/gerar-pdf")
    public ResponseEntity<ByteArrayResource> gerarPdf(HttpServletResponse response) throws Exception {
        try {

            ParamsRequest data = prepararParametrosPDF();
            byte[] pdfBytes = wkhtmlService.pdf(data);

            ExportarOutput exportarAnaliseOutput = new ExportarOutput();
            exportarAnaliseOutput.setResource(pdfBytes);
            exportarAnaliseOutput.setFilename("1_pdf_.pdf");
            exportarAnaliseOutput.setByteArrayResource(new ByteArrayResource(pdfBytes));

            return ResponseEntity.ok()
                    .contentLength(exportarAnaliseOutput.getResource().length)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + exportarAnaliseOutput.getFilename())
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(exportarAnaliseOutput.getByteArrayResource());

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    private ParamsRequest prepararParametrosPDF() {
        String footer = getHtmlFooter();
        String footerDir = "/tmp/" + System.currentTimeMillis();
        String footerPath = footerDir + "/footer.html";
        String header = getHtmlHeader();
        String headerDir = "/tmp/header";
        String headerPath = headerDir + "/titulo.html";

        ParamsHtmlRequest paramsHtmlDTOFooter = ParamsHtmlRequest.builder()
                .html(footer)
                .path(footerDir)
                .type("/footer.html")
                .build();

        ParamsHtmlRequest paramsHtmlDTOHeader = ParamsHtmlRequest.builder()
                .html(header)
                .path(headerDir)
                .type("/titulo.html")
                .build();

        wkhtmlService.saveHtml(paramsHtmlDTOFooter);
        wkhtmlService.saveHtml(paramsHtmlDTOHeader);

        LinkedHashMap<String, Object> options = new LinkedHashMap<>();
        options.put("--orientation", "Portrait");
        options.put("--footer-spacing", 10);
        options.put("--footer-html", footerPath);
        options.put("--header-html", headerPath);
        options.put("--cache-dir", "/tmp/");
        options.put("--run-script", "window.setInterval(function(){finalizarPdf();},70000);");
        ParamsRequest request = new ParamsRequest();
        request.setUrl("http://localhost:9000/ficha/v2");
        request.setOptions(options);

        return request;

    }

    public String getHtmlFooter() {
        String logoFooter = "data:image/png;base64," + convertImageToBase64();

        Context context = new Context();
        context.setVariable("logoFooter", logoFooter);
        return templateEngine.process("ficha/footer.html", context);
    }

    public String getHtmlHeader() {
        return "<!DOCTYPE html>" +
               "<html lang=\"en\">" +
               "<head>" +
               "    <meta charset=\"UTF-8\">" +
               "    <title>Title</title>" +
               "  <style>\n" +
               "    .header {" +
               "      width: 100%;" +
               "      height: 40px;" +
               "    }" +
               "  </style>" +
               "</head>" +
               "<body>" +
               "  <div class=\"header\">" +
               "  </div>" +
               "</body>" +
               "</html>";
    }

    private static String convertImageToBase64() {
        // Carrega a imagem do classpath
        ClassPathResource imgFile = new ClassPathResource("/static/images/brasao.png");

        // Lê a imagem como um array de bytes
        try (InputStream inputStream = imgFile.getInputStream()) {
            byte[] imageBytes = IOUtils.toByteArray(inputStream);

            // Converte o array de bytes para Base64
            return Base64Utils.encodeToString(imageBytes);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}

