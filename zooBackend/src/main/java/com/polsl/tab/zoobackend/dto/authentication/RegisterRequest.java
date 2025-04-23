package com.polsl.tab.zoobackend.dto.authentication;

import com.polsl.tab.zoobackend.model.Role;
import lombok.*;

@Data
public class RegisterRequest {
    private String username;
    private String password;
    private Role role;
}
