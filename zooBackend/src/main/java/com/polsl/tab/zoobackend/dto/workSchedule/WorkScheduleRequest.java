package com.polsl.tab.zoobackend.dto.workSchedule;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkScheduleRequest {
    private LocalDateTime shiftStart;
    private LocalDateTime shiftEnd;
    private List<Long> userIds;
}

