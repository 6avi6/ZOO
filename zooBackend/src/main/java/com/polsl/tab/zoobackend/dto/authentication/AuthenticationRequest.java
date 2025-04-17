package com.polsl.tab.zoobackend.dto.authentication;

import com.polsl.tab.zoobackend.model.Role;
import lombok.*;

@Data
public class AuthenticationRequest {
    private String username;
    private String password;
}