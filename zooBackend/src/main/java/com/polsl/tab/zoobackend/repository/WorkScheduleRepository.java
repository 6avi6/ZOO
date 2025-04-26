package com.polsl.tab.zoobackend.repository;

import com.polsl.tab.zoobackend.model.WorkSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface WorkScheduleRepository extends JpaRepository<WorkSchedule, Long> {
    List<WorkSchedule> findByShiftStartBetween(LocalDateTime start, LocalDateTime end);
    List<WorkSchedule> findByUserWorkSchedule_User_Id(Long userId);
    List<WorkSchedule> findByUserWorkSchedule_User_IdAndShiftStartBetween(Long userId, LocalDateTime start, LocalDateTime end);
}