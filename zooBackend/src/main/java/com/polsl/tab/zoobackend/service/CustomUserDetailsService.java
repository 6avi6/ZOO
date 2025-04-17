package com.polsl.tab.zoobackend.service;

import com.polsl.tab.zoobackend.model.User;
import com.polsl.tab.zoobackend.model.Role;
import com.polsl.tab.zoobackend.dto.UserSummaryDTO;
import com.polsl.tab.zoobackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public User getUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public Optional<User> getUserById(Long userId) { return userRepository.findById(userId); }

    public List<UserSummaryDTO> getAllUsers() {
        return userRepository.findAll().stream().map(UserSummaryDTO::new).collect(Collectors.toList());
    }

    public boolean userExists(String username) {
        return userRepository.existsByUsername(username);
    }
    public boolean userExists(Long id) { return userRepository.existsById(id); }

    public void createUser(String username, String encodedPassword, Role role) {
        User user = new User(username, encodedPassword, role);
        userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public void updateUser(User user) { userRepository.save(user); }

    public void updateUserRole(Long userId, Role role)  throws UsernameNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.setRole(role);
        userRepository.save(user);
    }
}

