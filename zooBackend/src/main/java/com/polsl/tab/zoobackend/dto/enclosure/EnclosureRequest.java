package com.polsl.tab.zoobackend.dto.enclosure;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EnclosureRequest {
    private String terrainType;
    private Boolean isAccessWater;
    private String insolation;
    private Double temperature;
    private Integer maxAnimals;
}
