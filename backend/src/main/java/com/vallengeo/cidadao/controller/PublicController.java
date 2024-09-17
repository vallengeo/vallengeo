package com.vallengeo.cidadao.controller;

import com.vallengeo.cidadao.service.ImovelService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class PublicController {
    private final ImovelService imovelService;
    @GetMapping("/ficha-imobiliaria-html")
    public ModelAndView gerarPdfFichaImobiliaria(@RequestParam("id") UUID processoId) {
        return imovelService.fichaImovelModelAndView(processoId);
    }
}
