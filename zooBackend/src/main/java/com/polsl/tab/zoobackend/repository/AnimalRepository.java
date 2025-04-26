package com.polsl.tab.zoobackend.repository;

import com.polsl.tab.zoobackend.model.Animal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalRepository extends JpaRepository<Animal, Long> {
}
