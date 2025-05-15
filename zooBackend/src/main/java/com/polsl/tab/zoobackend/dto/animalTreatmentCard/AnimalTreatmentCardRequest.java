package com.polsl.tab.zoobackend.dto.animalTreatmentCard;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
public class AnimalTreatmentCardRequest {
    @NotBlank
    private String description;

    @NotNull
    private LocalDateTime visitDate;

    @NotNull
    private Long animalId;

    @NotNull
    private Long veterinarianId;

    private Set<@NotNull Long> symptomIds;
}