package com.vallengeo.portal.service;

import com.vallengeo.portal.model.Perfil;
import com.vallengeo.portal.model.Usuario;
import com.vallengeo.portal.repository.UsuarioRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Optional;

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

       Usuario userDetails = (Usuario) authentication.getPrincipal();

      return authentication.isAuthenticated() && userDetails.getPerfis().stream().anyMatch(p -> p.getCodigo().contains(perfil));


    }
}
