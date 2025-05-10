package com.polsl.tab.zoobackend.controller;

import com.polsl.tab.zoobackend.dto.authentication.RegisterRequest;
import com.polsl.tab.zoobackend.service.AuthenticationService;
import com.polsl.tab.zoobackend.dto.authentication.AuthenticationRequest;
import com.polsl.tab.zoobackend.dto.authentication.AuthenticationResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;


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
        authenticationService.setRefreshTokenCookie(response, authResponse.getRefreshToken(), 3 * 24 * 60 * 60);
        return new AuthenticationResponse(authResponse.getAccessToken(), null);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = authenticationService.extractCookie(request, "refreshToken");

        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No refresh token");
        }

        ResponseEntity<?> resp = authenticationService.refreshToken(refreshToken, response);
        return resp;
    }

    @PostMapping("/refresh/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        authenticationService.logout(request, response);
        return ResponseEntity.ok("Logged out successfully");
    }
}


