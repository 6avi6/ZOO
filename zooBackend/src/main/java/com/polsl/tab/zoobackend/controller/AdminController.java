package com.polsl.tab.zoobackend.controller;

import com.polsl.tab.zoobackend.dto.UserSummaryDTO;
import com.polsl.tab.zoobackend.model.Role;
import com.polsl.tab.zoobackend.service.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')") // class level security
public class AdminController {

    private final CustomUserDetailsService userService;

    @GetMapping("/users")
    public List<UserSummaryDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @PutMapping("/users/{id}/role")
    public ResponseEntity<?> updateUserRole(@PathVariable Long id, @RequestParam Role role) {
        if (!userService.userExists(id)) {
            return ResponseEntity.notFound().build();
        }

        userService.updateUserRole(id, role);
        return ResponseEntity.ok("User role updated successfully.");
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        if (!userService.userExists(id)) {
            return ResponseEntity.notFound().build();
        }

        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully.");
    }
}