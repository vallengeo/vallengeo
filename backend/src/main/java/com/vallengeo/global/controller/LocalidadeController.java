package com.vallengeo.global.controller;

import com.vallengeo.core.util.Constants;
import com.vallengeo.global.payload.response.EnderecoViaCepResponse;
import com.vallengeo.global.payload.response.localidade.EstadoResponse;
import com.vallengeo.global.payload.response.localidade.MunicipioResponse;
import com.vallengeo.global.service.LocalidadeService;
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

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1/localidade")
@Tag(name = "Localidade", description = "Operação de consulta referente a localidade")
public class LocalidadeController {
    private final LocalidadeService localidadeService;

    @Operation(summary = "Buscar endereço via CEP")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok"),
            @ApiResponse(responseCode = "404", description = Constants.ENTITY_NOT_FOUND_ERROR)
    })
    @GetMapping(value = "cep/{cep}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<EnderecoViaCepResponse> buscarEnderecoPorCep(@PathVariable String cep) {
        return ResponseEntity.ok(localidadeService.buscarViaCep(cep));
    }

    @Operation(summary = "Listar os estados existentes")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok"),
            @ApiResponse(responseCode = "404", description = Constants.ENTITY_NOT_FOUND_ERROR)
    })
    @GetMapping(value = "/estado", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<EstadoResponse>> buscarTodosEstados() {
        return ResponseEntity.ok(localidadeService.buscarTodosEstados());
    }

    @Operation(summary = "Buscar estado por UF")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok"),
            @ApiResponse(responseCode = "404", description = Constants.ENTITY_NOT_FOUND_ERROR)
    })
    @GetMapping(value = "/estado/{uf:.*\\D.*}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<EstadoResponse> buscarEstadoPorUf(@PathVariable(name = "uf") String uf) {
        return ResponseEntity.ok(localidadeService.buscarEstadoPorUf(uf));
    }

    @Operation(summary = "Buscar estado pelo identificador")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok"),
            @ApiResponse(responseCode = "404", description = Constants.ENTITY_NOT_FOUND_ERROR)
    })
    @GetMapping(value = "/estado/{id:\\d+}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<EstadoResponse> buscarEstadoPorId(@PathVariable(name = "id") int id) {
        return ResponseEntity.ok(localidadeService.buscarEstadoPorId(id));
    }

    @Operation(summary = "Listar os municípios pelo identificador do estado")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok"),
            @ApiResponse(responseCode = "404", description = Constants.ENTITY_NOT_FOUND_ERROR)
    })
    @GetMapping(value = "/estado/{id}/municipio", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<MunicipioResponse>> buscarMunicipiosPeloEstadoId(@PathVariable int id) {
        return ResponseEntity.ok(localidadeService.buscarMunicipiosPeloEstadoId(id));
    }

    @Operation(summary = "Listar os municípios pelo identificador")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok"),
            @ApiResponse(responseCode = "404", description = Constants.ENTITY_NOT_FOUND_ERROR)
    })
    @GetMapping(value = "/municipio/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<MunicipioResponse> buscarMunicipiosPeloId(@PathVariable int id) {
        return ResponseEntity.ok(localidadeService.buscarMunicipiosPeloId(id));
    }

}
