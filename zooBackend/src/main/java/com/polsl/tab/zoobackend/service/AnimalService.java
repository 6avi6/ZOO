package com.polsl.tab.zoobackend.service;

import com.polsl.tab.zoobackend.dto.animal.AnimalRequest;
import com.polsl.tab.zoobackend.dto.animal.AnimalResponse;
import com.polsl.tab.zoobackend.dto.user.UserSummaryDTO;
import com.polsl.tab.zoobackend.exception.ResourceNotFoundException;
import com.polsl.tab.zoobackend.mapper.AnimalMapper;
import com.polsl.tab.zoobackend.mapper.UserMapper;
import com.polsl.tab.zoobackend.model.Animal;
import com.polsl.tab.zoobackend.model.Enclosure;
import com.polsl.tab.zoobackend.model.Feeding;
import com.polsl.tab.zoobackend.model.User;
import com.polsl.tab.zoobackend.repository.AnimalRepository;
import com.polsl.tab.zoobackend.repository.EnclosureRepository;
import com.polsl.tab.zoobackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnimalService {

    private final AnimalRepository animalRepository;
    private final EnclosureRepository enclosureRepository;
    private final UserRepository userRepository;
    private final AnimalMapper animalMapper;
    private final UserMapper userMapper;

    public List<AnimalResponse> getAll() {
        return animalRepository.findAll().stream()
                .map(animalMapper::toResponse)
                .collect(Collectors.toList());
    }

    public AnimalResponse getById(Long id) {
        Animal animal = animalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Animal not found with id " + id));
        return animalMapper.toResponse(animal);
    }

    public AnimalResponse create(AnimalRequest dto) {
        Enclosure enclosure = enclosureRepository.findById(dto.getEnclosureId())
                .orElseThrow(() -> new ResourceNotFoundException("Enclosure not found with id " + dto.getEnclosureId()));

        Animal animal = animalMapper.toEntity(dto);
        animal.setEnclosure(enclosure);

        return animalMapper.toResponse(animalRepository.save(animal));
    }

    public AnimalResponse update(Long id, AnimalRequest dto) {
        Animal existing = animalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Animal not found with id " + id));

        animalMapper.updateEntity(existing, dto);

        if (dto.getEnclosureId() != null) {
            Enclosure enclosure = enclosureRepository.findById(dto.getEnclosureId())
                    .orElseThrow(() -> new ResourceNotFoundException("Enclosure not found with id " + dto.getEnclosureId()));
            existing.setEnclosure(enclosure);
        }

        return animalMapper.toResponse(animalRepository.save(existing));
    }

    public void delete(Long id) {
        Animal animal = animalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Animal not found with id " + id));

        for (Feeding feeding : animal.getFeedings()) {
            feeding.getAnimals().remove(animal);
        }
        animal.getFeedings().clear();

        animalRepository.delete(animal);
    }

    public List<AnimalResponse> getAnimalsByIds(Set<Long> ids) {
        return animalRepository.findAllByIdIn(ids)
                .stream()
                .map(animalMapper::toResponse)
                .toList();
    }


    public List<UserSummaryDTO> getCaretakers(Long id) {
        Animal animal = animalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Animal not found with id " + id));
        return animal.getAssignedUsers().stream()
                .map(userMapper::toSummaryDto)
                .collect(Collectors.toList());
    }

    public void addCaretakers(Long animalId, List<Long> employeeIds) {
        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new ResourceNotFoundException("Animal not found with id " + employeeIds));

        List<User> employees = userRepository.findAllById(employeeIds);
        animal.getAssignedUsers().addAll(employees);
        animalRepository.save(animal);
    }

    public String deleteCaretakers(Long animalId, List<Long> employeeIds) {
        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new ResourceNotFoundException("Animal not found with id " + employeeIds));

        Set<User> assignedUsers = animal.getAssignedUsers();
        Set<Long> assignedUserIds = assignedUsers.stream()
                .map(User::getId)
                .collect(Collectors.toSet());

        List<Long> notAssignedIds = employeeIds.stream()
                .filter(id -> !assignedUserIds.contains(id))
                .toList();

        assignedUsers.removeIf(user -> employeeIds.contains(user.getId()));

        animalRepository.save(animal);

        if (notAssignedIds.isEmpty()) {
            return "All caretakers successfully removed.";
        } else {
            return "Some IDs were not assigned as caretakers and were skipped: " + notAssignedIds;
        }
    }

    public boolean transferAnimals(Long targetEnclosureId,
                                  List<Long> animalIds) {
        Enclosure targetEnclosure = enclosureRepository.findWithAnimalsById(targetEnclosureId)
                .orElseThrow(() -> new ResourceNotFoundException("Enclosure not found with id " + targetEnclosureId));

        List<Animal> animalsToTransfer = animalRepository.findAllById(animalIds);

        int newTotal = targetEnclosure.getMaxAnimals() + animalsToTransfer.size();

        for (Animal animal : animalsToTransfer) {
            animal.setEnclosure(targetEnclosure);
        }

        animalRepository.saveAll(animalsToTransfer);
        return newTotal > targetEnclosure.getMaxAnimals();
    }
}
