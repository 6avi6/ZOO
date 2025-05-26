package com.polsl.tab.zoobackend.controller;

import com.polsl.tab.zoobackend.dto.animal.AnimalResponse;
import com.polsl.tab.zoobackend.dto.caregiver.ChangeEnclosureRequest;
import com.polsl.tab.zoobackend.dto.caregiver.ChangeFeedingTimeRequest;
import com.polsl.tab.zoobackend.dto.caregiver.ChangeFoodTypeRequest;
import com.polsl.tab.zoobackend.dto.feeding.FeedingDeleteRequest;
import com.polsl.tab.zoobackend.dto.feeding.FeedingResponse;
import com.polsl.tab.zoobackend.dto.feeding.FeedingTimeUpdateRequest;
import com.polsl.tab.zoobackend.dto.feeding.FeedingsCompletionRequest;
import com.polsl.tab.zoobackend.model.User;
import com.polsl.tab.zoobackend.service.caregiverService;
import com.polsl.tab.zoobackend.service.AuthenticationService;
import com.polsl.tab.zoobackend.service.CustomUserDetailsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/caregiver")
@RequiredArgsConstructor
public class CaregiverController {
    private final CustomUserDetailsService userService;
    private final AuthenticationService authenticationService;
    private final caregiverService caregiverService;

    @GetMapping("/my-animals")
    public ResponseEntity<List<AnimalResponse>> getMyAnimals() {
        User user = authenticationService.getAuthenticatedUser();
        return ResponseEntity.ok(caregiverService.getMyAnimals(user));
    }

    @GetMapping("/my-feedings")
    public ResponseEntity<List<FeedingResponse>> getMyFeedings() {
        User user = authenticationService.getAuthenticatedUser();
        return ResponseEntity.ok(caregiverService.getMyFeedings(user));
    }

    @GetMapping("/my-feedings/history")
    public ResponseEntity<List<FeedingResponse>> getMyFeedingsHistory() {
        User user = authenticationService.getAuthenticatedUser();
        return ResponseEntity.ok(caregiverService.getMyFeedingsHistory(user));
    }

    @PutMapping("/update-enclosure")
    public ResponseEntity<?> updateEnclosure(@RequestBody @Valid ChangeEnclosureRequest request) {
        User user = authenticationService.getAuthenticatedUser();
        caregiverService.updateEnclosure(user, request);
        return ResponseEntity.ok("Enclosure updated successfully");
    }

    @PutMapping("/update-food-type")
    public ResponseEntity<String> updateFoodType(@RequestBody @Valid ChangeFoodTypeRequest request) {
            User user = authenticationService.getAuthenticatedUser();
            caregiverService.updateFoodType(user, request);
            return ResponseEntity.ok("Food type updated successfully");
        }

    @PutMapping("/my-feedings/change-date-time")
    public ResponseEntity<String> updateFeedingTime(@RequestBody @Valid ChangeFeedingTimeRequest request) {
        User user = authenticationService.getAuthenticatedUser();
        caregiverService.updateFeedingTime(user, request);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/my-feedings/{id}/repeat/{days}")
    public ResponseEntity<Void> repeatFeeding(
            @PathVariable Long id,
            @PathVariable Integer days
    ) {
        User user = authenticationService.getAuthenticatedUser();
        caregiverService.repeatFeeding(user.getId(), id, days);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/my-feedings/update-date-time-by-range")
    public ResponseEntity<String> updateByRange(@RequestBody @Valid FeedingTimeUpdateRequest request) {
        User user = authenticationService.getAuthenticatedUser();
        Integer updatedRecords = caregiverService.updateFeedingTimeInRange(user.getId(), request);
        return ResponseEntity.ok("Updated records: " + updatedRecords.toString());
    }

    @DeleteMapping("/my-feedings/by-range")
    public ResponseEntity<String> deleteByRange(@RequestBody @Valid FeedingDeleteRequest request) {
        User user = authenticationService.getAuthenticatedUser();
        Integer updatedRecords = caregiverService.deleteFeedingsInRange(user.getId(),request);
        return ResponseEntity.ok("Deleted records: " + updatedRecords.toString());
    }

    @PutMapping("/my-feedings/mark-completed")
    public ResponseEntity<Void> markFeedingsAsCompleted(@RequestBody FeedingsCompletionRequest request) {
        User user = authenticationService.getAuthenticatedUser();
        caregiverService.markFeedingsAsCompleted(user.getId(), request);
        return ResponseEntity.ok().build();
    }
}
