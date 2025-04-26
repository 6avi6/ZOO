package com.polsl.tab.zoobackend.service;

import com.polsl.tab.zoobackend.model.Enclosure;
import com.polsl.tab.zoobackend.repository.EnclosureRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnclosureService {
    private final EnclosureRepository enclosureRepository;

    public EnclosureService(EnclosureRepository enclosureRepository) {
        this.enclosureRepository = enclosureRepository;
    }

    public List<Enclosure> getAll() {
        return enclosureRepository.findAll();  
    }

    public Optional<Enclosure> getById(Long id) {
        return enclosureRepository.findById(id);
    }

    public Enclosure create(Enclosure enclosure) {
        return enclosureRepository.save(enclosure);
    }

    public Enclosure update(Long id, Enclosure updated) {
        return enclosureRepository.findById(id)
                .map(existing -> {
                    existing.setTerrainType(updated.getTerrainType());
                    existing.setIsAccessWater(updated.getIsAccessWater());
                    existing.setInsolation(updated.getInsolation());
                    existing.setTemperature(updated.getTemperature());
                    existing.setMaxAnimals(updated.getMaxAnimals());
                    return enclosureRepository.save(existing);
                }).orElseThrow(() -> new RuntimeException("Enclosure not found"));
    }

    public void delete(Long id) {
        enclosureRepository.deleteById(id);
    }
}
