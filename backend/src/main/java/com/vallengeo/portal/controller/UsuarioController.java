package com.vallengeo.portal.controller;


import com.vallengeo.core.util.Constants;
import com.vallengeo.portal.payload.request.usuario.CadastroRequest;
import com.vallengeo.portal.payload.request.usuario.CadastroSimplificadoRequest;
import com.vallengeo.portal.payload.request.usuario.EsqueciMinhaSenhaRequest;
import com.vallengeo.portal.payload.request.usuario.RedefinirSenhaRequest;
import com.vallengeo.portal.payload.response.UsuarioResponse;
import com.vallengeo.portal.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

import static com.vallengeo.core.util.Constants.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1/usuario")
@Tag(name = "Usuário", description = "Operação sobre o usuário")
public class UsuarioController {
    private final UsuarioService usuarioService;

    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Listagem dos usuários cadastrados")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {@Content(mediaType = MediaType.APPLICATION_JSON_VALUE)}),
            @ApiResponse(responseCode = "401", description = UNAUTHORIZED_ERROR),
            @ApiResponse(responseCode = "403", description = FORBIDDEN_ERROR),
            @ApiResponse(responseCode = "404", description = Constants.ENTITY_NOT_FOUND_ERROR),
            @ApiResponse(responseCode = "500", description = GENERAL_ERROR)
    })
    @GetMapping(path = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<UsuarioResponse>> usuarios() {
        log.info("Listando todos os usuários cadastrados");
        return ResponseEntity.ok().body(usuarioService.buscaTodos());
    }

    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Buscar usuário cadastrado pelo identificador")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {@Content(mediaType = MediaType.APPLICATION_JSON_VALUE)}),
            @ApiResponse(responseCode = "401", description = UNAUTHORIZED_ERROR),
            @ApiResponse(responseCode = "403", description = FORBIDDEN_ERROR),
            @ApiResponse(responseCode = "404", description = Constants.ENTITY_NOT_FOUND_ERROR),
            @ApiResponse(responseCode = "500", description = GENERAL_ERROR)
    })
    @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UsuarioResponse> buscaPorId(@PathVariable UUID id) {
        log.info("Buscar pessoa cadastrada pelo identificador {}", id);
        return usuarioService.buscarPorId(id)
                .map(usuario -> ResponseEntity.ok().body(usuario))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Serviço de cadastro simplificado de usuários")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = SALVO_SUCESSO, content = {@Content(mediaType = MediaType.APPLICATION_JSON_VALUE)}),
            @ApiResponse(responseCode = "401", description = UNAUTHORIZED_ERROR),
            @ApiResponse(responseCode = "403", description = FORBIDDEN_ERROR),
            @ApiResponse(responseCode = "422", description = ENTITY_VALITATION_ERROR),
            @ApiResponse(responseCode = "500", description = GENERAL_ERROR)
    })
    @PreAuthorize("@authorizationService.hasPerfil('ADMINISTRADOR')")
    @PostMapping(path = "/simplificado", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> cadastroSimplificado(@Validated @RequestBody CadastroSimplificadoRequest input) {
        log.info("criando um novo usuário simplificado solicitacao: {}", input);
        usuarioService.cadastroSimplificado(input);
        return ResponseEntity.status(201).body(SALVO_SUCESSO);
    }

    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Serviço de cadastro de usuários")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = SALVO_SUCESSO, content = {@Content(mediaType = MediaType.APPLICATION_JSON_VALUE)}),
            @ApiResponse(responseCode = "401", description = UNAUTHORIZED_ERROR),
            @ApiResponse(responseCode = "403", description = FORBIDDEN_ERROR),
            @ApiResponse(responseCode = "422", description = ENTITY_VALITATION_ERROR),
            @ApiResponse(responseCode = "500", description = GENERAL_ERROR)
    })
    @PreAuthorize("@authorizationService.hasPerfil('ADMINISTRADOR')")
    @PostMapping(path = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> cadastro(@RequestBody @Valid CadastroRequest input) {
        log.info("criando um novo usuário solicitacao: {}", input);
        usuarioService.cadastro(input);
        return ResponseEntity.status(201).body(SALVO_SUCESSO);
    }


    @Operation(summary = "Serviço de recuperação de senha para o usuário")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = SALVO_SUCESSO, content = {@Content(mediaType = MediaType.APPLICATION_JSON_VALUE)}),
            @ApiResponse(responseCode = "401", description = UNAUTHORIZED_ERROR),
            @ApiResponse(responseCode = "403", description = FORBIDDEN_ERROR),
            @ApiResponse(responseCode = "422", description = ENTITY_VALITATION_ERROR),
            @ApiResponse(responseCode = "500", description = GENERAL_ERROR)
    })
    @PostMapping(path = "/esqueci-minha-senha")
    public ResponseEntity<String> esqueciMinhaSenha(@RequestBody @Valid EsqueciMinhaSenhaRequest request) {
        usuarioService.esqueciMinhaSenha(request);
        return ResponseEntity.status(HttpStatus.valueOf(200)).build();
    }

    @Operation(summary = "Serviço de redefinição de senha para o usuário")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = SALVO_SUCESSO, content = {@Content(mediaType = MediaType.APPLICATION_JSON_VALUE)}),
            @ApiResponse(responseCode = "401", description = UNAUTHORIZED_ERROR),
            @ApiResponse(responseCode = "403", description = FORBIDDEN_ERROR),
            @ApiResponse(responseCode = "422", description = ENTITY_VALITATION_ERROR),
            @ApiResponse(responseCode = "500", description = GENERAL_ERROR)
    })
    @PostMapping(path = "/recuperar-senha")
    public ResponseEntity<String> redefinirSenha(@RequestBody @Valid RedefinirSenhaRequest request) {
        usuarioService.redefinirSenha(request);
        return ResponseEntity.status(HttpStatus.valueOf(200)).build();
    }

    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Serviço de remoção do usuário")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = SALVO_SUCESSO, content = {@Content(mediaType = MediaType.APPLICATION_JSON_VALUE)}),
            @ApiResponse(responseCode = "401", description = UNAUTHORIZED_ERROR),
            @ApiResponse(responseCode = "403", description = FORBIDDEN_ERROR),
            @ApiResponse(responseCode = "422", description = ENTITY_VALITATION_ERROR),
            @ApiResponse(responseCode = "500", description = GENERAL_ERROR)
    })
    @PatchMapping(path = "/remover/{id}")
    public ResponseEntity<String> removerUsuario(@PathVariable UUID id) {
        usuarioService.removerUsuario(id);
        return ResponseEntity.status(HttpStatus.valueOf(200)).build();
    }
}
