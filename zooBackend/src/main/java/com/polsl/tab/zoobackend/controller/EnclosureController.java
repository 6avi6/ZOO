package com.polsl.tab.zoobackend.controller;

import com.polsl.tab.zoobackend.dto.enclosure.EnclosureRequest;
import com.polsl.tab.zoobackend.dto.enclosure.EnclosureResponse;
import com.polsl.tab.zoobackend.model.Enclosure;
import com.polsl.tab.zoobackend.model.TerrainType;
import com.polsl.tab.zoobackend.service.EnclosureService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enclosures")
@RequiredArgsConstructor
public class EnclosureController {
    private final EnclosureService service;

    @GetMapping
    public List<EnclosureResponse> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EnclosureResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PostMapping
    public ResponseEntity<EnclosureResponse> create(@RequestBody EnclosureRequest request) {
        return ResponseEntity.ok(service.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EnclosureResponse> update(@PathVariable Long id, @RequestBody EnclosureRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/terrain-types")
    public List<TerrainType> getTerrainTypes() {
        return List.of(TerrainType.values());
    }
}
