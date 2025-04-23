package com.polsl.tab.zoobackend.dto.user;

import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserUpdateRequest {
    private String username;
    private String firstName;
    private String lastName;
    @Email(message = "A valid email is required")
    private String email;
}
