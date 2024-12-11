package com.vallengeo.portal.controller;

import com.vallengeo.core.util.Constants;
import com.vallengeo.portal.model.Grupo;
import com.vallengeo.portal.repository.GrupoRepository;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.vallengeo.core.util.Constants.*;

@Slf4j
@RestController
@RequestMapping(path = "/api/v1/grupo")
@Tag(name = "Grupo", description = "Operação sobre o grupo")
@SecurityRequirement(name = "bearerAuth")
@RequiredArgsConstructor
public class GrupoController {

    private final GrupoRepository grupoRepository;

    @Operation(summary = "Listagem dos usuários cadastrados")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {@Content(mediaType = MediaType.APPLICATION_JSON_VALUE)}),
            @ApiResponse(responseCode = "401", description = UNAUTHORIZED_ERROR),
            @ApiResponse(responseCode = "403", description = FORBIDDEN_ERROR),
            @ApiResponse(responseCode = "404", description = Constants.ENTITY_NOT_FOUND_ERROR),
            @ApiResponse(responseCode = "500", description = GENERAL_ERROR)
    })
    @GetMapping(path = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Grupo>> grupos() {
        log.info("Listando todos os Grupos cadastrados");
        return ResponseEntity.ok().body(grupoRepository.findAll().stream().toList());

    }
}
