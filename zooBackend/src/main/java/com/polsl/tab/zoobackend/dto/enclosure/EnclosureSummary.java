package com.polsl.tab.zoobackend.dto.enclosure;

import com.polsl.tab.zoobackend.model.TerrainType;

public interface EnclosureSummary {
    Long getId();
    TerrainType getTerrainType();
    Integer getMaxAnimals();
    Long getCurrentCount();
}