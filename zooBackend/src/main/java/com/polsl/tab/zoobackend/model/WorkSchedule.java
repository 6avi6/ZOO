package com.polsl.tab.zoobackend.model;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "work_schedules")
@Data
public class WorkSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime shiftStart;
    private LocalDateTime shiftEnd;

    @OneToMany(mappedBy = "workSchedule", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserWorkSchedule> userWorkSchedule;
}