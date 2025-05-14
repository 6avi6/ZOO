package com.polsl.tab.zoobackend.controller;

import com.polsl.tab.zoobackend.dto.feeding.FeedingRequest;
import com.polsl.tab.zoobackend.dto.feeding.FeedingResponse;
import com.polsl.tab.zoobackend.service.FeedingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/feedings")
public class FeedingController {
    private final FeedingService service;

    public FeedingController(FeedingService service) {
        this.service = service;
    }

    @GetMapping
    public List<FeedingResponse> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<FeedingResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PostMapping
    public ResponseEntity<FeedingResponse> create(@RequestBody @Valid FeedingRequest request) {
        FeedingResponse created = service.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FeedingResponse> update(@PathVariable Long id, @RequestBody @Valid FeedingRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
