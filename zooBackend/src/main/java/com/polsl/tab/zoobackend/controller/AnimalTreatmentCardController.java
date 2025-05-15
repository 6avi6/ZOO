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

    private final AnimalTreatmentCardService animalTreatmentCardServiceService;

    @GetMapping
    public List<AnimalTreatmentCardResponse> getAll() {
        return animalTreatmentCardServiceService.getAllTreatmentCards();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnimalTreatmentCardResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(animalTreatmentCardServiceService.getTreatmentCardById(id));
    }

    @PostMapping
    public ResponseEntity<AnimalTreatmentCardResponse> create(@Valid @RequestBody AnimalTreatmentCardRequest dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(animalTreatmentCardServiceService.createTreatmentCard(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnimalTreatmentCardResponse> update(@PathVariable Long id, @Valid @RequestBody AnimalTreatmentCardRequest dto) {
        return ResponseEntity.ok(animalTreatmentCardServiceService.updateTreatmentCard(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        animalTreatmentCardServiceService.deleteTreatmentCard(id);
        return ResponseEntity.noContent().build();
    }
}
