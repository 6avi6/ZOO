package com.polsl.tab.zoobackend.service;

import com.polsl.tab.zoobackend.dto.animal.AnimalResponse;
import com.polsl.tab.zoobackend.dto.caregiver.ChangeEnclosureRequest;
import com.polsl.tab.zoobackend.dto.caregiver.ChangeFeedingTimeRequest;
import com.polsl.tab.zoobackend.dto.caregiver.ChangeFoodTypeRequest;
import com.polsl.tab.zoobackend.dto.feeding.FeedingResponse;
import com.polsl.tab.zoobackend.exception.ResourceNotFoundException;
import com.polsl.tab.zoobackend.exception.UnauthorizedException;
import com.polsl.tab.zoobackend.mapper.AnimalMapper;
import com.polsl.tab.zoobackend.mapper.FeedingMapper;
import com.polsl.tab.zoobackend.model.Animal;
import com.polsl.tab.zoobackend.model.Feeding;
import com.polsl.tab.zoobackend.model.FoodType;
import com.polsl.tab.zoobackend.model.User;
import com.polsl.tab.zoobackend.repository.AnimalRepository;
import com.polsl.tab.zoobackend.repository.FeedingRepository;
import com.polsl.tab.zoobackend.repository.FoodTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class caregiverService {

    private final AnimalService animalService;
    private final AnimalRepository animalRepository;
    private final FoodTypeRepository foodTypeRepository;
    private final FeedingRepository feedingRepository;
    private final AnimalMapper animalMapper;
    private final FeedingMapper feedingMapper;

    public void updateEnclosure(User user, ChangeEnclosureRequest request) {
        validateOwnership(user, request.getAnimalIDs());
        animalRepository.updateEnclosureForAnimals(request.getEnclosureID(), request.getAnimalIDs());
    }

    public void updateFoodType(User user, ChangeFoodTypeRequest request) {
        validateOwnership(user, request.getAnimalIDs());
        FoodType ft = foodTypeRepository.findById(request.getFoodTypeID())
                .orElseThrow(() -> new ResourceNotFoundException("FoodType not found with id " + request.getFoodTypeID()));

        int updated = feedingRepository.updateFoodTypeForAnimals(ft, request.getAnimalIDs());
        if (updated == 0) {
            throw new ResourceNotFoundException("No feeding entries found for those animals");
        }
    }

    public int updateFeedingTime(User user, ChangeFeedingTimeRequest req) {
        validateOwnership(user, req.getAnimalIDs());

        int updated = feedingRepository.shiftFeedingTimeForAnimals(
                req.getOldFeedingTime(),
                req.getNewFeedingTime(),
                req.getAnimalIDs()
        );

        if (updated == 0) {
            throw new ResourceNotFoundException("No feeding entries at "
                    + req.getOldFeedingTime()
                    + " for those animals");
        }
        return updated;
    }

    private void validateOwnership(User user, Set<Long> requestedIDs) {
        Set<Long> actualIDs = user.getAssignedAnimals().stream()
                .map(Animal::getId)
                .collect(Collectors.toSet());
        Set<Long> missing = requestedIDs.stream()
                .filter(id -> !actualIDs.contains(id))
                .collect(Collectors.toSet());
        if (!missing.isEmpty()) {
            throw new UnauthorizedException("You do not have access to animal IDs: " + missing);
        }
    }

    public List<AnimalResponse> getMyAnimals(User user) {
        List<Animal> animals = animalRepository.findAllByAssignedUsers_Id(user.getId());

        return animals.stream()
                .map(animalMapper::toResponse)
                .collect(Collectors.toList());
    }

    public List<FeedingResponse> getMyFeedings(User user) {
        List<Feeding> feedings = feedingRepository.findAllByFeedingUsers_Id(user.getId());
        return feedings.stream()
                .map(feedingMapper::toResponse)
                .collect(Collectors.toList());
    }
}
