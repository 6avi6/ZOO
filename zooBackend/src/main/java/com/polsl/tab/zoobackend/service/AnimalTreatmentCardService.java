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

    private final AnimalTreatmentCardRepository animalTreatmentCardRepository;
    private final AnimalRepository animalRepository;
    private final UserRepository userRepository;
    private final SymptomRepository symptomRepository;
    private final AnimalTreatmentCardMapper animalTreatmentCardMapper;

    public List<AnimalTreatmentCardResponse> getAllTreatmentCards() {
        return animalTreatmentCardRepository.findAll()
                .stream()
                .map(animalTreatmentCardMapper::toDto)
                .collect(Collectors.toList());
    }

    public AnimalTreatmentCardResponse getTreatmentCardById(Long id) {
        AnimalTreatmentCard animalTreatmentCard = animalTreatmentCardRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Animal Treatment Card not found with id: " + id));
        return animalTreatmentCardMapper.toDto(animalTreatmentCard);
    }

    @Transactional
    public AnimalTreatmentCardResponse createTreatmentCard(AnimalTreatmentCardRequest dto) {
        Animal animal = animalRepository.findById(dto.getAnimalId())
                .orElseThrow(() -> new ResourceNotFoundException("Animal not found with id: " + dto.getAnimalId()));

        User vet = userRepository.findById(dto.getVeterinarianId())
                .orElseThrow(() -> new ResourceNotFoundException("Veterinarian not found with id: " + dto.getVeterinarianId()));

        Set<Symptom> symptoms = symptomRepository.findAllById(dto.getSymptomIds())
                .stream().collect(Collectors.toSet());

        AnimalTreatmentCard animalTreatmentCard = animalTreatmentCardMapper.toEntity(dto);
        animalTreatmentCard.setAnimal(animal);
        animalTreatmentCard.setAssignedUser(vet);
        animalTreatmentCard.setSymptoms(symptoms);

        animalTreatmentCard = animalTreatmentCardRepository.save(animalTreatmentCard);
        return animalTreatmentCardMapper.toDto(animalTreatmentCard);
    }

    @Transactional
    public AnimalTreatmentCardResponse updateTreatmentCard(Long id, AnimalTreatmentCardRequest dto) {
        AnimalTreatmentCard animalTreatmentCard = animalTreatmentCardRepository.findById(id)
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

        animalTreatmentCard = animalTreatmentCardRepository.save(animalTreatmentCard);
        return animalTreatmentCardMapper.toDto(animalTreatmentCard);
    }

    public void deleteTreatmentCard(Long id) {
        animalTreatmentCardRepository.deleteById(id);
    }
}
