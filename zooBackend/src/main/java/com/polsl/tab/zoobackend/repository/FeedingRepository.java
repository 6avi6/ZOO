package com.polsl.tab.zoobackend.repository;

import com.polsl.tab.zoobackend.model.Feeding;
import com.polsl.tab.zoobackend.model.FoodType;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

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
    int updateFoodTypeForAnimals(@Param("foodType") FoodType foodType,
                                 @Param("animalIds") Set<Long> animalIds);

    @Modifying
    @Transactional
    @Query("""
      UPDATE Feeding f
      SET f.feedingTime = :newTime
      WHERE f.feedingTime = :oldTime
        AND EXISTS (
          SELECT 1 FROM Feeding f2
          JOIN f2.animals a
          WHERE f2 = f AND a.id IN :animalIds
        )
    """)
    int shiftFeedingTimeForAnimals(
            @Param("oldTime") LocalTime oldTime,
            @Param("newTime") LocalTime newTime,
            @Param("animalIds") Set<Long> animalIds
    );

    @EntityGraph(attributePaths = {
            "animals",
            "animals.species",
            "animals.enclosure"
    })
    List<Feeding> findAllByFeedingUsers_Id(Long userId);
}
