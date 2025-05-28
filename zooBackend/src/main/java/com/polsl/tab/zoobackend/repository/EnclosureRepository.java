package com.polsl.tab.zoobackend.repository;

import com.polsl.tab.zoobackend.dto.enclosure.EnclosureSummary;
import com.polsl.tab.zoobackend.model.Enclosure;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface EnclosureRepository extends JpaRepository<Enclosure, Long> {
    @EntityGraph(attributePaths = "animals")
    Optional<Enclosure> findWithAnimalsById(Long id);
    @Query("""
        SELECT e.id      AS id,
               e.terrainType AS terrainType,
               e.maxAnimals  AS maxAnimals,
               COUNT(a)      AS currentCount
        FROM Enclosure e
        LEFT JOIN e.animals a
        GROUP BY e.id, e.terrainType, e.maxAnimals
        HAVING COUNT(a) < e.maxAnimals
    """)
    List<EnclosureSummary> findFreeEnclosures();
}
