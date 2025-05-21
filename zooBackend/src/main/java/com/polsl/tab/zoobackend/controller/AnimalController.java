package com.polsl.tab.zoobackend.controller;

import com.polsl.tab.zoobackend.dto.animal.AnimalRequest;
import com.polsl.tab.zoobackend.dto.animal.AnimalResponse;
import com.polsl.tab.zoobackend.dto.user.UserSummaryDTO;
import com.polsl.tab.zoobackend.model.Species;
import com.polsl.tab.zoobackend.service.AnimalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/animals")
@RequiredArgsConstructor
public class AnimalController {

    private final AnimalService animalService;

    @GetMapping
    public List<AnimalResponse> getAll() {
        return animalService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnimalResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(animalService.getById(id));
    }


    @PostMapping
    public ResponseEntity<AnimalResponse> create(@RequestBody @Valid AnimalRequest animalRequest) {
        AnimalResponse created = animalService.create(animalRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnimalResponse> update(@PathVariable Long id, @RequestBody @Valid AnimalRequest animalRequest) {
        AnimalResponse updated = animalService.update(id, animalRequest);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        animalService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/by-ids")
    public ResponseEntity<List<AnimalResponse>> getAnimalsByIds(@RequestBody Set<Long> ids) {
        List<AnimalResponse> animals = animalService.getAnimalsByIds(ids);
        return ResponseEntity.ok(animals);
    }

    @GetMapping("/{id}/caretakers")
    public ResponseEntity<List<UserSummaryDTO>> getAnimalsCaretakers(@PathVariable Long id) {
        return ResponseEntity.ok(animalService.getCaretakers(id));
    }

    @PutMapping("/{animalId}/employees")
    public ResponseEntity<?> assignEmployeesToAnimal(
            @PathVariable Long animalId,
            @RequestBody List<Long> employeeIds) {

        animalService.assignEmployees(animalId, employeeIds);
        return ResponseEntity.ok("Employees assigned to animal.");
    }

    @GetMapping("/species")
    public List<Species> getTerrainTypes() {
        return List.of(Species.values());
    }
}
