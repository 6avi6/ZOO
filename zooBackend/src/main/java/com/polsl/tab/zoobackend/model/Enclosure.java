package com.polsl.tab.zoobackend.model;

import lombok.*;
import jakarta.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "enclosures")
@Getter
@Setter

public class Enclosure {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String terrainType;

    @Column(nullable = false)
    private Boolean isAccessWater;

    @Column(nullable = false)
    private String insolation;

    @Column(nullable = false)
    private Number temperature;

    @Column(nullable = false)
    private Number maxAnimals;

    @OneToMany(mappedBy = "enclosure", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Animal> animals;
}
