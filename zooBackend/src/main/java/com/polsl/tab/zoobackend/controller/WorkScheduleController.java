package com.polsl.tab.zoobackend.controller;

import com.polsl.tab.zoobackend.dto.WorkScheduleDto;
import com.polsl.tab.zoobackend.mapper.WorkScheduleMapper;
import com.polsl.tab.zoobackend.model.WorkSchedule;
import com.polsl.tab.zoobackend.service.WorkScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/work-schedules")
@RequiredArgsConstructor
public class WorkScheduleController {

    private final WorkScheduleService workScheduleService;
    private final WorkScheduleMapper workScheduleMapper;

    @PostMapping
    public ResponseEntity<WorkScheduleDto> create(@RequestBody WorkScheduleDto req) {
        WorkSchedule entity = new WorkSchedule();
        entity.setShiftStart(req.getShiftStart());
        entity.setShiftEnd(req.getShiftEnd());

        WorkSchedule created = workScheduleService.create(entity, req.getUserIds());
        return new ResponseEntity<>(workScheduleMapper.toDtoWithUsers(created), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkScheduleDto> getById(@PathVariable Long id) {
        WorkSchedule ws = workScheduleService.getById(id);
        return ResponseEntity.ok(workScheduleMapper.toDtoWithUsers(ws));
    }

    @GetMapping
    public ResponseEntity<List<WorkScheduleDto>> getAll() {
        List<WorkSchedule> list = workScheduleService.getAll();
        List<WorkScheduleDto> dtos = list.stream()
                .map(workScheduleMapper::toDtoWithUsers)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/paged")
    public ResponseEntity<Page<WorkScheduleDto>> getAllPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<WorkSchedule> pageEnt = workScheduleService.getAll(PageRequest.of(page, size));
        Page<WorkScheduleDto> pageDto = pageEnt.map(workScheduleMapper::toDtoWithUsers);
        return ResponseEntity.ok(pageDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkScheduleDto> update(
            @PathVariable Long id,
            @RequestBody WorkScheduleDto dto) {
        WorkSchedule updated = workScheduleService.update(id, dto);
        return ResponseEntity.ok(workScheduleMapper.toDtoWithUsers(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        workScheduleService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/date-range")
    public ResponseEntity<List<WorkScheduleDto>> getByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        List<WorkScheduleDto> dtos = workScheduleService.getByDateRange(start, end).stream()
                .map(workScheduleMapper::toDtoWithUsers)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }
}

