package com.polsl.tab.zoobackend.repository;

import com.polsl.tab.zoobackend.model.Enclosure;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EnclosureRepository extends JpaRepository<Enclosure, Long> {
    @EntityGraph(attributePaths = "animals")
    Optional<Enclosure> findWithAnimalsById(Long id);
}
