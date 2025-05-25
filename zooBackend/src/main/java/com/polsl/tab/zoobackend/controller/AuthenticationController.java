package com.polsl.tab.zoobackend.controller;

import com.polsl.tab.zoobackend.dto.authentication.RegisterRequest;
import com.polsl.tab.zoobackend.service.AuthenticationService;
import com.polsl.tab.zoobackend.dto.authentication.AuthenticationRequest;
import com.polsl.tab.zoobackend.dto.authentication.AuthenticationResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final int refreshTokenExpiration;


    public AuthenticationController(AuthenticationService authenticationService,
                                    @Value("${jwt.refresh-expiration}") int refreshTokenExpiration) {
        this.authenticationService = authenticationService;
        this.refreshTokenExpiration = refreshTokenExpiration;
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return authenticationService.register(request);
    }

    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody AuthenticationRequest request, HttpServletResponse response) {
        AuthenticationResponse authResponse = authenticationService.login(request);
        authenticationService.setRefreshTokenCookie(response, authResponse.getRefreshToken(), refreshTokenExpiration);
        return new AuthenticationResponse(authResponse.getAccessToken(), null);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = authenticationService.extractCookie(request, "refreshToken");

        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No refresh token");
        }

        ResponseEntity<?> resp = authenticationService.refreshToken(refreshToken, response, refreshTokenExpiration);
        return resp;
    }

    @PostMapping("/refresh/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        authenticationService.logout(request, response);
        return ResponseEntity.ok("Logged out successfully");
    }
}


