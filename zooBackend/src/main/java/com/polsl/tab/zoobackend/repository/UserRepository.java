package com.polsl.tab.zoobackend.repository;

import com.polsl.tab.zoobackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
    boolean existsByEmailAndIdNot(String email, Long id);
    boolean existsByUsernameAndIdNot(String username, Long id);
    boolean existsByEmail(String email);
}

