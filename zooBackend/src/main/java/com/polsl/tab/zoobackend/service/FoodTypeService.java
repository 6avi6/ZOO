package com.polsl.tab.zoobackend.service;

import com.polsl.tab.zoobackend.dto.foodType.FoodTypeRequest;
import com.polsl.tab.zoobackend.dto.foodType.FoodTypeResponse;
import com.polsl.tab.zoobackend.exception.ResourceNotFoundException;
import com.polsl.tab.zoobackend.mapper.FoodTypeMapper;
import com.polsl.tab.zoobackend.model.FoodType;
import com.polsl.tab.zoobackend.repository.FoodTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FoodTypeService {

    private final FoodTypeRepository foodTypeRepository;
    private final FoodTypeMapper foodTypeMapper;

    public FoodTypeResponse createFoodType(FoodTypeRequest dto) {
        if (foodTypeRepository.findByName(dto.getName()).isPresent()) {
            throw new IllegalArgumentException("Food type with this name already exists.");
        }

        FoodType foodType = new FoodType();
        foodType.setName(dto.getName());
        foodType.setDescription(dto.getDescription());

        FoodType saved = foodTypeRepository.save(foodType);
        return foodTypeMapper.toResponse(saved);
    }

    public List<FoodTypeResponse> getAllFoodTypes() {
        return foodTypeRepository.findAll()
                .stream()
                .map(foodTypeMapper::toResponse)
                .collect(Collectors.toList());
    }

    public FoodTypeResponse getFoodTypeById(Long id) {
        FoodType foodType = foodTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("FoodType not found with id " + id));
        return foodTypeMapper.toResponse(foodType);
    }

    public FoodTypeResponse updateFoodType(Long id, FoodTypeRequest dto) {
        FoodType foodType = foodTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("FoodType not found with id " + id));

        foodType.setName(dto.getName());
        foodType.setDescription(dto.getDescription());

        return foodTypeMapper.toResponse(foodTypeRepository.save(foodType));
    }

    public void deleteFoodType(Long id) {
        if (!foodTypeRepository.existsById(id)) {
            throw new ResourceNotFoundException("FoodType not found with id " + id);
        }
        foodTypeRepository.deleteById(id);
    }
}
