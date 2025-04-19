package com.polsl.tab.zoobackend.controller;

import com.polsl.tab.zoobackend.config.JwtUtil;
import com.polsl.tab.zoobackend.dto.authentication.RegisterRequest;
import com.polsl.tab.zoobackend.service.AuthenticationService;
import com.polsl.tab.zoobackend.dto.authentication.AuthenticationRequest;
import com.polsl.tab.zoobackend.dto.authentication.AuthenticationResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return authenticationService.register(request);
    }

    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody AuthenticationRequest request, HttpServletResponse response) {
        AuthenticationResponse authResponse = authenticationService.login(request);
        authenticationService.setRefreshTokenCookie(response, authResponse.getRefreshToken());
        return new AuthenticationResponse(authResponse.getAccessToken(), null);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        // Pobieramy refresh token z cookie
        String refreshToken = null;
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("refreshToken".equals(cookie.getName())) {
                    refreshToken = cookie.getValue();
                    break;
                }
            }
        }
        if (refreshToken == null) {
            logger.error("Brak refresh tokenu");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Brak refresh tokenu");
        }

        ResponseEntity<?> resp = authenticationService.refreshToken(refreshToken, response);
        return resp;
    }
}


