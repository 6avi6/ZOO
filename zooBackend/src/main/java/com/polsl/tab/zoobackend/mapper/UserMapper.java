package com.polsl.tab.zoobackend.mapper;

import com.polsl.tab.zoobackend.dto.user.UserProfileDTO;
import com.polsl.tab.zoobackend.dto.user.UserSummaryDTO;
import com.polsl.tab.zoobackend.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toEntity(UserProfileDTO userProfileDTO);
    UserProfileDTO toProfileDto(User user);
    UserSummaryDTO toSummaryDto(User user);
}
