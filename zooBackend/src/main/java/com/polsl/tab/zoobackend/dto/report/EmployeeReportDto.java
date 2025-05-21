package com.polsl.tab.zoobackend.dto.report;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EmployeeReportDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String role;
}
