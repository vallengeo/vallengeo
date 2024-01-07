package com.vallengeo.portal.security.handlers;

import com.google.common.base.Throwables;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest req, HttpServletResponse res, AuthenticationException ex) {
        log.error("URL: "+ req.getRequestURL().toString() +" "+ Throwables.getStackTraceAsString(ex));
        throw new AccessDeniedException(ex.getMessage());
    }
}
