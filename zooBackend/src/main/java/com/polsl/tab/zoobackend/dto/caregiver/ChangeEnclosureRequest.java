package com.polsl.tab.zoobackend.dto.caregiver;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

@Data
@AllArgsConstructor
public class ChangeEnclosureRequest {
    @NotNull
    private Long enclosureID;
    @NotEmpty
    private Set<Long> animalIDs;
}