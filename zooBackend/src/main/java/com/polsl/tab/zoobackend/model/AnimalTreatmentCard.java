package com.polsl.tab.zoobackend.model;

import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name = "animal_treatment_card")
@Getter
@Setter
public class AnimalTreatmentCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String description;
    
    @Column(nullable = false)
    private LocalDateTime dateTime;

    @ManyToMany
    @JoinTable(
        name = "animal_treatment_card",
        joinColumns = @JoinColumn(name = "animal_treatment_card_id"),
        inverseJoinColumns = @JoinColumn(name = "symptom_id")
    )
    private Set<Symptom> symptoms = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "animal_id", nullable = false)
    @JsonBackReference
    private Animal animal;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User assignedUser;
}