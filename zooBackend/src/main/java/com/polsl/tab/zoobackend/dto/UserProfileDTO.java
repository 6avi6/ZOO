package com.polsl.tab.zoobackend.dto;

import com.polsl.tab.zoobackend.model.Role;
import com.polsl.tab.zoobackend.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
public class UserProfileDTO {
    private Long id;
    private String username;
    private Role role;

    public UserProfileDTO(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.role = user.getRole();
    }
}
