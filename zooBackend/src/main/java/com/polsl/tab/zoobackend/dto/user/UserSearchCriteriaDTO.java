package com.polsl.tab.zoobackend.dto.user;

import com.polsl.tab.zoobackend.model.Role;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class UserSearchCriteriaDTO {
    private Integer id;
    private String username;
    private Role role;
    private String firstName;
    private String lastName;

    @Email
    private String email;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate hireDateFrom;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate hireDateTo;
}