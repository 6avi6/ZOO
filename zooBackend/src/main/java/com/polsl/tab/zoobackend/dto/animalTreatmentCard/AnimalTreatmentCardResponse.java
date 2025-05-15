package com.polsl.tab.zoobackend.dto.animalTreatmentCard;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
public class AnimalTreatmentCardResponse {
    private Long id;
    private String description;
    private LocalDateTime visitDate;
    private Long animalId;
    private Long veterinarianId;
    private Set<Long> symptomIds;
}
