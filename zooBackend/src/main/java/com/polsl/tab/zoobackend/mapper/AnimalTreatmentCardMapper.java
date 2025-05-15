package com.polsl.tab.zoobackend.mapper;

import com.polsl.tab.zoobackend.dto.animalTreatmentCard.AnimalTreatmentCardRequest;
import com.polsl.tab.zoobackend.dto.animalTreatmentCard.AnimalTreatmentCardResponse;
import com.polsl.tab.zoobackend.model.AnimalTreatmentCard;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface AnimalTreatmentCardMapper {
    AnimalTreatmentCard toEntity(AnimalTreatmentCardRequest animalTreatmentCardRequest);
    AnimalTreatmentCardResponse toDto(AnimalTreatmentCard animalTreatmentCard);
    void updateEntity(@MappingTarget AnimalTreatmentCard target, AnimalTreatmentCardRequest source);
}
