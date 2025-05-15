package com.polsl.tab.zoobackend.service;

import com.polsl.tab.zoobackend.dto.symptom.SymptomRequest;
import com.polsl.tab.zoobackend.dto.symptom.SymptomResponse;
import com.polsl.tab.zoobackend.exception.ResourceNotFoundException;
import com.polsl.tab.zoobackend.mapper.SymptomMapper;
import com.polsl.tab.zoobackend.model.Symptom;
import com.polsl.tab.zoobackend.repository.SymptomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SymptomService {

    private final SymptomRepository symptomRepository;
    private final SymptomMapper symptomMapper;

    public List<SymptomResponse> getAllSymptoms() {
        return symptomRepository.findAll().stream()
                .map(symptomMapper::toDto)
                .collect(Collectors.toList());
    }

    public SymptomResponse getSymptomById(Long id) {
        Symptom symptom = symptomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Symptom not found with id " + id));
        return symptomMapper.toDto(symptom);
    }

    public SymptomResponse createSymptom(SymptomRequest dto) {
        Symptom symptom = new Symptom();
        symptom.setName(dto.getName());
        symptom.setDescription(dto.getDescription());
        return symptomMapper.toDto(symptomRepository.save(symptom));
    }

    public SymptomResponse updateSymptom(Long id, SymptomRequest dto) {
        Symptom symptom = symptomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Symptom not found with id " + id));
        symptom.setName(dto.getName());
        symptom.setDescription(dto.getDescription());
        return symptomMapper.toDto(symptomRepository.save(symptom));
    }

    public void deleteSymptom(Long id) {
        symptomRepository.deleteById(id);
    }
}