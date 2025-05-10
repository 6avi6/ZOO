package com.polsl.tab.zoobackend.mapper;

import com.polsl.tab.zoobackend.dto.WorkScheduleDto;
import com.polsl.tab.zoobackend.model.WorkSchedule;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface WorkScheduleMapper {
    WorkScheduleDto toDto(WorkSchedule entity);
    default WorkScheduleDto toDtoWithUsers(WorkSchedule entity) {
        List<Long> userIds = entity.getUserWorkSchedule().stream()
                .map(uw -> uw.getUser().getId())
                .collect(Collectors.toList());
        return new WorkScheduleDto(
                entity.getId(),
                entity.getShiftStart(),
                entity.getShiftEnd(),
                userIds
        );
    }

    WorkSchedule toEntity(WorkScheduleDto dto);
}

