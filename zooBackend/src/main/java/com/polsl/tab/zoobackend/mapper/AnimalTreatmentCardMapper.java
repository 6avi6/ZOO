package com.polsl.tab.zoobackend.mapper;

import com.polsl.tab.zoobackend.dto.animalTreatmentCard.AnimalTreatmentCardRequest;
import com.polsl.tab.zoobackend.dto.animalTreatmentCard.AnimalTreatmentCardResponse;
import com.polsl.tab.zoobackend.exception.ResourceNotFoundException;
import com.polsl.tab.zoobackend.model.*;
import com.polsl.tab.zoobackend.repository.AnimalRepository;
import com.polsl.tab.zoobackend.repository.SymptomRepository;
import com.polsl.tab.zoobackend.repository.UserRepository;
import org.mapstruct.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring",
        imports = {Symptom.class, Collectors.class})
public interface AnimalTreatmentCardMapper {
    @Mapping(source = "animal.id",            target = "animalId")
    @Mapping(source = "assignedUser.id",      target = "assignedUserId")
    @Mapping(target = "symptomIds",
            expression = "java(entity.getSymptoms().stream().map(Symptom::getId).collect(Collectors.toSet()))")
    AnimalTreatmentCardResponse toDto(AnimalTreatmentCard entity);

    @Mapping(target = "id",           ignore = true)
    @Mapping(target = "symptoms",     ignore = true)
    @Mapping(target = "animal",       ignore = true)
    @Mapping(target = "assignedUser", ignore = true)
    AnimalTreatmentCard toEntity(AnimalTreatmentCardRequest dto);

    @Mapping(target = "symptoms",     ignore = true)
    @Mapping(target = "animal",       ignore = true)
    @Mapping(target = "assignedUser", ignore = true)
    void updateEntity(@MappingTarget AnimalTreatmentCard entity, AnimalTreatmentCardRequest dto);


    @AfterMapping
    default void populateRelations(AnimalTreatmentCardRequest dto,
                                   @MappingTarget AnimalTreatmentCard entity,
                                   @Context AnimalRepository animalRepo,
                                   @Context UserRepository userRepo,
                                   @Context SymptomRepository symptomRepo) {


        Animal a = animalRepo.findById(dto.getAnimalId())
                .orElseThrow(() -> new ResourceNotFoundException("Animal not found: " + dto.getAnimalId()));
        entity.setAnimal(a);

        User u = userRepo.findById(dto.getAssignedUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + dto.getAssignedUserId()));
        entity.setAssignedUser(u);

        Set<Symptom> symptoms = dto.getSymptomIds().stream()
                .map(id -> symptomRepo.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Symptom not found: " + id)))
                .collect(Collectors.toSet());
        entity.setSymptoms(symptoms);
    }
}
