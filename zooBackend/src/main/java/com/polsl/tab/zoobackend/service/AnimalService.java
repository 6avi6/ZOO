package com.polsl.tab.zoobackend.service;

import com.polsl.tab.zoobackend.model.Animal;
import com.polsl.tab.zoobackend.model.Enclosure;
import com.polsl.tab.zoobackend.repository.AnimalRepository;
import com.polsl.tab.zoobackend.repository.EnclosureRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnimalService {

    private final AnimalRepository animalRepository;
    private final EnclosureRepository enclosureRepository;

    public AnimalService(AnimalRepository animalRepository, EnclosureRepository enclosureRepository) {
        this.animalRepository = animalRepository;
        this.enclosureRepository = enclosureRepository;
    }

    public List<Animal> getAll() {
        return animalRepository.findAll();
    }

    public Optional<Animal> getById(Long id) {
        return animalRepository.findById(id);
    }

    public Animal create(Animal animal) {
        Enclosure enclosure = enclosureRepository.findById(animal.getEnclosure().getId())
                .orElseThrow(() -> new RuntimeException("Enclosure not found"));
        animal.setEnclosure(enclosure);
        return animalRepository.save(animal);
    }

    public Animal update(Long id, Animal updatedAnimal) {
        return animalRepository.findById(id)
                .map(existing -> {
                    existing.setName(updatedAnimal.getName());
                    existing.setBirthDate(updatedAnimal.getBirthDate());
                    existing.setSpecies(updatedAnimal.getSpecies());
                    existing.setCondition(updatedAnimal.getCondition());
                    existing.setSex(updatedAnimal.getSex());
                    existing.setWeight(updatedAnimal.getWeight());

                    Enclosure enclosure = enclosureRepository.findById(updatedAnimal.getEnclosure().getId())
                            .orElseThrow(() -> new RuntimeException("Enclosure not found"));
                    existing.setEnclosure(enclosure);

                    return animalRepository.save(existing);
                }).orElseThrow(() -> new RuntimeException("Animal not found"));
    }

    public void delete(Long id) {
        animalRepository.deleteById(id);
    }
}
