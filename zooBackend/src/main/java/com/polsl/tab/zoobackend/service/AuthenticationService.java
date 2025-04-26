package com.polsl.tab.zoobackend.service;

import com.polsl.tab.zoobackend.dto.authentication.AuthenticationRequest;
import com.polsl.tab.zoobackend.dto.authentication.AuthenticationResponse;
import com.polsl.tab.zoobackend.dto.authentication.RegisterRequest;
import com.polsl.tab.zoobackend.model.RefreshToken;
import com.polsl.tab.zoobackend.model.Role;
import com.polsl.tab.zoobackend.model.User;
import com.polsl.tab.zoobackend.repository.RefreshTokenRepository;
import com.polsl.tab.zoobackend.config.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenRepository refreshTokenRepository;
    private final CustomUserDetailsService userService;

    public AuthenticationResponse login(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        User user = userService.getUserByUsername(request.getUsername());

        String accessToken = jwtUtil.generateAccessToken(user.getUsername(), user.getId(), user.getRole().toString());
        String refreshToken = generateRefreshToken(user);

        return new AuthenticationResponse(accessToken, refreshToken);
    }

    public String register(RegisterRequest request) {
        if (userService.userExists(request.getUsername())) {
            return "The user already exists";
        }


        Role role = Optional.ofNullable(request.getRole())
                .orElseThrow(() -> new IllegalArgumentException("Role must be provided in the request."));

        userService.createUser(request.getUsername(), passwordEncoder.encode(request.getPassword()), role);
        return "Registration successfully completed";
    }

    public ResponseEntity<?> refreshToken(String refreshToken, HttpServletResponse response) {
        RefreshToken storedToken = refreshTokenRepository.findByToken(refreshToken)
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));

        if (storedToken.isExpired()) {
            refreshTokenRepository.delete(storedToken);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Refresh token expired");
        }

        User user = storedToken.getUser();

        refreshTokenRepository.delete(storedToken);
        String newRefreshToken = generateRefreshToken(user);
        String newAccessToken = jwtUtil.generateAccessToken(user.getUsername(), user.getId(), user.getRole().toString());

        setRefreshTokenCookie(response, newRefreshToken);

        return ResponseEntity.ok(new AuthenticationResponse(newAccessToken, null));
    }

    private String generateRefreshToken(User user) {
        Optional<RefreshToken> existingTokenOpt = refreshTokenRepository.findByUser(user);
        RefreshToken token = existingTokenOpt.orElseGet(RefreshToken::new);

        token.setUser(user);
        token.setToken(jwtUtil.generateSecureToken());
        token.setExpiryDate(Instant.now().plus(3, ChronoUnit.DAYS));

        refreshTokenRepository.save(token);
        return token.getToken();
    }

    public void setRefreshTokenCookie(HttpServletResponse response, String newRefreshToken) {
        String cookieValue = String.format(
                "refreshToken=%s; Path=/api/auth/refresh; HttpOnly; SameSite=None; Secure; Max-Age=%d",
                newRefreshToken, 3 * 24 * 60 * 60
        );

        response.setHeader("Set-Cookie", cookieValue);
    }
}
