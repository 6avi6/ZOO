package com.polsl.tab.zoobackend.controller;

import com.polsl.tab.zoobackend.dto.animalTreatmentCard.AnimalTreatmentCardRequest;
import com.polsl.tab.zoobackend.dto.animalTreatmentCard.AnimalTreatmentCardResponse;
import com.polsl.tab.zoobackend.service.AnimalTreatmentCardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/animal-treatment-card")
@RequiredArgsConstructor
public class AnimalTreatmentCardController {

    private final AnimalTreatmentCardService visitService;

    @GetMapping
    public List<AnimalTreatmentCardResponse> getAll() {
        return visitService.getAllVisits();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnimalTreatmentCardResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(visitService.getVisitById(id));
    }

    @PostMapping
    public ResponseEntity<AnimalTreatmentCardResponse> create(@Valid @RequestBody AnimalTreatmentCardRequest dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(visitService.createVisit(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnimalTreatmentCardResponse> update(@PathVariable Long id, @Valid @RequestBody AnimalTreatmentCardRequest dto) {
        return ResponseEntity.ok(visitService.updateVisit(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        visitService.deleteVisit(id);
        return ResponseEntity.noContent().build();
    }
}
