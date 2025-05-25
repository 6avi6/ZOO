package com.polsl.tab.zoobackend.mapper;

import com.polsl.tab.zoobackend.dto.symptom.SymptomRequest;
import com.polsl.tab.zoobackend.dto.symptom.SymptomResponse;
import com.polsl.tab.zoobackend.model.Symptom;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface SymptomMapper {
    Symptom toEntity(SymptomRequest symptomRequest);
    SymptomResponse toDto(Symptom symptom );
    void updateEntity(@MappingTarget Symptom target, SymptomRequest source);
}
