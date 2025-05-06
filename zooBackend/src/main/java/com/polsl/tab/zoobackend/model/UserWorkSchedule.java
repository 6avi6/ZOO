package com.polsl.tab.zoobackend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "user_work_schedule")
@Data
public class UserWorkSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "work_schedule_id", nullable = false)
    private WorkSchedule workSchedule;
}
