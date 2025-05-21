package com.polsl.tab.zoobackend.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserNameLastNameDTO {
    private Long id;
    private String firstName;
    private String lastName;
}
