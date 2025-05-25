package com.polsl.tab.zoobackend.dto.caregiver;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

@Data
@AllArgsConstructor
public class ChangeFoodTypeRequest {
    @NotNull
    private Long FoodTypeID;
    @NotEmpty
    private Set<Long> animalIDs;
}
