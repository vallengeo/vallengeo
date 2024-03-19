package com.vallengeo.cidadao.controller;

import com.vallengeo.cidadao.payload.response.TipoDocumentoResponse;
import com.vallengeo.cidadao.payload.response.TipoUsoResponse;
import com.vallengeo.cidadao.service.TipoUsoService;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1/tipo-uso")
@Tag(name = "Tipo de Uso", description = "Operação referente ao tipo de uso")
@SecurityRequirement(name = "bearerAuth")
public class TipoUsoController {
private final TipoUsoService tipoUsoService;

   @Operation(summary = "Listar os tipo de usos ativos")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok"),
            @ApiResponse(responseCode = "404", description = Constants.ENTITY_NOT_FOUND_ERROR)
    })
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<TipoUsoResponse>> buscarTipoUso() {
        return ResponseEntity.ok(tipoUsoService.buscarTodosAtivos());
    }

}
