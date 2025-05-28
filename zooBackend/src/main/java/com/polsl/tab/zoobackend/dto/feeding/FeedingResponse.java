package com.polsl.tab.zoobackend.dto.feeding;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
public class FeedingResponse {
    private Long id;
    private LocalDateTime feedingDateTime;
    private Boolean isCompleted;
    private Long foodTypeId;
    private Long enclosureId;
    private Set<Long> animalIds;
    private Set<Long> userIds;
}