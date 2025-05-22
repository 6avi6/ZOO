package com.polsl.tab.zoobackend.service;

import com.polsl.tab.zoobackend.dto.enclosure.EnclosureRequest;
import com.polsl.tab.zoobackend.dto.enclosure.EnclosureResponse;
import com.polsl.tab.zoobackend.dto.enclosure.EnclosureSummary;
import com.polsl.tab.zoobackend.exception.ConflictException;
import com.polsl.tab.zoobackend.exception.ResourceNotFoundException;
import com.polsl.tab.zoobackend.mapper.EnclosureMapper;
import com.polsl.tab.zoobackend.model.Animal;
import com.polsl.tab.zoobackend.model.Enclosure;
import com.polsl.tab.zoobackend.repository.AnimalRepository;
import com.polsl.tab.zoobackend.repository.EnclosureRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
public class EnclosureService {
    private final EnclosureRepository enclosureRepository;
    private final EnclosureMapper enclosureMapper;
    private final AnimalRepository animalRepository;

    public List<EnclosureResponse> getAll() {
        return enclosureRepository.findAll().stream()
                .map(enclosureMapper::toResponse)
                .toList();
    }

    public EnclosureResponse getById(Long id) {
        return enclosureRepository.findById(id)
                .map(enclosureMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Enclosure not found with id " + id));
    }

    public EnclosureResponse create(EnclosureRequest dto) {
        Enclosure enclosure = enclosureMapper.toEntity(dto);
        return enclosureMapper.toResponse(enclosureRepository.save(enclosure));
    }

    public EnclosureResponse update(Long id, EnclosureRequest dto) {
        Enclosure existing = enclosureRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enclosure not found with id " + id));
        enclosureMapper.updateEntity(existing, dto);
        return enclosureMapper.toResponse(enclosureRepository.save(existing));
    }

    public void delete(Long id) {
        Enclosure enclosure = enclosureRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enclosure not found with id: " + id));

        if (enclosure.getAnimals() != null && !enclosure.getAnimals().isEmpty()) {
            throw new ConflictException("Cannot delete enclosure: it still contains animals.");
        }

        enclosureRepository.delete(enclosure);
    }

    @Transactional
    public boolean transferAnimals(Long sourceId, Long targetId) {
        Enclosure source = enclosureRepository.findWithAnimalsById(sourceId)
                .orElseThrow(() -> new ResourceNotFoundException("Source enclosure not found, id: " + sourceId));
        Enclosure target = enclosureRepository.findById(targetId)
                .orElseThrow(() -> new ResourceNotFoundException("Target enclosure not found, id: " + targetId));

        List<Animal> animalsToTransfer = source.getAnimals();

        for (Animal animal : animalsToTransfer) {
            animal.setEnclosure(target);
        }

        animalRepository.saveAll(animalsToTransfer);

        int totalAnimalsInTarget = target.getAnimals().size() + animalsToTransfer.size();

        return totalAnimalsInTarget > target.getMaxAnimals();
    }

    public List<EnclosureSummary> getFreeEnclosureSummaries() {
        return enclosureRepository.findFreeEnclosures();
    }
}
