package com.polsl.tab.zoobackend.controller;

import com.polsl.tab.zoobackend.dto.report.*;
import com.polsl.tab.zoobackend.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/employees")
    public ResponseEntity<List<EmployeeReportDto>> employeesReport() {
        return ResponseEntity.ok(reportService.getEmployeesReport());
    }

    @GetMapping("/enclosures")
    public ResponseEntity<List<EnclosureReportDto>> enclosuresReport() {
        return ResponseEntity.ok(reportService.getEnclosuresReport());
    }

    @GetMapping("/animals-caregivers")
    public ResponseEntity<List<AnimalCaregiverDto>> animalsCaregiversReport() {
        return ResponseEntity.ok(reportService.getAnimalsWithCaregivers());
    }

    @GetMapping("/sick-animals")
    public ResponseEntity<List<SickAnimalDto>> sickAnimalsReport() {
        return ResponseEntity.ok(reportService.getSickAnimalsReport());
    }
}
