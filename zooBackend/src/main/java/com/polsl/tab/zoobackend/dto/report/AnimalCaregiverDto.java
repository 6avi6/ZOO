package com.polsl.tab.zoobackend.dto.report;

import com.polsl.tab.zoobackend.dto.user.UserNameLastNameDTO;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class AnimalCaregiverDto {
    private Long animalId;
    private String animalName;
    private List<UserNameLastNameDTO> caregivers;
}
