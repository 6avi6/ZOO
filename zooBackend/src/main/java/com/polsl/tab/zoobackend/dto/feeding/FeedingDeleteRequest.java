package com.polsl.tab.zoobackend.dto.feeding;

import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

@Data
public class FeedingDeleteRequest {
    private LocalDate startDate;
    private LocalDate endDate;
    private Set<Long> animalIds; // identified ty animals
}

