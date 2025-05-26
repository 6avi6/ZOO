package com.polsl.tab.zoobackend.service;

import com.polsl.tab.zoobackend.dto.feeding.FeedingDeleteRequest;
import com.polsl.tab.zoobackend.dto.feeding.FeedingResponse;
import com.polsl.tab.zoobackend.dto.feeding.FeedingRequest;
import com.polsl.tab.zoobackend.dto.feeding.FeedingTimeUpdateRequest;
import com.polsl.tab.zoobackend.model.Feeding;
import com.polsl.tab.zoobackend.model.FoodType;
import com.polsl.tab.zoobackend.model.Animal;
import com.polsl.tab.zoobackend.model.User;
import com.polsl.tab.zoobackend.exception.ResourceNotFoundException;
import com.polsl.tab.zoobackend.mapper.FeedingMapper;
import com.polsl.tab.zoobackend.repository.AnimalRepository;
import com.polsl.tab.zoobackend.repository.FeedingRepository;
import com.polsl.tab.zoobackend.repository.FoodTypeRepository;
import com.polsl.tab.zoobackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class FeedingService {
    private final FeedingRepository feedingRepo;
    private final FoodTypeRepository foodTypeRepo;
    private final AnimalRepository animalRepo;
    private final UserRepository userRepo;
    private final FeedingMapper feedingMapper;

    public List<FeedingResponse> getAll() {
        return feedingRepo.findAll().stream()
                .map(feedingMapper::toResponse)
                .collect(Collectors.toList());
    }

    public FeedingResponse getById(Long id) {
        Feeding f = feedingRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Feeding not found " + id));
        return feedingMapper.toResponse(f);
    }

    public FeedingResponse create(FeedingRequest dto) {
        FoodType ft = foodTypeRepo.findById(dto.getFoodTypeId())
                .orElseThrow(() -> new ResourceNotFoundException("FoodType not found " + dto.getFoodTypeId()));
        Set<Animal> animals = dto.getAnimalIds().stream()
                .map(aid -> animalRepo.findById(aid)
                        .orElseThrow(() -> new ResourceNotFoundException("Animal not found " + aid)))
                .collect(Collectors.toSet());
        Set<User> users = dto.getUserIds().stream()
                .map(uid -> userRepo.findById(uid)
                        .orElseThrow(() -> new ResourceNotFoundException("User not found " + uid)))
                .collect(Collectors.toSet());
        Feeding feeding = feedingMapper.toEntity(dto);
        feeding.setFoodType(ft);
        feeding.setAnimals(animals);
        feeding.setFeedingUsers(users);
        return feedingMapper.toResponse(feedingRepo.save(feeding));
    }

    public FeedingResponse update(Long id, FeedingRequest dto) {
        Feeding existing = feedingRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Feeding not found " + id));
        feedingMapper.updateEntity(existing, dto);

        FoodType ft = foodTypeRepo.findById(dto.getFoodTypeId())
                .orElseThrow(() -> new ResourceNotFoundException("FoodType not found " + dto.getFoodTypeId()));
        existing.setFoodType(ft);

        Set<Animal> animals = dto.getAnimalIds().stream()
                .map(aid -> animalRepo.findById(aid)
                        .orElseThrow(() -> new ResourceNotFoundException("Animal not found " + aid)))
                .collect(Collectors.toSet());
        existing.setAnimals(animals);

        Set<User> users = dto.getUserIds().stream()
                .map(uid -> userRepo.findById(uid)
                        .orElseThrow(() -> new ResourceNotFoundException("User not found " + uid)))
                .collect(Collectors.toSet());
        existing.setFeedingUsers(users);

        return feedingMapper.toResponse(feedingRepo.save(existing));
    }

    public void delete(Long id) {
        feedingRepo.deleteById(id);
    }

    @Transactional
    public void repeatFeeding(Long feedingId, int repeatDays) {
        Feeding original = feedingRepo.findById(feedingId)
                .orElseThrow(() -> new RuntimeException("Feeding not found"));

        repeatFeeding(original, repeatDays);
    }

    public void repeatFeeding(Feeding original, int repeatDays) {
        List<Feeding> copies = new ArrayList<>();

        for (int i = 1; i <= repeatDays; i++) {
            Feeding copy = new Feeding();
            copy.setFeedingDateTime(original.getFeedingDateTime().plusDays(i));
            copy.setIsCompleted(false);
            copy.setFoodType(original.getFoodType());
            copy.setAnimals(new HashSet<>(original.getAnimals()));
            copy.setFeedingUsers(new HashSet<>(original.getFeedingUsers()));
            copies.add(copy);
        }

        feedingRepo.saveAll(copies);
    }

    public Integer updateFeedingTimeInRange(FeedingTimeUpdateRequest request) {
        List<Feeding> feedings = feedingRepo
                .findByFeedingDateTimeBetweenAndAnimals_IdIn(
                        request.getStartDate().atStartOfDay(),
                        request.getEndDate().atTime(23, 59),
                        request.getAnimalIds()
                );

        for (Feeding feeding : feedings) {
            LocalDate date = feeding.getFeedingDateTime().toLocalDate();
            feeding.setFeedingDateTime(LocalDateTime.of(date, request.getNewTime()));
        }

        feedingRepo.saveAll(feedings);
        return feedings.size();
    }

    public Integer deleteFeedingsInRange(FeedingDeleteRequest request) {
        List<Feeding> feedings = feedingRepo
                .findByFeedingDateTimeBetweenAndAnimals_IdIn(
                        request.getStartDate().atStartOfDay(),
                        request.getEndDate().atTime(23, 59),
                        request.getAnimalIds()
                );

        feedingRepo.deleteAll(feedings);
        return feedings.size();
    }

    public void markFeedingsAsCompleted(List<Long> feedingIds) {
        List<Feeding> feedings = feedingRepo.findAllById(feedingIds);

        for (Feeding feeding : feedings) {
            feeding.setIsCompleted(true);
        }

        feedingRepo.saveAll(feedings);
    }
}