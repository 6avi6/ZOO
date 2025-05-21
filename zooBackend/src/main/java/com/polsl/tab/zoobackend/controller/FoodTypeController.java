package com.polsl.tab.zoobackend.controller;

import com.polsl.tab.zoobackend.dto.foodType.FoodTypeRequest;
import com.polsl.tab.zoobackend.dto.foodType.FoodTypeResponse;
import com.polsl.tab.zoobackend.service.FoodTypeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/food-types")
@RequiredArgsConstructor
public class FoodTypeController {

    private final FoodTypeService foodTypeService;

    @PostMapping
    public ResponseEntity<FoodTypeResponse> create(@RequestBody @Valid FoodTypeRequest dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(foodTypeService.createFoodType(dto));
    }

    @GetMapping
    public ResponseEntity<List<FoodTypeResponse>> getAll() {
        return ResponseEntity.ok(foodTypeService.getAllFoodTypes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodTypeResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(foodTypeService.getFoodTypeById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FoodTypeResponse> update(@PathVariable Long id, @RequestBody @Valid FoodTypeRequest dto) {
        return ResponseEntity.ok(foodTypeService.updateFoodType(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        foodTypeService.deleteFoodType(id);
        return ResponseEntity.noContent().build();
    }
}
