package com.polsl.tab.zoobackend.dto.caregiver;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalTime;
import java.util.Set;

@Data
@AllArgsConstructor
public class ChangeFeedingTimeRequest {
    @NotNull
    @Schema(type = "string", example = "14:30", format = "HH:mm")
    private LocalTime oldFeedingTime;
    @NotNull
    @Schema(type = "string", example = "14:30", format = "HH:mm")
    private LocalTime newFeedingTime;
    @NotEmpty
    private Set<Long> animalIDs;
}
