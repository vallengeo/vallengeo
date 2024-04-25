package com.vallengeo.utils;

import com.vallengeo.portal.security.jwt.JwtUserResponse;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtTestUtils {

    public static String buildJwtToken(
            UserDetails userDetails, String idGrupo, String secretKey, Long expiration, String algorithm
    ) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("user", new JwtUserResponse(userDetails, idGrupo));

        byte[] keyBytes = Decoders.BASE64.decode(secretKey);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(Keys.hmacShaKeyFor(keyBytes), SignatureAlgorithm.forName(algorithm))
                .compact();
    }
}
