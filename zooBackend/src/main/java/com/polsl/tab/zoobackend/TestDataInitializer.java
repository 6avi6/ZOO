package com.polsl.tab.zoobackend;

import com.polsl.tab.zoobackend.model.Role;
import com.polsl.tab.zoobackend.model.User;
import com.polsl.tab.zoobackend.repository.UserRepository;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TestDataInitializer {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void init() {
        if (userRepository.count() == 0) {
            for (Role role : Role.values()) {
                String roleLower = role.name().toLowerCase();
                String username = roleLower;
                String password = roleLower;
                String encodedPassword = passwordEncoder.encode(password);

                User user = new User(username, encodedPassword, role);
                userRepository.save(user);
            }
        }
    }
}
