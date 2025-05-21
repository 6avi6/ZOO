package com.polsl.tab.zoobackend.dto.report;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EnclosureReportDto {
    private Long id;
    private String terrainType;
    private Integer maxAnimals;
    private Integer animalCount;
}
