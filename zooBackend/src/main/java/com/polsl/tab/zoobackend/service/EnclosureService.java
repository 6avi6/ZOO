package com.polsl.tab.zoobackend.service;

import com.polsl.tab.zoobackend.dto.enclosure.EnclosureRequest;
import com.polsl.tab.zoobackend.dto.enclosure.EnclosureResponse;
import com.polsl.tab.zoobackend.exception.ResourceNotFoundException;
import com.polsl.tab.zoobackend.mapper.EnclosureMapper;
import com.polsl.tab.zoobackend.model.Enclosure;
import com.polsl.tab.zoobackend.repository.EnclosureRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EnclosureService {
    private final EnclosureRepository enclosureRepository;
    private final EnclosureMapper enclosureMapper;

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
        enclosureRepository.deleteById(id);
    }
}
