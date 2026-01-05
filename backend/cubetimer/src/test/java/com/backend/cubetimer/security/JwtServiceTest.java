package com.backend.cubetimer.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;

class JwtServiceTest {

    private JwtService jwtService;
    private UserDetails userDetails;

    // A sample Base64 encoded 256-bit key
    private final String secretKey = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";

    @BeforeEach
    void setUp() {
        jwtService = new JwtService();
        ReflectionTestUtils.setField(jwtService, "secretKey", secretKey);
        ReflectionTestUtils.setField(jwtService, "accessTokenExpiration", 900000L);
        ReflectionTestUtils.setField(jwtService, "refreshTokenExpiration", 604800000L);

        userDetails = new User("testuser", "password", Collections.emptyList());
    }

    @Test
    void shouldGenerateValidToken() {
        String token = jwtService.generateAccessToken(userDetails);

        assertNotNull(token);
        assertEquals("testuser", jwtService.extractUsername(token));
    }

    @Test
    void shouldValidateCorrectToken() {
        String token = jwtService.generateAccessToken(userDetails);
        assertTrue(jwtService.isTokenValid(token, userDetails));
    }

    @Test
    void shouldFailValidationForDifferentUser() {
        String token = jwtService.generateAccessToken(userDetails);
        UserDetails otherUser = new User("intruder", "password", Collections.emptyList());

        assertFalse(jwtService.isTokenValid(token, otherUser));
    }
}