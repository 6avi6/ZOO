package com.polsl.tab.zoobackend.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.io.Decoders;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Date;
import java.util.function.Function;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {
    private static final String SECRET_KEY = "3Fk9bH2nV6D7Ml7H9QzPjQogS2nB8tVWyH4E0YYvD2g=";
    private static final long ACCESS_TOKEN_EXPIRATION = 1000 * 60 * 15; // 15 minutes
    private static final SecureRandom secureRandom = new SecureRandom();
    private static final int TOKEN_LENGTH = 32; // Length in bytes (256 bits)

    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    public String generateAccessToken(String username, Long userId, String role) {
        return Jwts.builder()
                .claim("userId", userId)
                .claim("role", role)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION))
                .signWith(Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY)), SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateSecureToken() {
        byte[] tokenBytes = new byte[TOKEN_LENGTH];
        secureRandom.nextBytes(tokenBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(tokenBytes);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Validate the JWT token signature and expiration.
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY)))
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("Expired JWT token: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("Unsupported JWT token: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("Empty JWT claims string: {}", e.getMessage());
        } catch (JwtException e) {
            // general JWT exception
            logger.error("JWT error: {}", e.getMessage());
        }
        return false;
    }

    /**
     * Get any data from a JWT token
     */
    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY)))
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return claimsResolver.apply(claims);
    }
}