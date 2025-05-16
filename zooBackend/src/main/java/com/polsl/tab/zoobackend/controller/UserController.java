package com.polsl.tab.zoobackend.controller;

import com.polsl.tab.zoobackend.dto.authentication.PasswordChangeRequest;
import com.polsl.tab.zoobackend.dto.user.UserProfileDTO;
import com.polsl.tab.zoobackend.dto.user.UserUpdateRequest;
import com.polsl.tab.zoobackend.mapper.UserMapper;
import com.polsl.tab.zoobackend.model.User;
import com.polsl.tab.zoobackend.service.AdministrationService;
import com.polsl.tab.zoobackend.service.AuthenticationService;
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
    private final AdministrationService administrationService;
    private final UserMapper userMapper;
    private final AuthenticationService authenticationService;

    @GetMapping("/me")
    public ResponseEntity<UserProfileDTO> getCurrentUserProfile(Authentication authentication) {
        User user = authenticationService.getAuthenticatedUser();
        return ResponseEntity.ok(userMapper.toProfileDto(user));
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateClient(Authentication authentication,
                                          @Valid @RequestBody UserUpdateRequest updateRequest) {
        User user = authenticationService.getAuthenticatedUser();
        User updatedClient = administrationService.updateUser(user.getId(), updateRequest);
        return ResponseEntity.ok(userMapper.toProfileDto(updatedClient));
    }

    @PutMapping("/change-password")
    public ResponseEntity<Void> changePassword(Authentication authentication,
                                               @Valid @RequestBody PasswordChangeRequest request) {
        User user = authenticationService.getAuthenticatedUser();
        userService.changePassword(user.getUsername(), request.getOldPassword(), request.getNewPassword());
        return ResponseEntity.ok().build();
    }
}
