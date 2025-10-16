package com.example.backend.util;

import io.jsonwebtoken.Jwts;

import javax.crypto.SecretKey;
import java.util.Date;

public class JwtUtil {

    private static final SecretKey SECRET_KEY = Jwts.SIG.HS256.key().build();

    public static String generateToken(String username) {
        long now = System.currentTimeMillis();
        long expiry = 1000 * 60 * 5; // w5分钟有效期
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date(now))
                .expiration(new Date(now + expiry))
                .signWith(SECRET_KEY)
                .compact();
    }

    public static String parseToken(String token) {
        return Jwts.parser()
                .verifyWith(SECRET_KEY)
                .build()
                .parseSignedClaims(token)
                .getPayload().getSubject();
    }
}
