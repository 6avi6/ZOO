package com.polsl.tab.zoobackend.controller;

import com.polsl.tab.zoobackend.dto.WorkScheduleDto;
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
    public List<UserSummaryDTO> getAllUsers() {
        return userService.getAllUsers().stream().map(userMapper::toSummaryDto).collect(Collectors.toList());
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<?> updateClient(@PathVariable Long id, @Valid @RequestBody UserProfileDTO updateRequest) {
        User updatedClient = userService.updateUser(id, updateRequest);
        return ResponseEntity.ok(userMapper.toSummaryDto(updatedClient));
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
    public ResponseEntity<List<WorkScheduleDto>> getByUser(@PathVariable Long id) {
        List<WorkScheduleDto> dtos = workScheduleService.getByUser(id).stream()
                .map(workScheduleMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/user/{id}/work-schedule/date-range")
    public ResponseEntity<List<WorkScheduleDto>> getByUserAndDateRange(
            @PathVariable Long id,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        List<WorkScheduleDto> dtos = workScheduleService.getByUserAndDateRange(id, start, end).stream()
                .map(workScheduleMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }
}