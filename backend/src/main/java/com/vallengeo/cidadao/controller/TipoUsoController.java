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
@RequestMapping(path = "/api/v1/tipo-uso")
@Tag(name = "Tipo de Uso", description = "Operação referente ao tipo de uso")
@SecurityRequirement(name = "bearerAuth")
public class TipoUsoController {
}
