package com.polsl.tab.zoobackend.model;

import lombok.*;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;

@Entity
@Table(name = "symptoms")
@Getter @Setter
public class Symptom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description; 

    @ManyToMany(mappedBy = "symptoms")
    private Set<AnimalTreatmentCard> animalTreatmentCards = new HashSet<>();
}