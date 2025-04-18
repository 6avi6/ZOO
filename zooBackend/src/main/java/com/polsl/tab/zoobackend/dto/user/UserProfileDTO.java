package com.polsl.tab.zoobackend.dto.user;

import com.polsl.tab.zoobackend.model.Role;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class UserProfileDTO {
    private String username;
    private Role role;
    private String firstName;
    private String lastName;
    @Email(message = "A valid email is required")
    private String email;
    private LocalDate hireDate;
}
