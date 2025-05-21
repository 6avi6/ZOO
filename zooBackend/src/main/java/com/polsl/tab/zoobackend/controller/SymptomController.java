package com.polsl.tab.zoobackend.controller;

import com.polsl.tab.zoobackend.dto.symptom.SymptomRequest;
import com.polsl.tab.zoobackend.dto.symptom.SymptomResponse;
import com.polsl.tab.zoobackend.service.SymptomService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/symptoms")
@RequiredArgsConstructor
public class SymptomController {

    private final SymptomService symptomService;

    @GetMapping
    public List<SymptomResponse> getAll() {
        return symptomService.getAllSymptoms();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SymptomResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(symptomService.getSymptomById(id));
    }

    @PostMapping
    public ResponseEntity<SymptomResponse> create(@Valid @RequestBody SymptomRequest dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(symptomService.createSymptom(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SymptomResponse> update(@PathVariable Long id, @Valid @RequestBody SymptomRequest dto) {
        return ResponseEntity.ok(symptomService.updateSymptom(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        symptomService.deleteSymptom(id);
        return ResponseEntity.noContent().build();
    }
}
