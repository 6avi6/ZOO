package com.polsl.tab.zoobackend.mapper;

import com.polsl.tab.zoobackend.dto.enclosure.EnclosureRequest;
import com.polsl.tab.zoobackend.dto.enclosure.EnclosureResponse;
import com.polsl.tab.zoobackend.model.Enclosure;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface EnclosureMapper {
    Enclosure toEntity(EnclosureRequest dto);

    @Mapping(target = "animalIds", expression = "java(mapAnimalsToIds(enclosure))")
    EnclosureResponse toResponse(Enclosure enclosure);

    void updateEntity(@MappingTarget Enclosure existing, EnclosureRequest dto);

    default List<Long> mapAnimalsToIds(Enclosure enclosure) {
        if (enclosure.getAnimals() == null) return List.of();
        return enclosure.getAnimals().stream()
                .map(animal -> animal.getId())
                .collect(Collectors.toList());
    }
}
