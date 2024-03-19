package com.vallengeo.cidadao.controller;

import com.vallengeo.cidadao.payload.request.ProcessoDocumentoRequest;
import com.vallengeo.cidadao.payload.request.ProcessoImovelRequest;
import com.vallengeo.cidadao.payload.request.ProcessoRepresentanteRequest;
import com.vallengeo.cidadao.payload.request.imovel.ImovelRequest;
import com.vallengeo.cidadao.payload.response.cadastro.ProcessoResponse;
import com.vallengeo.cidadao.payload.response.cadastro.imovel.ImovelResponse;
import com.vallengeo.cidadao.service.ImovelService;
import com.vallengeo.cidadao.service.ProcessoService;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.vallengeo.core.util.Constants.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1/processo")
@Tag(name = "Processo", description = "Operação referente ao processo")
@SecurityRequirement(name = "bearerAuth")
public class ProcessoController {
    private final ProcessoService processoService;
    private final ImovelService imovelService;

// TODO: verificar necessidade e remover
//    @Operation(summary = "Serviço de cadastro do(s) representante(s)")
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "201", description = SALVO_SUCESSO, content = {@Content(mediaType = MediaType.APPLICATION_JSON_VALUE)}),
//            @ApiResponse(responseCode = "401", description = UNAUTHORIZED_ERROR),
//            @ApiResponse(responseCode = "403", description = FORBIDDEN_ERROR),
//            @ApiResponse(responseCode = "422", description = ENTITY_VALITATION_ERROR),
//            @ApiResponse(responseCode = "500", description = GENERAL_ERROR)
//    })
//    @PreAuthorize("hasRole('IMOVEL_CADASTRAR')")
//    @PostMapping("/cadastro/representante")
//    public ResponseEntity<ProcessoResponse> cadastrarRepresentante(@Validated @RequestBody ProcessoRepresentanteRequest input) {
//        log.info("cadastrando representante(s) do processo {}", input);
//        return ResponseEntity.status(201).body(processoService.cadastrar(input));
//    }

@Operation(summary = "Serviço de cadastro do imóvel")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = SALVO_SUCESSO, content = {@Content(mediaType = MediaType.APPLICATION_JSON_VALUE)}),
            @ApiResponse(responseCode = "401", description = UNAUTHORIZED_ERROR),
            @ApiResponse(responseCode = "403", description = FORBIDDEN_ERROR),
            @ApiResponse(responseCode = "422", description = ENTITY_VALITATION_ERROR),
            @ApiResponse(responseCode = "500", description = GENERAL_ERROR)
    })
    @PreAuthorize("hasRole('IMOVEL_CADASTRAR')")
    @PostMapping("/cadastro/imovel")
    public ResponseEntity<ImovelResponse> cadastrarImovel(@Validated @RequestBody ProcessoImovelRequest input) {
        log.info("cadastrando imovel do processo {}", input);
        return ResponseEntity.status(201).body(imovelService.cadastrar(input));
    }

    @Operation(summary = "Serviço de cadastro dos documentos")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = SALVO_SUCESSO, content = {@Content(mediaType = MediaType.APPLICATION_JSON_VALUE)}),
            @ApiResponse(responseCode = "401", description = UNAUTHORIZED_ERROR),
            @ApiResponse(responseCode = "403", description = FORBIDDEN_ERROR),
            @ApiResponse(responseCode = "422", description = ENTITY_VALITATION_ERROR),
            @ApiResponse(responseCode = "500", description = GENERAL_ERROR)
    })
    @PreAuthorize("hasRole('IMOVEL_CADASTRAR')")
    @PostMapping("/cadastro/documento")
    public ResponseEntity<String> cadastrarDocumentos(@Validated @RequestBody ProcessoDocumentoRequest input) {
        log.info("cadastrando documentos do processo {}", input.getIdProcesso());
        processoService.cadastrarDocumento(input);
        return ResponseEntity.status(201).body(SALVO_SUCESSO);
    }
}