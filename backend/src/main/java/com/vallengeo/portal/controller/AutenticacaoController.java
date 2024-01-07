package com.vallengeo.portal.controller;

import com.vallengeo.portal.payload.request.autenticacao.LoginRequest;
import com.vallengeo.portal.payload.request.autenticacao.LogoutRequest;
import com.vallengeo.portal.payload.request.autenticacao.TokenRefreshRequest;
import com.vallengeo.portal.payload.response.LoginResponse;
import com.vallengeo.portal.security.jwt.JwtService;
import com.vallengeo.portal.service.AuthenticationService;
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
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import static com.vallengeo.core.util.Constants.*;

@Slf4j
@RestController
@RequestMapping(path = "/api/v1/autenticacao")
@Tag(name = "Autenticação", description = "Operação referente a segurança")
@RequiredArgsConstructor
public class AutenticacaoController {
    private final AuthenticationService authenticationService;
    private final JwtService jwtService;

    @Operation(summary = "Serviço de login para usuários do sistema.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {@Content(mediaType = MediaType.APPLICATION_JSON_VALUE)}),
            @ApiResponse(responseCode = "500", description = GENERAL_ERROR)
    })
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody @Validated LoginRequest input) {
        UserDetails authenticatedUser = authenticationService.authenticate(input);
        LoginResponse loginResponse = jwtService.generateLogin(authenticatedUser);
        return ResponseEntity.ok(loginResponse);
    }

    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Serviço de renovação de acesso para usuários do sistema.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {@Content(mediaType = MediaType.APPLICATION_JSON_VALUE)}),
            @ApiResponse(responseCode = "401", description = UNAUTHORIZED_ERROR),
            @ApiResponse(responseCode = "403", description = FORBIDDEN_ERROR),
            @ApiResponse(responseCode = "500", description = GENERAL_ERROR)
    })
    @PostMapping("/refresh-token")
    public ResponseEntity<LoginResponse> refreshToken(@Valid @RequestBody TokenRefreshRequest request, HttpServletRequest http) {
        String requestRefreshToken = request.refreshToken();
        LoginResponse loginResponse = jwtService.generateLogin(requestRefreshToken, http);
        return ResponseEntity.ok(loginResponse);
    }

    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Serviço de logout para usuários do sistema.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {@Content(mediaType = MediaType.APPLICATION_JSON_VALUE)}),
            @ApiResponse(responseCode = "500", description = GENERAL_ERROR)
    })
    @PostMapping("/logout")
    public void logout(@RequestBody @Validated LogoutRequest request) {
        jwtService.revokeToken(request.token().replace("Bearer ", ""));
    }
}
