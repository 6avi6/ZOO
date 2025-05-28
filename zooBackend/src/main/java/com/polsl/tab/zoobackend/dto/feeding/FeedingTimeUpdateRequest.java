package com.polsl.tab.zoobackend.dto.feeding;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

@Data
public class FeedingTimeUpdateRequest {
    private LocalDate startDate;
    private LocalDate endDate;
    @JsonFormat(pattern = "HH:mm")
    @Schema(type = "string", example = "14:30", format = "HH:mm")
    private LocalTime newTime;
    private Set<Long> animalIds; // identified ty animals
}

