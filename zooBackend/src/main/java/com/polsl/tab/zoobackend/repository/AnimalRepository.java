package com.polsl.tab.zoobackend.repository;

import com.polsl.tab.zoobackend.model.Animal;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.Set;

public interface AnimalRepository extends JpaRepository<Animal, Long> {
    List<Animal> findAllByIdIn(Collection<Long> ids);

    @Transactional
    @Modifying
    @Query("UPDATE Animal a " +
            "SET a.enclosure.id = :enclosureId " +
            "WHERE a.id IN :animalIds")
    int updateEnclosureForAnimals(@Param("enclosureId") Long enclosureId, @Param("animalIds") Set<Long> animalIds);

    @EntityGraph(attributePaths = {"species", "enclosure"})
    List<Animal> findAllByAssignedUsers_Id(Long userId);

    @EntityGraph(attributePaths = {"species", "feedings"})
    List<Animal> findAllWithFeedingsByAssignedUsers_Id(Long userId);
}
