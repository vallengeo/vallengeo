package com.vallengeo.cidadao.controller;

import com.vallengeo.cidadao.payload.response.DocumentoResponse;
import com.vallengeo.cidadao.payload.response.DocumentoTemporarioResponse;
import com.vallengeo.cidadao.payload.response.TipoDocumentoResponse;
import com.vallengeo.cidadao.service.DocumentoService;
import com.vallengeo.cidadao.service.TipoDocumentoService;
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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import static com.vallengeo.core.util.Constants.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1/documento")
@Tag(name = "Documento", description = "Operação referente ao documento")
@SecurityRequirement(name = "bearerAuth")
public class DocumentoController {

    private final HttpServletRequest request;
    private final DocumentoService documentoService;
    private final TipoDocumentoService tipoDocumentoService;

    @Operation(summary = "Listar os tipo de documentos obrigatórios")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok"),
            @ApiResponse(responseCode = "404", description = Constants.ENTITY_NOT_FOUND_ERROR)
    })
    @GetMapping(value = "/tipo-documento", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<TipoDocumentoResponse>> buscarTipoDocumento() {
        return ResponseEntity.ok(tipoDocumentoService.buscarTipoDocumento(request));
    }

    @Operation(summary = "Listar os tipo de documentos enviados pelo identificador do processo")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok"),
            @ApiResponse(responseCode = "404", description = Constants.ENTITY_NOT_FOUND_ERROR)
    })
    @GetMapping(value = "/tipo-documento/enviado/{idProcesso}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<TipoDocumentoResponse>> buscarTipoDocumentoEnviado(@PathVariable UUID idProcesso) {
        return ResponseEntity.ok(tipoDocumentoService.buscarTipoDocumentoEnviadoPeloProcesso(idProcesso));
    }

    @Operation(summary = "Listar os tipo de documentos não enviados pelo identificador do processo")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok"),
            @ApiResponse(responseCode = "404", description = Constants.ENTITY_NOT_FOUND_ERROR)
    })
    @GetMapping(value = "/tipo-documento/nao-enviado/{idProcesso}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<TipoDocumentoResponse>> buscarTipoDocumentoNaoEnviado(@PathVariable UUID idProcesso) {
        return ResponseEntity.ok(tipoDocumentoService.buscarTipoDocumentoNaoEnviadoPeloProcesso(idProcesso));
    }

    @Operation(summary = "Serviço de cadastro temporário de documento")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = SALVO_SUCESSO, content = {@Content(mediaType = MediaType.APPLICATION_JSON_VALUE)}),
            @ApiResponse(responseCode = "401", description = UNAUTHORIZED_ERROR),
            @ApiResponse(responseCode = "403", description = FORBIDDEN_ERROR),
            @ApiResponse(responseCode = "422", description = ENTITY_VALITATION_ERROR),
            @ApiResponse(responseCode = "500", description = GENERAL_ERROR)
    })
    @PostMapping(value = "/upload-temp/tipo-documento/{tipoDocumentoId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<DocumentoTemporarioResponse> uploadTemp(@PathVariable Long tipoDocumentoId, @RequestPart MultipartFile file) throws IOException {
        return ResponseEntity.status(201).body(documentoService.uploadTemp(tipoDocumentoId, file, request));
    }

    @Operation(summary = "Listar os documentos enviados pelo identificador do processo")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok"),
            @ApiResponse(responseCode = "404", description = Constants.ENTITY_NOT_FOUND_ERROR)
    })
    @GetMapping(value = "/enviado/{idProcesso}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<DocumentoResponse>> buscarDocumentoEnviado(@PathVariable UUID idProcesso) {
        return ResponseEntity.ok(documentoService.buscarDocumentoEnviadoPeloProcesso(idProcesso));
    }
}
