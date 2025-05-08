package com.polsl.tab.zoobackend.service;

import com.polsl.tab.zoobackend.dto.user.UserProfileDTO;
import com.polsl.tab.zoobackend.dto.user.UserUpdateRequest;
import com.polsl.tab.zoobackend.exception.BadRequestException;
import com.polsl.tab.zoobackend.exception.ResourceNotFoundException;
import com.polsl.tab.zoobackend.model.User;
import com.polsl.tab.zoobackend.model.Role;
import com.polsl.tab.zoobackend.repository.UserRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.ArrayList;


import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public User getUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Page<User> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client with ID " + id + " not found"));
    }

    public List<User> searchUsers(String username, String email, String firstName, String lastName) {
        return userRepository.findAll((root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (username != null) predicates.add(cb.equal(root.get("username"), username));
            if (email != null) predicates.add(cb.equal(root.get("email"), email));
            if (firstName != null) predicates.add(cb.like(cb.lower(root.get("firstName")), "%" + firstName.toLowerCase() + "%"));
            if (lastName != null) predicates.add(cb.like(cb.lower(root.get("lastName")), "%" + lastName.toLowerCase() + "%"));
            return cb.and(predicates.toArray(new Predicate[0]));
        });
    }

    public Page<User> searchUsers(String username, String email, String firstName, String lastName, Pageable pageable) {
        return userRepository.findAll((root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (username != null) predicates.add(cb.equal(root.get("username"), username));
            if (email != null) predicates.add(cb.equal(root.get("email"), email));
            if (firstName != null) predicates.add(cb.like(cb.lower(root.get("firstName")), "%" + firstName.toLowerCase() + "%"));
            if (lastName != null) predicates.add(cb.like(cb.lower(root.get("lastName")), "%" + lastName.toLowerCase() + "%"));
            return cb.and(predicates.toArray(new Predicate[0]));
        }, pageable);
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

    public void changePassword(String username, String oldPassword, String newPassword) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new BadRequestException("Old password is incorrect.");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}

