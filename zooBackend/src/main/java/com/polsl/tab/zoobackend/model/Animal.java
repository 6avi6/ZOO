package com.polsl.tab.zoobackend.model;

import lombok.*;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

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
    private Number weight;

    @ManyToOne
    @JoinColumn(name = "enclosure_id", nullable = false)
    @JsonBackReference
    private Enclosure enclosure;
}
