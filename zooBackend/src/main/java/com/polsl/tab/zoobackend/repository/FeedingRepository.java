package com.polsl.tab.zoobackend.repository;

import com.polsl.tab.zoobackend.model.Feeding;
import com.polsl.tab.zoobackend.model.FoodType;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

public interface FeedingRepository extends JpaRepository<Feeding, Long> {
    @Modifying
    @Transactional
    @Query("""
      UPDATE Feeding f
      SET f.foodType = :foodType
      WHERE f IN (
        SELECT f2 FROM Feeding f2
        JOIN f2.animals a
        WHERE a.id IN :animalIds
      )
    """)
    int updateFoodTypeForAnimals(FoodType foodType,
                                 Set<Long> animalIds);

    @Modifying
    @Transactional
    @Query("""
    UPDATE Feeding f
    SET f.feedingDateTime = :newDateTime
    WHERE f.id IN :feedingIds
      AND EXISTS (
        SELECT 1 FROM f.feedingUsers u
        WHERE u.id = :userId
      )
    """)
    int shiftFeedingTime(
            LocalDateTime newDateTime,
            List<Long> feedingIds,
            Long userId
    );

    @EntityGraph(attributePaths = {
            "animals",
            "animals.species",
            "animals.enclosure"
    })
    List<Feeding> findAllByFeedingUsers_IdAndIsCompletedFalse(Long userId);

    @EntityGraph(attributePaths = {
            "animals",
            "animals.species",
            "animals.enclosure"
    })
    List<Feeding> findAllByFeedingUsers_IdAndIsCompletedTrue(Long userId);

    @Query("""
    SELECT DISTINCT f FROM Feeding f
    JOIN f.animals a
    WHERE f.feedingDateTime BETWEEN :start AND :end
    AND a.id IN :animalIds
    """)
    List<Feeding> findByFeedingDateTimeBetweenAndAnimals_IdIn(
            LocalDateTime start,
            LocalDateTime end,
            Set<Long> animalIds
    );

    @Query("""
    SELECT DISTINCT f FROM Feeding f
    JOIN f.animals a
    JOIN f.feedingUsers u
    WHERE f.feedingDateTime BETWEEN :start AND :end
    AND a.id IN :animalIds
    AND u.id = :id
    """)
    List<Feeding> findByUserIdAndFeedingDateTimeBetweenAndAnimals_IdIn(
            LocalDateTime start,
            LocalDateTime end,
            Set<Long> animalIds,
            Long id
    );
    @Query("""
    SELECT f FROM Feeding f
    JOIN f.feedingUsers u
    WHERE f.id IN :feedingIds
    AND u.id = :userId
    """)
    List<Feeding> findAllByIdInAndFeedingUsersContains(List<Long> feedingIds,
                                                       Long userId);
}
