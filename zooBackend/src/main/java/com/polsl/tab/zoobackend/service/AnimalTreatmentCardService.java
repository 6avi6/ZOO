package com.polsl.tab.zoobackend.service;

import com.polsl.tab.zoobackend.dto.animalTreatmentCard.AnimalTreatmentCardRequest;
import com.polsl.tab.zoobackend.dto.animalTreatmentCard.AnimalTreatmentCardResponse;
import com.polsl.tab.zoobackend.exception.ResourceNotFoundException;
import com.polsl.tab.zoobackend.mapper.AnimalTreatmentCardMapper;
import com.polsl.tab.zoobackend.model.Animal;
import com.polsl.tab.zoobackend.model.Symptom;
import com.polsl.tab.zoobackend.model.User;
import com.polsl.tab.zoobackend.model.AnimalTreatmentCard;
import com.polsl.tab.zoobackend.repository.AnimalRepository;
import com.polsl.tab.zoobackend.repository.SymptomRepository;
import com.polsl.tab.zoobackend.repository.UserRepository;
import com.polsl.tab.zoobackend.repository.AnimalTreatmentCardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnimalTreatmentCardService {

    private final AnimalTreatmentCardRepository visitRepository;
    private final AnimalRepository animalRepository;
    private final UserRepository userRepository;
    private final SymptomRepository symptomRepository;
    private final AnimalTreatmentCardMapper animalTreatmentCardMapper;

    public List<AnimalTreatmentCardResponse> getAllVisits() {
        return visitRepository.findAll()
                .stream()
                .map(animalTreatmentCardMapper::toDto)
                .collect(Collectors.toList());
    }

    public AnimalTreatmentCardResponse getVisitById(Long id) {
        AnimalTreatmentCard visit = visitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Veterinary visit not found with id: " + id));
        return animalTreatmentCardMapper.toDto(visit);
    }

    @Transactional
    public AnimalTreatmentCardResponse createVisit(AnimalTreatmentCardRequest dto) {
        Animal animal = animalRepository.findById(dto.getAnimalId())
                .orElseThrow(() -> new ResourceNotFoundException("Animal not found with id: " + dto.getAnimalId()));

        User vet = userRepository.findById(dto.getVeterinarianId())
                .orElseThrow(() -> new ResourceNotFoundException("Veterinarian not found with id: " + dto.getVeterinarianId()));

        Set<Symptom> symptoms = symptomRepository.findAllById(dto.getSymptomIds())
                .stream().collect(Collectors.toSet());

        AnimalTreatmentCard visit = animalTreatmentCardMapper.toEntity(dto);
        visit.setAnimal(animal);
        visit.setAssignedUser(vet);
        visit.setSymptoms(symptoms);

        visit = visitRepository.save(visit);
        return animalTreatmentCardMapper.toDto(visit);
    }

    @Transactional
    public AnimalTreatmentCardResponse updateVisit(Long id, AnimalTreatmentCardRequest dto) {
        AnimalTreatmentCard animalTreatmentCard = visitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Animal treatment card not found with id: " + id));

        animalTreatmentCardMapper.updateEntity(animalTreatmentCard, dto);

        if (dto.getAnimalId() != null) {
            Animal animal = animalRepository.findById(dto.getAnimalId())
                    .orElseThrow(() -> new ResourceNotFoundException("Animal not found with id: " + dto.getAnimalId()));
            animalTreatmentCard.setAnimal(animal);
        }

        if (dto.getVeterinarianId() != null) {
            User vet = userRepository.findById(dto.getVeterinarianId())
                    .orElseThrow(() -> new ResourceNotFoundException("Veterinarian not found with id: " + dto.getVeterinarianId()));
            animalTreatmentCard.setAssignedUser(vet);
        }

        if (dto.getSymptomIds() != null) {
            Set<Symptom> symptoms = symptomRepository.findAllById(dto.getSymptomIds())
                    .stream().collect(Collectors.toSet());
            animalTreatmentCard.setSymptoms(symptoms);
        }

        animalTreatmentCard = visitRepository.save(animalTreatmentCard);
        return animalTreatmentCardMapper.toDto(animalTreatmentCard);
    }

    public void deleteVisit(Long id) {
        visitRepository.deleteById(id);
    }
}
