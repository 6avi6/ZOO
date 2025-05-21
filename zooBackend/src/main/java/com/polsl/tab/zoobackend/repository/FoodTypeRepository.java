package com.polsl.tab.zoobackend.repository;

import com.polsl.tab.zoobackend.model.FoodType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FoodTypeRepository extends JpaRepository<FoodType, Long> {
    Optional<FoodType> findByName(String name);
}
