package com.polsl.tab.zoobackend.dto.feeding;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Set;

@Data
@AllArgsConstructor
public class FeedingRequest {
//    @JsonFormat(pattern = "HH:mm")
//    @Schema(type = "string", example = "14:30", format = "HH:mm")
    @NotNull(message = "feeding time and date must not be null")
    private LocalDateTime feedingDateTime;

    @NotNull(message = "isCompleted must not be null")
    private Boolean isCompleted;

    @NotNull(message = "foodTypeId must not be null")
    private Long foodTypeId;

    @NotEmpty(message = "animalIds must contain at least one animal")
    private Set<@NotNull(message = "animalId must not be null") Long> animalIds;

    private Set<@NotNull(message = "userId must not be null") Long> userIds;
}

