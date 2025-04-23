package com.polsl.tab.zoobackend.dto.user;

import com.polsl.tab.zoobackend.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserSummaryDTO {
    private Long id;
    private String username;
    private Role role;
}

