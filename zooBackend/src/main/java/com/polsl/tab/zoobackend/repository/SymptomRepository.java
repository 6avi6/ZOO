package com.polsl.tab.zoobackend.repository;


import com.polsl.tab.zoobackend.model.Symptom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SymptomRepository extends JpaRepository<Symptom, Long> {
}
