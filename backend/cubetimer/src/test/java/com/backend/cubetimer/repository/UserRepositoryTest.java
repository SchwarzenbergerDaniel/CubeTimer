package com.backend.cubetimer.repository;

import com.backend.cubetimer.entities.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void shouldFindUserByUsername() {
        User user = new User();
        user.setUsername("speedcuber");
        user.setPassword("password123");
        userRepository.save(user);

        Optional<User> found = userRepository.findByUsername("speedcuber");

        assertTrue(found.isPresent());
        assertEquals("speedcuber", found.get().getUsername());
    }

    @Test
    void shouldReturnTrueIfUsernameExists() {
        User user = new User();
        user.setUsername("existingUser");
        user.setPassword("password");
        userRepository.save(user);

        assertTrue(userRepository.existsByUsername("existingUser"));
        assertFalse(userRepository.existsByUsername("nonExistent"));
    }
}