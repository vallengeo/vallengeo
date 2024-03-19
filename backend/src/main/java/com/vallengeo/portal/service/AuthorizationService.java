package com.vallengeo.portal.service;

import com.vallengeo.core.exceptions.custom.ForbiddenException;
import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.portal.model.Usuario;
import com.vallengeo.portal.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service("authorizationService")
public class AuthorizationService implements UserDetailsService {
    private final UsuarioRepository usuarioRepository;

    public AuthorizationService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioRepository.findByEmailAndAtivoIsTrue(username);
    }

    public boolean hasPerfil(String perfil) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return false; // Não autenticado
        }

        Usuario userDetails = (Usuario) authentication.getPrincipal();

        if (userDetails.getPerfis() == null || userDetails.getPerfis().isEmpty()) {
            return false; // Sem perfis atribuídos ao usuário
        }

        if (userDetails.getPerfis().stream().noneMatch(p -> p.getCodigo().equalsIgnoreCase(perfil))) {
             throw new ForbiddenException();
        }

        return true;
    }

}
