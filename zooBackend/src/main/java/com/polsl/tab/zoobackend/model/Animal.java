package com.polsl.tab.zoobackend.model;

import lombok.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

@Entity
@Table(name = "animals")
@Getter
@Setter

public class Animal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private LocalDate birthDate;

    @Column(nullable = false)
    private String name;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Species species;

    @Column(nullable = false)
    private String condition;

    @Column(nullable = false)
    private String sex;

    @Column(nullable = false)
    private Double weight;

    @ManyToOne
    @JoinColumn(name = "enclosure_id", nullable = false)
    @JsonBackReference
    private Enclosure enclosure;

    @OneToMany(mappedBy = "animal", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<AnimalTreatmentCard> animalTreatmentCards;

    @ManyToMany
    @JoinTable(
        name = "animal_users",
        joinColumns = @JoinColumn(name = "animal_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> assignedUsers = new HashSet<>();

    @ManyToMany(mappedBy = "animals")
    private Set<Feeding> feedings = new HashSet<>();
}
