package com.polsl.tab.zoobackend.service;

import com.polsl.tab.zoobackend.dto.user.UserNameLastNameDTO;
import com.polsl.tab.zoobackend.mapper.UserMapper;
import com.polsl.tab.zoobackend.model.*;
import com.polsl.tab.zoobackend.repository.*;
import com.polsl.tab.zoobackend.dto.report.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.*;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final UserRepository userRepository;
    private final EnclosureRepository enclosureRepository;
    private final AnimalRepository animalRepository;
    private final UserMapper userMapper;

    public List<EmployeeReportDto> getEmployeesReport() {
        return userRepository.findAll().stream()
                .map(u -> new EmployeeReportDto(
                        u.getId(),
                        u.getFirstName(),
                        u.getLastName(),
                        u.getRole().name()
                ))
                .collect(Collectors.toList());
    }

    public List<EnclosureReportDto> getEnclosuresReport() {
        return enclosureRepository.findAll().stream()
                .map(e -> new EnclosureReportDto(
                        e.getId(),
                        e.getTerrainType().toString(),
                        e.getMaxAnimals(),
                        // zabezpieczamy przed null
                        e.getAnimals() != null ? e.getAnimals().size() : 0
                ))
                .collect(Collectors.toList());
    }

    public List<AnimalCaregiverDto> getAnimalsWithCaregivers() {
        return animalRepository.findAll().stream()
                .map(a -> new AnimalCaregiverDto(
                        a.getId(),
                        a.getName(),
                        a.getAssignedUsers().stream()
                                .map(userMapper::toNameLastNameDto)
                                .collect(Collectors.toList())
                )).collect(Collectors.toList());
    }

    public List<SickAnimalDto> getSickAnimalsReport() {
        return animalRepository.findAll().stream()
                .flatMap(a -> {
                    if (a.getAnimalTreatmentCards() == null) {
                        return Stream.empty();
                    }
                    return a.getAnimalTreatmentCards().stream()
                            .filter(v -> v.getSymptoms() != null && !v.getSymptoms().isEmpty())
                            .map(v -> {
                                String disease = v.getSymptoms().stream()
                                        .map(Symptom::getName)
                                        .collect(Collectors.joining(", "));
                                String treatment = v.getDescription();

                                return new SickAnimalDto(
                                        a.getId(),
                                        a.getName(),
                                        disease,
                                        treatment
                                );
                            });
                })
                .collect(Collectors.toList());
    }
}
