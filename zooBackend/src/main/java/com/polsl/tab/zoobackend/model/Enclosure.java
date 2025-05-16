package com.polsl.tab.zoobackend.model;

import lombok.*;
import jakarta.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "enclosures")
@Data
public class Enclosure {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TerrainType terrainType;

    @Column(nullable = false)
    private Boolean isAccessWater;

    @Column(nullable = false)
    private String insolation;

    @Column(nullable = false)
    private Double temperature;

    @Column(nullable = false)
    private Integer maxAnimals;

    @OneToMany(mappedBy = "enclosure", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Animal> animals;
}
