package com.polsl.tab.zoobackend.dto.symptom;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SymptomRequest {
    @NotBlank
    private String name;

    private String description;
}
