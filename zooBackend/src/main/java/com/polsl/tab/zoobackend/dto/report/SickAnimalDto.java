package com.polsl.tab.zoobackend.dto.report;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SickAnimalDto {
    private Long animalId;
    private String animalName;
    private String disease;
    private String treatment;
}
