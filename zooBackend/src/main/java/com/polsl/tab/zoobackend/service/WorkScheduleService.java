package com.polsl.tab.zoobackend.service;


import com.polsl.tab.zoobackend.dto.WorkScheduleDto;
import com.polsl.tab.zoobackend.exception.ResourceNotFoundException;
import com.polsl.tab.zoobackend.model.User;
import com.polsl.tab.zoobackend.model.UserWorkSchedule;
import com.polsl.tab.zoobackend.model.WorkSchedule;
import com.polsl.tab.zoobackend.repository.UserRepository;
import com.polsl.tab.zoobackend.repository.WorkScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkScheduleService {

    private final WorkScheduleRepository workScheduleRepository;
    private final UserRepository userRepository;


    public WorkSchedule create(WorkSchedule schedule, List<Long> userIds) {
        List<User> users = userRepository.findAllById(userIds);
        WorkSchedule saved = workScheduleRepository.save(schedule);

        List<UserWorkSchedule> links = users.stream()
                .map(user -> {
                    UserWorkSchedule uw = new UserWorkSchedule();
                    uw.setUser(user);
                    uw.setWorkSchedule(saved);
                    return uw;
                })
                .collect(Collectors.toList());

        saved.setUserWorkSchedule(links);
        return workScheduleRepository.save(saved);
    }

    public WorkSchedule getById(Long id) {
        return workScheduleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("WorkSchedule not found with id " + id));
    }

    public List<WorkSchedule> getAll() {
        return workScheduleRepository.findAll();
    }

    public Page<WorkSchedule> getAll(Pageable pageable) {
        return workScheduleRepository.findAll(pageable);
    }

    public WorkSchedule update(Long id, WorkScheduleDto dto) {
        WorkSchedule existing = getById(id);
        existing.setShiftStart(dto.getShiftStart());
        existing.setShiftEnd(dto.getShiftEnd());

        existing.getUserWorkSchedule().clear();

        List<User> users = userRepository.findAllById(dto.getUserIds());

        for (User user : users) {
            UserWorkSchedule uw = new UserWorkSchedule();
            uw.setUser(user);
            uw.setWorkSchedule(existing);
            existing.getUserWorkSchedule().add(uw);
        }

        return workScheduleRepository.save(existing);
    }

    public void delete(Long id) {
        workScheduleRepository.deleteById(id);
    }

    public List<WorkSchedule> getByDateRange(LocalDateTime start, LocalDateTime end) {
        return workScheduleRepository.findByShiftStartBetween(start, end);
    }

    public List<WorkSchedule> getByUser(Long userId) {
        return workScheduleRepository.findByUserWorkSchedule_User_Id(userId);
    }

    public List<WorkSchedule> getByUserAndDateRange(Long userId, LocalDateTime start, LocalDateTime end) {
        return workScheduleRepository.findByUserWorkSchedule_User_IdAndShiftStartBetween(userId, start, end);
    }
}

