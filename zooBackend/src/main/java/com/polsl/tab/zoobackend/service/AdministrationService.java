package com.polsl.tab.zoobackend.service;

import com.polsl.tab.zoobackend.dto.user.UserProfileDTO;
import com.polsl.tab.zoobackend.dto.user.UserSearchCriteriaDTO;
import com.polsl.tab.zoobackend.dto.user.UserUpdateRequest;
import com.polsl.tab.zoobackend.exception.BadRequestException;
import com.polsl.tab.zoobackend.exception.ResourceNotFoundException;
import com.polsl.tab.zoobackend.model.Animal;
import com.polsl.tab.zoobackend.model.User;
import com.polsl.tab.zoobackend.model.Role;
import com.polsl.tab.zoobackend.repository.AnimalRepository;
import com.polsl.tab.zoobackend.repository.UserRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.ArrayList;


import java.util.List;

@Service
@RequiredArgsConstructor
public class AdministrationService {
    private final AnimalRepository animalRepository;
    private final UserRepository userRepository;

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

    public Page<User> searchUsers(UserSearchCriteriaDTO criteria, Pageable pageable) {
        return userRepository.findAll((root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (criteria.getUsername() != null)
                predicates.add(cb.equal(root.get("username"), criteria.getUsername()));

            if (criteria.getEmail() != null)
                predicates.add(cb.equal(root.get("email"), criteria.getEmail()));

            if (criteria.getFirstName() != null)
                predicates.add(cb.like(cb.lower(root.get("firstName")), "%" + criteria.getFirstName().toLowerCase() + "%"));

            if (criteria.getLastName() != null)
                predicates.add(cb.like(cb.lower(root.get("lastName")), "%" + criteria.getLastName().toLowerCase() + "%"));

            if (criteria.getRole() != null)
                predicates.add(cb.equal(root.get("role"), criteria.getRole()));

            if (criteria.getHireDateFrom() != null)
                predicates.add(cb.greaterThanOrEqualTo(root.get("hireDate"), criteria.getHireDateFrom()));

            if (criteria.getHireDateTo() != null)
                predicates.add(cb.lessThanOrEqualTo(root.get("hireDate"), criteria.getHireDateTo()));

            return cb.and(predicates.toArray(new Predicate[0]));
        }, pageable);
    }

    public boolean userExists(Long id) { return userRepository.existsById(id); }

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

    public void assignAnimals(Long employeeId, List<Long> animalIds) {
        User employee = userRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + employeeId));

        List<Animal> animals = animalRepository.findAllById(animalIds);
        employee.getAssignedAnimals().addAll(animals);
        animals.forEach(a -> a.getAssignedUsers().add(employee));

        animalRepository.saveAll(animals);
    }
}
