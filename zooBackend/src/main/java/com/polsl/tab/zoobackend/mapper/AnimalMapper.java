package com.polsl.tab.zoobackend.mapper;

import com.polsl.tab.zoobackend.dto.animal.AnimalRequest;
import com.polsl.tab.zoobackend.dto.animal.AnimalResponse;
import com.polsl.tab.zoobackend.model.Animal;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface AnimalMapper {
    Animal toEntity(AnimalRequest animalRequest);
    
    @Mapping(source = "enclosure.id", target = "enclosureId")
    AnimalResponse toResponse(Animal animalType);

    void updateEntity(@MappingTarget Animal target, AnimalRequest source);
}
