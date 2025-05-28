package com.polsl.tab.zoobackend.model;

import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

@Entity
@Table(name = "feedings")
@Getter 
@Setter
public class Feeding {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime feedingDateTime;

    @Column(nullable = false)
    private Boolean isCompleted = false;

    @ManyToOne
    @JoinColumn(name = "food_type_id", nullable = false)
    private FoodType foodType;

    @ManyToMany
    @JoinTable(
        name = "animal_feedings",
        joinColumns = @JoinColumn(name = "feeding_id"),
        inverseJoinColumns = @JoinColumn(name = "animal_id")
    )
    private Set<Animal> animals;

    @ManyToMany
    @JoinTable(
        name = "user_feedings",
        joinColumns = @JoinColumn(name = "feeding_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> feedingUsers;
}
