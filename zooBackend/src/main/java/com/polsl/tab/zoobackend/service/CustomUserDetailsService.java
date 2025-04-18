package com.polsl.tab.zoobackend.service;

import com.polsl.tab.zoobackend.dto.user.UserProfileDTO;
import com.polsl.tab.zoobackend.dto.user.UserUpdateRequest;
import com.polsl.tab.zoobackend.exception.ResourceNotFoundException;
import com.polsl.tab.zoobackend.model.User;
import com.polsl.tab.zoobackend.model.Role;
import com.polsl.tab.zoobackend.dto.user.UserSummaryDTO;
import com.polsl.tab.zoobackend.repository.UserRepository;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client with ID " + id + " not found"));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
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

    public User updateUser(Long id, UserUpdateRequest updateRequest) {
        User existingClient = getUserById(id);
        updateCommonFields(existingClient, updateRequest.getUsername(), updateRequest.getFirstName(),
                updateRequest.getLastName(), updateRequest.getEmail(), id);
        return userRepository.save(existingClient);
    }

    public User updateUser(Long id, UserProfileDTO updateRequest) {
        User existingClient = getUserById(id);
        updateCommonFields(existingClient, updateRequest.getUsername(), updateRequest.getFirstName(),
                updateRequest.getLastName(), updateRequest.getEmail(), id);

        // Admin-only fields
        if (updateRequest.getRole() != null)
            existingClient.setRole(updateRequest.getRole());

        if (updateRequest.getHireDate() != null)
            existingClient.setHireDate(updateRequest.getHireDate());

        return userRepository.save(existingClient);
    }

    private void updateCommonFields(User user, String username, String firstName, String lastName, String email, Long id) {
        if (username != null) {
            if (userRepository.existsByUsernameAndIdNot(username, id)) {
                throw new DataIntegrityViolationException("Username is already taken.");
            }
            user.setUsername(username);
        }

        if (firstName != null)
            user.setFirstName(firstName);

        if (lastName != null)
            user.setLastName(lastName);

        if (email != null) {
            boolean emailTaken = userRepository.existsByEmailAndIdNot(email, id);
            if (emailTaken) {
                throw new DataIntegrityViolationException("Email is already taken.");
            }
            user.setEmail(email);
        }
    }
}

