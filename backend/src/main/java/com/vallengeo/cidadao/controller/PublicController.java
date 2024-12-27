package com.vallengeo.cidadao.controller;

import com.vallengeo.cidadao.payload.request.RelatorioRequest;
import com.vallengeo.cidadao.service.ImovelService;
import com.vallengeo.cidadao.service.ProcessoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class PublicController {
    private final ImovelService imovelService;
    private final ProcessoService processoService;
    @GetMapping("/ficha-imobiliaria-html")
    public ModelAndView gerarPdfFichaImobiliaria(@RequestParam("id") UUID processoId) {
        return imovelService.fichaImovelModelAndView(processoId);
    }

    @GetMapping("/relatorio-html")
    public ModelAndView gerarPdfRelatorio(
            @RequestParam(required = false) String idProcesso,
            @RequestParam(required = true) String idGrupo,
            @RequestParam(required = false) List<Long> status,
            @RequestParam(required = false) String data
    ) {
      return processoService.relatorioModelAndView(idProcesso,idGrupo, status, data);
    }
}
