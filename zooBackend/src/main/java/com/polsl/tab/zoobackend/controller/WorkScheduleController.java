package com.polsl.tab.zoobackend.controller;

import com.polsl.tab.zoobackend.dto.workSchedule.WorkScheduleRequest;
import com.polsl.tab.zoobackend.dto.workSchedule.WorkScheduleResponse;
import com.polsl.tab.zoobackend.mapper.WorkScheduleMapper;
import com.polsl.tab.zoobackend.model.WorkSchedule;
import com.polsl.tab.zoobackend.service.WorkScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public ResponseEntity<WorkScheduleResponse> create(@RequestBody WorkScheduleRequest req) {
        WorkSchedule entity = new WorkSchedule();
        entity.setShiftStart(req.getShiftStart());
        entity.setShiftEnd(req.getShiftEnd());

        WorkSchedule created = workScheduleService.create(entity, req.getUserIds());
        return new ResponseEntity<>(workScheduleMapper.toDtoWithUsers(created), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkScheduleResponse> getById(@PathVariable Long id) {
        WorkSchedule ws = workScheduleService.getById(id);
        return ResponseEntity.ok(workScheduleMapper.toDtoWithUsers(ws));
    }

    @GetMapping
    public ResponseEntity<List<WorkScheduleResponse>> getAll() {
        List<WorkSchedule> list = workScheduleService.getAll();
        List<WorkScheduleResponse> dtos = list.stream()
                .map(workScheduleMapper::toDtoWithUsers)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/paged")
    public ResponseEntity<Page<WorkScheduleResponse>> getAllPaged(Pageable pageable) {
        Page<WorkSchedule> pageEnt = workScheduleService.getAll(pageable);
        Page<WorkScheduleResponse> pageDto = pageEnt.map(workScheduleMapper::toDtoWithUsers);
        return ResponseEntity.ok(pageDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkScheduleResponse> update(
            @PathVariable Long id,
            @RequestBody WorkScheduleRequest dto) {
        WorkSchedule updated = workScheduleService.update(id, dto);
        return ResponseEntity.ok(workScheduleMapper.toDtoWithUsers(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        workScheduleService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/date-range")
    public ResponseEntity<List<WorkScheduleResponse>> getByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        List<WorkScheduleResponse> dtos = workScheduleService.getByDateRange(start, end).stream()
                .map(workScheduleMapper::toDtoWithUsers)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }
}

