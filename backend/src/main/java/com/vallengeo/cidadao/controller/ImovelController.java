package com.vallengeo.cidadao.controller;

import com.vallengeo.cidadao.payload.request.ProcessoImovelRequest;
import com.vallengeo.cidadao.payload.response.FichaImovelResponse;
import com.vallengeo.cidadao.payload.response.GeometriaPorAquivoResponse;
import com.vallengeo.cidadao.payload.response.ProcessoListagemSimplificadoResponse;
import com.vallengeo.cidadao.payload.response.TipoUsoResponse;
import com.vallengeo.cidadao.payload.response.cadastro.ProcessoResponse;
import com.vallengeo.cidadao.service.GeorreferenciamentoService;
import com.vallengeo.cidadao.service.ImovelService;
import com.vallengeo.cidadao.service.ProcessoService;
import com.vallengeo.cidadao.service.TipoUsoService;
import com.vallengeo.core.util.Constants;
import com.vallengeo.core.util.Paginacao;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import static com.vallengeo.core.helpers.DateHelpers.convertDateToLocalDateTime;
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
    private final ProcessoService processoService;

    @Operation(summary = "Listar os tipo de usos ativos")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok"),
            @ApiResponse(responseCode = "404", description = Constants.ENTITY_NOT_FOUND_ERROR)
    })
    @GetMapping(value = "/tipo-uso", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<TipoUsoResponse>> buscarTipoUso() {
        return ResponseEntity.ok(tipoUsoService.buscarTodosAtivos());
    }

    @Operation(summary = "Listagem dos imóveis cadastrados")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok"),
            @ApiResponse(responseCode = "404", description = Constants.ENTITY_NOT_FOUND_ERROR)
    })
    @GetMapping(value = "/cadastrados", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Paginacao.PaginacaoOutput<ProcessoListagemSimplificadoResponse>> buscarTodosCadastrados(@RequestParam(required = false) String pesquisa,
                                                                                                                  @RequestParam(value = "pagina") int pagina,
                                                                                                                  @RequestParam(value = "itens-por-pagina") int itensPorPagina,
                                                                                                                  @RequestParam(value = "direcao", required = false) String direcao,
                                                                                                                  @RequestParam(value = "ordenar-por", required = false) String ordenarPor) {
        return ResponseEntity.ok(imovelService.buscarTodosCadastrados(pesquisa,
                new Paginacao.PaginacaoInput(pagina, itensPorPagina, ordenarPor, direcao),
                request));
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
    @PostMapping(value = "/obter-geometria-por-arquivo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GeometriaPorAquivoResponse> buscarGeometriaPorShapeFile(@RequestPart MultipartFile file) {
        log.info("Buscando geometria(s) por arquivo");
        var response = georreferenciamentoService.obterGeometriaPorShapeFile(file, request);
        return ResponseEntity.ok().body(response);
    }

    @PreAuthorize("hasRole('IMOVEL_LISTA_IMOVEL_VISUALIZAR')")
    @Operation(summary = "Informações referente a ficha imobiliária pelo identificador do processo.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok"),
            @ApiResponse(responseCode = "404", description = Constants.ENTITY_NOT_FOUND_ERROR)
    })
    @GetMapping(value = "/ficha/{processoId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FichaImovelResponse> fichaImovelPeloProcessoId(@PathVariable UUID processoId) {
        return ResponseEntity.ok(imovelService.fichaImovel(processoId));
    }

    @Operation(summary = "Serviço de download ficha imobiliária pelo identificador do processo.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok"),
            @ApiResponse(responseCode = "404", description = Constants.ENTITY_NOT_FOUND_ERROR)
    })
    @GetMapping(value = "/ficha/{processoId}/download", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Resource> baixarFichaImovelPeloProcessoId(@PathVariable UUID processoId) {
        String nomeArquivo = processoId.toString() + "_" + convertDateToLocalDateTime(new Date()).format(DateTimeFormatter.ofPattern("yyyyMMddHHmm"));
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("application/pdf"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + nomeArquivo + ".pdf")
                .header("X-FILE-ID", processoId.toString())
                .body(imovelService.fichaImovelImprimir(processoId, request));
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

    @Operation(summary = "Serviço de edição do imóvel")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = SALVO_SUCESSO, content = {@Content(mediaType = MediaType.APPLICATION_JSON_VALUE)}),
            @ApiResponse(responseCode = "401", description = UNAUTHORIZED_ERROR),
            @ApiResponse(responseCode = "403", description = FORBIDDEN_ERROR),
            @ApiResponse(responseCode = "422", description = ENTITY_VALITATION_ERROR),
            @ApiResponse(responseCode = "500", description = GENERAL_ERROR)
    })
    @PreAuthorize("hasRole('IMOVEL_CADASTRAR')")
    @PutMapping("/editar/{processoId}")
    public ResponseEntity<ProcessoResponse> editarImovel(@PathVariable UUID processoId, @Validated @RequestBody ProcessoImovelRequest input) {
        log.info("editando imovel");
        ProcessoResponse response = imovelService.editar(processoId, input);
        processoService.validacaoPosCadastrarDocumento(processoId);
        return ResponseEntity.status(200).body(response);
    }
}
