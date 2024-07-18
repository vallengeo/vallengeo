package com.vallengeo.utils;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

public class AuthTestUtils {
    public static void setAuthentication(AuthenticationManager authManager, String email, String senha) {
        var authToken = new UsernamePasswordAuthenticationToken(email, senha);

        var authentication = authManager.authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    public static void cleanAuthentication() {
        SecurityContextHolder.getContext().setAuthentication(null);
    }
}
