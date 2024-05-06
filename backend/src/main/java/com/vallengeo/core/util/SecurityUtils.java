package com.vallengeo.core.util;

import com.vallengeo.core.exceptions.custom.UnauthorizedException;
import com.vallengeo.portal.model.Usuario;
import com.vallengeo.portal.security.jwt.JwtUserResponse;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.security.Key;
import java.util.Objects;
import java.util.UUID;

@Component
@Slf4j
public final class SecurityUtils {
    private static String jwtSecret = null;

    public SecurityUtils(@Value("${api.security.token.secret}") String jwtSecret) {
        SecurityUtils.jwtSecret = jwtSecret;
    }

    public static Usuario getUserSession() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof UserDetails) {
            return (Usuario) authentication.getPrincipal();
        }
        return null;

    }

    public static JwtUserResponse getUserJwt(HttpServletRequest request) {
        return new JwtUserResponse(extractAllClaims(getJwtToken(request)));
    }


    public static String getJwtToken(HttpServletRequest request) {
        isAuthenticated();
        String authHeader = request.getHeader("Authorization");
        if (Objects.isNull(authHeader)) return null;
        return authHeader.replace("Bearer ", "");

    }

    public static boolean isAuthenticated() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication instanceof AnonymousAuthenticationToken)
            throw new UnauthorizedException();

        return true;
    }

    public static UUID extractGrupoId(HttpServletRequest request) {
        JwtUserResponse response = getUserJwt(request);
        return Objects.nonNull(response.getIdGrupo()) ? UUID.fromString(response.getIdGrupo()) : null;
    }

    public String[] urlPermitted() {
        return new String[]{
                "/#/**",
                "/swagger-ui/**",
                "/configuration/**",
                "/swagger-resources/**",
                "/docs/**",
                "/actuator",
                "/actuator/**",
                "/docs/api",
                "/v2/api-docs",
                "/webjars/**",
                "/csrf/**",
                "/favicon.ico",
                "/img/**",
                "/images/**",
                "/static/fonts/**",
                "/static/**",
                "/fonts/**",
                "/js/**",
                "/css/**",
                "/error",
                "/api/v1/autenticacao/login",
                "/api/v1/autenticacao/register",
                "/api/v1/autenticacao/logout/**",
                "/api/v1/usuario/esqueci-minha-senha",
                "/api/v1/usuario/recuperar-senha",
                "/api/v1/localidade/**",
                "/ficha",
                "/generate",
                "/gerar-pdf",
                "/gerar-pdf-2",
                "/gerar-pdf-3",
                "/gerar-pdf-4",
                "/gerar-pdf-5",
                "/gerar-pdf-6"
        };
    }

    private static String extractPrincipal(Authentication authentication) {
        if (authentication == null) {
            return null;
        } else if (authentication.getPrincipal() instanceof UserDetails springSecurityUser) {
            return springSecurityUser.getUsername();
        } else if (authentication.getPrincipal() instanceof String string) {
            return string;
        }
        return null;
    }

    public static Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private static Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }


}