package com.polsl.tab.zoobackend.controller;

import com.polsl.tab.zoobackend.dto.workSchedule.WorkScheduleResponse;
import com.polsl.tab.zoobackend.dto.user.UserProfileDTO;
import com.polsl.tab.zoobackend.dto.user.UserSummaryDTO;
import com.polsl.tab.zoobackend.exception.ResourceNotFoundException;
import com.polsl.tab.zoobackend.mapper.UserMapper;
import com.polsl.tab.zoobackend.mapper.WorkScheduleMapper;
import com.polsl.tab.zoobackend.model.User;
import com.polsl.tab.zoobackend.service.CustomUserDetailsService;
import com.polsl.tab.zoobackend.service.WorkScheduleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final CustomUserDetailsService userService;
    private final UserMapper userMapper;
    private final WorkScheduleService workScheduleService;
    private final WorkScheduleMapper workScheduleMapper;

    @GetMapping("/users")
    public ResponseEntity<List<UserSummaryDTO>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users.stream().map(userMapper::toSummaryDto).collect(Collectors.toList()));
    }

    @GetMapping("/users/paged")
    public ResponseEntity<Page<UserSummaryDTO>> getAllUsersPaged(Pageable pageable) {
        Page<User> pageEnt = userService.getAllUsers(pageable);
        Page<UserSummaryDTO> pageDto = pageEnt.map(userMapper::toSummaryDto);
        return ResponseEntity.ok(pageDto);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserProfileDTO> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(userMapper.toProfileDto(user));
    }

    @GetMapping("/users/search")
    public List<UserProfileDTO> searchUsers(
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName
    ) {
        return userService.searchUsers(username, email, firstName, lastName).stream()
                .map(userMapper::toProfileDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/users/search/paged")
    public Page<UserProfileDTO> searchUsersPaged(
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            Pageable pageable
    ) {
        return userService.searchUsers(username, email, firstName, lastName, pageable)
                .map(userMapper::toProfileDto);
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<?> updateClient(@PathVariable Long id, @Valid @RequestBody UserProfileDTO updateRequest) {
        User updatedClient = userService.updateUser(id, updateRequest);
        return ResponseEntity.ok(userMapper.toProfileDto(updatedClient));
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        if (!userService.userExists(id)) {
            throw new ResourceNotFoundException("Client with ID " + id + " not found");
        }

        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully.");
    }

    @GetMapping("/user/{id}/work-schedule")
    public ResponseEntity<List<WorkScheduleResponse>> getByUser(@PathVariable Long id) {
        List<WorkScheduleResponse> dtos = workScheduleService.getByUser(id).stream()
                .map(workScheduleMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/user/{id}/work-schedule/date-range")
    public ResponseEntity<List<WorkScheduleResponse>> getByUserAndDateRange(
            @PathVariable Long id,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        List<WorkScheduleResponse> dtos = workScheduleService.getByUserAndDateRange(id, start, end).stream()
                .map(workScheduleMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }
}