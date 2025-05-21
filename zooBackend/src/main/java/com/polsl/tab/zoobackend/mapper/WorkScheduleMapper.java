package com.polsl.tab.zoobackend.mapper;

import com.polsl.tab.zoobackend.dto.workSchedule.WorkScheduleRequest;
import com.polsl.tab.zoobackend.dto.workSchedule.WorkScheduleResponse;
import com.polsl.tab.zoobackend.model.WorkSchedule;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface WorkScheduleMapper {
    WorkScheduleResponse toDto(WorkSchedule entity);
    default WorkScheduleResponse toDtoWithUsers(WorkSchedule entity) {
        List<Long> userIds = entity.getUserWorkSchedule().stream()
                .map(uw -> uw.getUser().getId())
                .collect(Collectors.toList());
        return new WorkScheduleResponse(
                entity.getId(),
                entity.getShiftStart(),
                entity.getShiftEnd(),
                userIds
        );
    }

    WorkSchedule toEntity(WorkScheduleRequest dto);
}

