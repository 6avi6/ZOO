package com.polsl.tab.zoobackend.dto.foodType;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FoodTypeRequest {
    @NotBlank
    private String name;
    private String description;
}
