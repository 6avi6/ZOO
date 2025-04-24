package com.polsl.tab.zoobackend.controller;

import com.polsl.tab.zoobackend.model.Enclosure;
import com.polsl.tab.zoobackend.service.EnclosureService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enclosures")
public class EnclosureController {
    private final EnclosureService service;

    public EnclosureController(EnclosureService service) {
        this.service = service;
    }

    @GetMapping
    public List<Enclosure> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Enclosure> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Enclosure create(@RequestBody Enclosure enclosure) {
        return service.create(enclosure);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Enclosure> update(@PathVariable Long id, @RequestBody Enclosure enclosure) {
        try {
            return ResponseEntity.ok(service.update(id, enclosure));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
