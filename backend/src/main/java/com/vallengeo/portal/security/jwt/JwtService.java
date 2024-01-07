package com.vallengeo.portal.security.jwt;

import com.vallengeo.core.exceptions.custom.UnauthorizedException;
import com.vallengeo.portal.payload.response.LoginResponse;
import com.vallengeo.portal.service.AuthorizationService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.security.Key;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtService {
    @Value("${api.security.token.secret}")
    private String jwtSecret;
    @Value("${api.security.token.expiration}")
    private long jwtExpiration;
    @Value("${api.security.token.refresh}")
    private long jwtRefreshExpiration;

    @Value("${api.security.token.algorithm}")
    private String jwtAlgorithm;

    private final Set<String> revokedTokens = ConcurrentHashMap.newKeySet();

    private final AuthorizationService authorizationService;

    public LoginResponse generateLogin(UserDetails userDetails) {
        String token = generateToken(userDetails);
        return new LoginResponse(token, generateRefreshToken(token), getExpirationTime());
    }

    public LoginResponse generateLogin(String requestRefreshToken, HttpServletRequest http) {
        UserDetails userDetails = authorizationService.loadUserByUsername(extractUsername(requestRefreshToken));
        String token = reniewToken(userDetails, requestRefreshToken, http);
        return new LoginResponse(token, requestRefreshToken, getExpirationTime());
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(userDetails, new HashMap<>());
    }

    public String generateToken(UserDetails userDetails, Map<String, Object> extraClaims) {
        return buildToken(userDetails, extraClaims);
    }

    private String reniewToken(UserDetails userDetails, String requestRefreshToken, HttpServletRequest http) {
        if (!isTokenExpired(requestRefreshToken)) {
            revokeToken(recoverToken(http));
            return generateToken(userDetails, new HashMap<>());
        } else {
            throw new UnauthorizedException();
        }
    }


    public String generateRefreshToken(String requestRefreshToken) {
        try {

            return Jwts
                    .builder()
                    .setSubject(this.extractUsername(requestRefreshToken))
                    .setIssuedAt(new Date(System.currentTimeMillis()))
                    .setExpiration(new Date(System.currentTimeMillis() + jwtRefreshExpiration))
                    .signWith(getSignInKey(), SignatureAlgorithm.forName(jwtAlgorithm))
                    .compact();

        } catch (MalformedJwtException | ExpiredJwtException | UnsupportedJwtException | IllegalArgumentException ex) {
            log.error("JWT refresh token: {}", ex.getMessage());
            throw new UnauthorizedException(ex.getMessage());
        }
    }

    public long getExpirationTime() {
        return jwtExpiration;
    }

    public String buildToken(UserDetails userDetails, Map<String, Object> extraClaims) {
        try {
            return Jwts
                    .builder()
                    .setClaims(extraClaims)
                    .setSubject(userDetails.getUsername())
                    .setIssuedAt(new Date(System.currentTimeMillis()))
                    .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                    .signWith(getSignInKey(), SignatureAlgorithm.forName(jwtAlgorithm))
                    .compact();

        } catch (MalformedJwtException | ExpiredJwtException | UnsupportedJwtException | IllegalArgumentException ex) {
            log.error("JWT token: {}", ex.getMessage());
            throw new UnauthorizedException(ex.getMessage());
        }
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token) && !isTokenRevoked(token);
    }

    public void revokeToken(String token) {
        revokedTokens.add(token);
    }

    public boolean isTokenRevoked(String token) {
        return revokedTokens.contains(token);
    }


    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }


    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }


    private String recoverToken(HttpServletRequest request) {
        var authHeader = request.getHeader("Authorization");
        if (Objects.isNull(authHeader)) return null;
        return authHeader.replace("Bearer ", "");
    }
}
