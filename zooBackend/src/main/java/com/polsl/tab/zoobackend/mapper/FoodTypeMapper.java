package com.polsl.tab.zoobackend.mapper;

import com.polsl.tab.zoobackend.dto.foodType.FoodTypeRequest;
import com.polsl.tab.zoobackend.dto.foodType.FoodTypeResponse;
import com.polsl.tab.zoobackend.model.FoodType;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FoodTypeMapper {
    FoodType toEntity(FoodTypeRequest foodTypeRequest);
    FoodTypeResponse toResponse(FoodType foodType);
}
