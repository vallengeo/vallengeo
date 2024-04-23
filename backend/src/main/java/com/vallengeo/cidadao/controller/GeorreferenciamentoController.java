package com.vallengeo.cidadao.controller;

import com.vallengeo.cidadao.payload.response.GeometriaPorAquivoResponse;
import com.vallengeo.cidadao.service.GeorreferenciamentoService;
import com.vallengeo.core.util.Constants;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

import static com.vallengeo.core.util.Constants.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1/georreferenciamento")
@Tag(name = "Documento", description = "Operação referente ao georreferenciamento")
@SecurityRequirement(name = "bearerAuth")
public class GeorreferenciamentoController {
private final HttpServletRequest request;
    private final GeorreferenciamentoService georreferenciamentoService;

    @Operation(summary = "Buscar geometria pelo arquivo")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok"),
            @ApiResponse(responseCode = "403", description = FORBIDDEN_ERROR),
            @ApiResponse(responseCode = "404", description = Constants.ENTITY_NOT_FOUND_ERROR),
            @ApiResponse(responseCode = "422", description = ENTITY_VALITATION_ERROR),
            @ApiResponse(responseCode = "500", description = GENERAL_ERROR)
    })
    @PreAuthorize("hasRole('IMOVEL_CADASTRAR')")
    @PostMapping(value = "/obter-geometria", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GeometriaPorAquivoResponse> buscarGeometriaPorShapeFile(@RequestPart MultipartFile file) {
        log.info("Buscando geometria(s) por arquivo");
        var response = georreferenciamentoService.obterGeometriaPorShapeFile(file, request);
        return ResponseEntity.ok().body(response);
    }
}
