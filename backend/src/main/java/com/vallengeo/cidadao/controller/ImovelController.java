package com.vallengeo.cidadao.controller;

import com.vallengeo.cidadao.payload.request.ProcessoImovelRequest;
import com.vallengeo.cidadao.payload.response.GeometriaPorAquivoResponse;
import com.vallengeo.cidadao.payload.response.TipoUsoResponse;
import com.vallengeo.cidadao.payload.response.cadastro.ProcessoResponse;
import com.vallengeo.cidadao.service.GeorreferenciamentoService;
import com.vallengeo.cidadao.service.ImovelService;
import com.vallengeo.cidadao.service.TipoUsoService;
import com.vallengeo.core.util.Constants;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

import static com.vallengeo.core.util.Constants.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1/imovel")
@Tag(name = "Imóvel", description = "Operação referente ao imóvel")
@SecurityRequirement(name = "bearerAuth")
public class ImovelController {
    private final HttpServletRequest request;
    private final GeorreferenciamentoService georreferenciamentoService;
    private final ImovelService imovelService;
    private final TipoUsoService tipoUsoService;

    @Operation(summary = "Listar os tipo de usos ativos")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok"),
            @ApiResponse(responseCode = "404", description = Constants.ENTITY_NOT_FOUND_ERROR)
    })
    @GetMapping(value = "/tipo-uso", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<TipoUsoResponse>> buscarTipoUso() {
        return ResponseEntity.ok(tipoUsoService.buscarTodosAtivos());
    }

    @Operation(summary = "Buscar geometria pelo arquivo")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok"),
            @ApiResponse(responseCode = "403", description = FORBIDDEN_ERROR),
            @ApiResponse(responseCode = "404", description = Constants.ENTITY_NOT_FOUND_ERROR),
            @ApiResponse(responseCode = "422", description = ENTITY_VALITATION_ERROR),
            @ApiResponse(responseCode = "500", description = GENERAL_ERROR)
    })
    @PreAuthorize("hasRole('IMOVEL_CADASTRAR')")
    @PostMapping(value = "/georreferenciamento/obter-geometria-por-arquivo", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GeometriaPorAquivoResponse> buscarGeometriaPorShapeFile(@RequestPart MultipartFile file) {
        log.info("Buscando geometria(s) por arquivo");
        var response = georreferenciamentoService.obterGeometriaPorShapeFile(file, request);
        return ResponseEntity.ok().body(response);
    }

    @Operation(summary = "Serviço de cadastro do imóvel")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = SALVO_SUCESSO, content = {@Content(mediaType = MediaType.APPLICATION_JSON_VALUE)}),
            @ApiResponse(responseCode = "401", description = UNAUTHORIZED_ERROR),
            @ApiResponse(responseCode = "403", description = FORBIDDEN_ERROR),
            @ApiResponse(responseCode = "422", description = ENTITY_VALITATION_ERROR),
            @ApiResponse(responseCode = "500", description = GENERAL_ERROR)
    })
    @PreAuthorize("hasRole('IMOVEL_CADASTRAR')")
    @PostMapping("/cadastro")
    public ResponseEntity<ProcessoResponse> cadastrarImovel(@Validated @RequestBody ProcessoImovelRequest input) {
        log.info("cadastrando imovel");
        return ResponseEntity.status(201).body(imovelService.cadastrar(input));
    }
}
