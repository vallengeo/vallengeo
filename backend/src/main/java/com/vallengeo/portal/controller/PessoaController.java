package com.vallengeo.portal.controller;

import com.vallengeo.core.util.Constants;
import com.vallengeo.portal.payload.request.pessoa.PessoaRequest;
import com.vallengeo.portal.payload.response.PessoaResponse;
import com.vallengeo.portal.service.PessoaService;
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
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import static com.vallengeo.core.util.Constants.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1/pessoa")
@Tag(name = "Pessoa", description = "Operação referente a pessoa")
@SecurityRequirement(name = "bearerAuth")
public class PessoaController {
    private final PessoaService pessoaService;

    @Operation(summary = "Listagem das pessoas cadastradas")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {@Content(mediaType = MediaType.APPLICATION_JSON_VALUE)}),
            @ApiResponse(responseCode = "401", description = UNAUTHORIZED_ERROR),
            @ApiResponse(responseCode = "403", description = FORBIDDEN_ERROR),
            @ApiResponse(responseCode = "404", description = Constants.ENTITY_NOT_FOUND_ERROR),
            @ApiResponse(responseCode = "500", description = GENERAL_ERROR)
    })
    @GetMapping(path = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<PessoaResponse>> buscarTodas() {
        log.info("Listando todas as pessoas cadastradas");
        return ResponseEntity.ok().body(pessoaService.buscarTodas());
    }

    @Operation(summary = "Buscar pessoa cadastrada pelo documento")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {@Content(mediaType = MediaType.APPLICATION_JSON_VALUE)}),
            @ApiResponse(responseCode = "401", description = UNAUTHORIZED_ERROR),
            @ApiResponse(responseCode = "403", description = FORBIDDEN_ERROR),
            @ApiResponse(responseCode = "404", description = Constants.ENTITY_NOT_FOUND_ERROR),
            @ApiResponse(responseCode = "500", description = GENERAL_ERROR)
    })
    @GetMapping(path = "/buscar-por-documento", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PessoaResponse> buscaPorDocumento(@RequestParam String documento) {
        log.info("Buscar pessoa cadastrada pelo documento {}", documento);
        return pessoaService.buscarPorDocumento(documento)
                .map(pessoa -> ResponseEntity.ok().body(pessoa))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Operation(summary = "Buscar pessoa cadastrada pelo identificador")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {@Content(mediaType = MediaType.APPLICATION_JSON_VALUE)}),
            @ApiResponse(responseCode = "401", description = UNAUTHORIZED_ERROR),
            @ApiResponse(responseCode = "403", description = FORBIDDEN_ERROR),
            @ApiResponse(responseCode = "404", description = Constants.ENTITY_NOT_FOUND_ERROR),
            @ApiResponse(responseCode = "500", description = GENERAL_ERROR)
    })
    @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PessoaResponse> buscaPorId(@PathVariable UUID id) {
        log.info("Buscar pessoa cadastrada pelo identificador {}", id);
        return pessoaService.buscarPorId(id)
                .map(pessoa -> ResponseEntity.ok().body(pessoa))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Operation(summary = "Serviço de cadastro de pessoa")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = SALVO_SUCESSO, content = {@Content(mediaType = MediaType.APPLICATION_JSON_VALUE)}),
            @ApiResponse(responseCode = "401", description = UNAUTHORIZED_ERROR),
            @ApiResponse(responseCode = "403", description = FORBIDDEN_ERROR),
            @ApiResponse(responseCode = "422", description = ENTITY_VALITATION_ERROR),
            @ApiResponse(responseCode = "500", description = GENERAL_ERROR)
    })
    @PostMapping
    public ResponseEntity<PessoaResponse> cadastrar(@Validated @RequestBody PessoaRequest input) {
        log.info("criando uma nova pessoa: {}", input);
        return ResponseEntity.status(201).body(pessoaService.cadastrar(input));
    }

    @Operation(summary = "Serviço de edição de pessoa")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = ALTERADO_SUCESSO, content = {@Content(mediaType = MediaType.APPLICATION_JSON_VALUE)}),
            @ApiResponse(responseCode = "401", description = UNAUTHORIZED_ERROR),
            @ApiResponse(responseCode = "403", description = FORBIDDEN_ERROR),
            @ApiResponse(responseCode = "422", description = ENTITY_VALITATION_ERROR),
            @ApiResponse(responseCode = "500", description = GENERAL_ERROR)
    })
    @PutMapping("/{id}")
    public ResponseEntity<PessoaResponse> editar(@Validated @RequestBody PessoaRequest input, @PathVariable UUID id) {
        log.info("editar pessoa com id: {}", id);
        return ResponseEntity.status(201).body(pessoaService.editar(id, input));
    }
}
