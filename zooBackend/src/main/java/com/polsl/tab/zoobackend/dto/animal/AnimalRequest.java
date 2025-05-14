package com.polsl.tab.zoobackend.dto.animal;

import com.polsl.tab.zoobackend.model.Species;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class AnimalRequest {
    private String name;
    private LocalDate birthDate;
    private String condition;
    private String sex;
    private Double weight;
    private Species species;
    private Long enclosureId;
}
