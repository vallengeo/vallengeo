package com.vallengeo.cidadao.controller;

import com.github.jhonnymertz.wkhtmltopdf.wrapper.Pdf;
import com.vallengeo.cidadao.payload.response.FichaImovelResponse;
import com.vallengeo.cidadao.service.ImovelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

import static com.vallengeo.core.config.Config.APPLICATION_DEFINITIVE_UPLOAD;

@Controller
@RequiredArgsConstructor
public class testeController {

    private final ImovelService imovelService;

    @GetMapping(value = "/ficha", produces = MediaType.APPLICATION_JSON_VALUE)
    public ModelAndView newFile() {
        FichaImovelResponse ficha = imovelService.fichaImovel(UUID.fromString("1ff01430-98c3-4002-9427-ba50632ebd22"));

        ModelAndView modelAndView = new ModelAndView();

        /* visao geral */
        modelAndView.addObject("protocolo", ficha.getProcesso().getProtocolo());
        modelAndView.addObject("inscricaoImobiliaria", ficha.getInscricaoImobiliaria());
        modelAndView.addObject("ultimaAtualizacao", ficha.getProcesso().getUltimaAtualizacaoFormatada());
        modelAndView.addObject("situacao", ficha.getProcesso().getSituacao());

        /* representantes */
        modelAndView.addObject("representantes", ficha.getRepresentantes());

        /* caracterização */
        modelAndView.addObject("caracterizacaoImovel", ficha.getCaracterizacaoImovel());

        modelAndView.setViewName("ficha/main");
        return modelAndView;
    }

    @GetMapping("/gerar-pdf")
    public void gerarPdf(HttpServletResponse response) throws Exception {
        try {
            String outputFile = APPLICATION_DEFINITIVE_UPLOAD + File.separator + LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));
            String pdflFilePath = outputFile + File.separator + "arquivo5.pdf";
            // String html = parseThymeleafTemplate();

            Pdf pdf = new Pdf();
            //pdf.addPageFromString(html);
            pdf.addPageFromUrl("http://localhost:9000/ficha");
            pdf.saveAs(pdflFilePath);

            byte[] fileBytes = Files.readAllBytes(Paths.get(pdflFilePath));

            try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
                outputStream.write(fileBytes);
                response.setContentType("application/pdf");
                response.setHeader("Content-Disposition", "inline; filename=sample.pdf");
                response.setContentLength(outputStream.size());
                response.getOutputStream().write(outputStream.toByteArray());
                response.getOutputStream().flush();
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

