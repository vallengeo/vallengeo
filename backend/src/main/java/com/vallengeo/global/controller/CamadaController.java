package com.vallengeo.global.controller;

import com.vallengeo.core.util.Constants;
import com.vallengeo.global.payload.response.CamadaResponse;
import com.vallengeo.global.payload.response.localidade.MunicipioResponse;
import com.vallengeo.global.service.CamadaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1/camada")
@Tag(name = "Camada", description = "Operação de consulta referente as camadas")
public class CamadaController {
    private final HttpServletRequest request;
    private final CamadaService camadaService;

    @Operation(summary = "Listar todas as camadas pertencentes ao grupo")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok"),
            @ApiResponse(responseCode = "404", description = Constants.ENTITY_NOT_FOUND_ERROR)
    })
    @GetMapping(value = "/grupo/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<CamadaResponse>> buscarCamadasPeloGrupoId(@PathVariable UUID id) {
        return ResponseEntity.ok(camadaService.buscarTodasPeloGrupo(id));
    }
}
