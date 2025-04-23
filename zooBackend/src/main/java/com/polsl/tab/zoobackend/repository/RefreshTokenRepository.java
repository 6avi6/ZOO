package com.polsl.tab.zoobackend.repository;

import com.polsl.tab.zoobackend.model.RefreshToken;
import com.polsl.tab.zoobackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
    Optional<RefreshToken> findByUser(User user);
}
