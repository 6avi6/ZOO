package com.polsl.tab.zoobackend.dto.foodType;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FoodTypeResponse {
    private Long id;
    private String name;
    private String description;
}
