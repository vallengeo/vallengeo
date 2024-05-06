package com.vallengeo.cidadao.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1/georreferenciamento")
@Tag(name = "Georreferenciamento", description = "Operação referente ao georreferenciamento")
@SecurityRequirement(name = "bearerAuth")
public class GeorreferenciamentoController {
}
