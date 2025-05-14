package com.polsl.tab.zoobackend.dto.feeding;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalTime;
import java.util.Set;

@Data
@AllArgsConstructor
public class FeedingResponse {
    private Long id;
    private LocalTime feedingTime;
    private Boolean isCompleted;
    private Long foodTypeId;
    private Set<Long> animalIds;
    private Set<Long> userIds;
}