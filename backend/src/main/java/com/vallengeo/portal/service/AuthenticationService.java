package com.vallengeo.portal.service;

import com.vallengeo.core.exceptions.custom.UnauthorizedException;
import com.vallengeo.portal.model.Usuario;
import com.vallengeo.portal.payload.request.autenticacao.LoginRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final AuthenticationManager authenticationManager;
    private final AuthorizationService authorizationService;

    public UserDetails authenticate(LoginRequest input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.email(),
                        input.senha()
                )
        );

        UserDetails userDetails = authorizationService.loadUserByUsername(input.email());
        if (userDetails instanceof Usuario usuario && (usuario.getGrupos().stream().anyMatch(grupo -> grupo.getMunicipio().getId().equals(input.idMunicipio())))) {
                return userDetails;

        }

        throw new UnauthorizedException("Usuário não vinculado a prefeitura informada!");
    }
}
