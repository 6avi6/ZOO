package com.polsl.tab.zoobackend.dto.animal;

import com.polsl.tab.zoobackend.model.Species;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class AnimalResponse {
    private Long id;
    private String name;
    private LocalDate birthDate;
    private String condition;
    private String sex;
    private Double weight;
    private Species species;
    private Long enclosureId;
}