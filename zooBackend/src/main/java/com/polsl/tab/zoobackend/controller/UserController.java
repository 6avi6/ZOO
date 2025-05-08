package com.polsl.tab.zoobackend.controller;

import com.polsl.tab.zoobackend.dto.authentication.PasswordChangeRequest;
import com.polsl.tab.zoobackend.dto.user.UserProfileDTO;
import com.polsl.tab.zoobackend.dto.user.UserUpdateRequest;
import com.polsl.tab.zoobackend.mapper.UserMapper;
import com.polsl.tab.zoobackend.model.User;
import com.polsl.tab.zoobackend.service.CustomUserDetailsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final CustomUserDetailsService userService;
    private final UserMapper userMapper;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/me")
    public ResponseEntity<UserProfileDTO> getCurrentUserProfile(Authentication authentication) {
        if (authentication == null) { return ResponseEntity.status(401).build(); }

        String username = authentication.getName();

        if (username == null) { return ResponseEntity.status(401).build(); }

        User user = userService.getUserByUsername(username);

        if (user == null) {
            logger.error("getCurrentUserProfile: User is null");
            return ResponseEntity.status(404).body(null);
        }

        return ResponseEntity.ok(userMapper.toProfileDto(user));
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateClient(Authentication authentication,
                                          @Valid @RequestBody UserUpdateRequest updateRequest) {
        if (authentication == null) { return ResponseEntity.status(401).build(); }

        User userDetails = (User) authentication.getPrincipal();
        Long id = userDetails.getId();

        if (id == null) {
            logger.error("Id is null");
            return ResponseEntity.status(401).build();
        }

        User updatedClient = userService.updateUser(id, updateRequest);
        return ResponseEntity.ok(userMapper.toProfileDto(updatedClient));
    }

    @PutMapping("/change-password")
    public ResponseEntity<Void> changePassword(Authentication authentication,
                                               @Valid @RequestBody PasswordChangeRequest request) {
        if (authentication == null) { return ResponseEntity.status(401).build(); }

        User userDetails = (User) authentication.getPrincipal();

        if (userDetails == null) {
            logger.error("changePassword: User is null");
            return ResponseEntity.status(401).build();
        }

        userService.changePassword(userDetails.getUsername(), request.getOldPassword(), request.getNewPassword());
        return ResponseEntity.ok().build();
    }
}
