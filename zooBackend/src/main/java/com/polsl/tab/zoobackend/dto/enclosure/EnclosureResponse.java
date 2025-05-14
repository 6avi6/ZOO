package com.polsl.tab.zoobackend.dto.enclosure;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class EnclosureResponse {
    private Long id;
    private String terrainType;
    private Boolean isAccessWater;
    private String insolation;
    private Double temperature;
    private Integer maxAnimals;
    private List<Long> animalIds; // tylko ID zwierząt (dla uproszczenia)
}
