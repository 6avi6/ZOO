package com.polsl.tab.zoobackend.controller;

import com.polsl.tab.zoobackend.dto.animal.AnimalRequest;
import com.polsl.tab.zoobackend.dto.animal.AnimalResponse;
import com.polsl.tab.zoobackend.model.Animal;
import com.polsl.tab.zoobackend.service.AnimalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/animals")
@RequiredArgsConstructor
public class AnimalController {

    private final AnimalService service;

    @GetMapping
    public List<AnimalResponse> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnimalResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PostMapping
    public ResponseEntity<AnimalResponse> create(@RequestBody @Valid AnimalRequest animalRequest) {
        AnimalResponse created = service.create(animalRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnimalResponse> update(@PathVariable Long id, @RequestBody @Valid AnimalRequest animalRequest) {
        AnimalResponse updated = service.update(id, animalRequest);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
