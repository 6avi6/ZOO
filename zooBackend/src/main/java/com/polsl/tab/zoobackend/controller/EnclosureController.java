package com.polsl.tab.zoobackend.controller;

import com.polsl.tab.zoobackend.dto.enclosure.EnclosureRequest;
import com.polsl.tab.zoobackend.dto.enclosure.EnclosureResponse;
import com.polsl.tab.zoobackend.dto.enclosure.EnclosureSummary;
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
    private final EnclosureService enclosureService;

    @GetMapping
    public List<EnclosureResponse> getAll() {
        return enclosureService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EnclosureResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(enclosureService.getById(id));
    }

    @PostMapping
    public ResponseEntity<EnclosureResponse> create(@RequestBody EnclosureRequest request) {
        return ResponseEntity.ok(enclosureService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EnclosureResponse> update(@PathVariable Long id, @RequestBody EnclosureRequest request) {
        return ResponseEntity.ok(enclosureService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        enclosureService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/transfer-animals")
    public ResponseEntity<String> getByTransferAnimals(@RequestParam Long sourceId,
                                                     @RequestParam Long targetId) {
        boolean exceedsMax = enclosureService.transferAnimals(sourceId, targetId);

        String message = "Transfer successful.";
        if (exceedsMax) {
            message += " WARNING: Target enclosure exceeds max animals.";
        }

        return ResponseEntity.ok(message);
    }

    @GetMapping("/free")
    public ResponseEntity<List<EnclosureSummary>> getFreeEnclosureSummaries() {
        return ResponseEntity.ok(enclosureService.getFreeEnclosureSummaries());
    }

    @GetMapping("/terrain-types")
    public List<TerrainType> getTerrainTypes() {
        return List.of(TerrainType.values());
    }
}
