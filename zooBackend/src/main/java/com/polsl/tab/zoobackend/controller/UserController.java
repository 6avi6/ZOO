package com.polsl.tab.zoobackend.controller;

import com.polsl.tab.zoobackend.dto.UserProfileDTO;
import com.polsl.tab.zoobackend.model.User;
import com.polsl.tab.zoobackend.service.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final CustomUserDetailsService userService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/me")
    public ResponseEntity<UserProfileDTO> getCurrentUserProfile(Authentication authentication) {
        if (authentication == null) { return ResponseEntity.status(401).build(); }

        String username = authentication.getName();

        if (authentication.getName() == null) { return ResponseEntity.status(401).build(); }

        User user = userService.getUserByUsername(username);

        if (user == null) { return ResponseEntity.status(404).body(null); }

        return ResponseEntity.ok(new UserProfileDTO(user));
    }
}
