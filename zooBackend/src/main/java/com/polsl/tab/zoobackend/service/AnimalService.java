package com.polsl.tab.zoobackend.service;

import com.polsl.tab.zoobackend.dto.animal.AnimalRequest;
import com.polsl.tab.zoobackend.dto.animal.AnimalResponse;
import com.polsl.tab.zoobackend.exception.ResourceNotFoundException;
import com.polsl.tab.zoobackend.mapper.AnimalMapper;
import com.polsl.tab.zoobackend.model.Animal;
import com.polsl.tab.zoobackend.model.Enclosure;
import com.polsl.tab.zoobackend.repository.AnimalRepository;
import com.polsl.tab.zoobackend.repository.EnclosureRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnimalService {

    private final AnimalRepository animalRepository;
    private final EnclosureRepository enclosureRepository;
    private final AnimalMapper animalMapper;

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
        animalRepository.deleteById(id);
    }
}
