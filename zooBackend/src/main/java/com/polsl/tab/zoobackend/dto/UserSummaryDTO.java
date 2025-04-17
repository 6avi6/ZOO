package com.polsl.tab.zoobackend.dto;

import com.polsl.tab.zoobackend.model.Role;
import com.polsl.tab.zoobackend.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserSummaryDTO {
    private Long id;
    private String username;
    private Role role;

    public UserSummaryDTO(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.role = user.getRole();
    }
}

