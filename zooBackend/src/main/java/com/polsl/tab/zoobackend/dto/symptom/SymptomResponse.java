package com.polsl.tab.zoobackend.dto.symptom;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SymptomResponse {
    private Long id;
    private String name;
    private String description;
}