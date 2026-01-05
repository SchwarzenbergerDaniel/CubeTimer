package com.backend.cubetimer.security;

import io.github.bucket4j.Bucket;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RateLimitServiceTest {

    private RateLimitService rateLimitService;

    @BeforeEach
    void setUp() {
        rateLimitService = new RateLimitService();
    }

    @Test
    void shouldReturnSameBucketForSameIp() {
        String ip = "192.168.1.1";
        Bucket bucket1 = rateLimitService.resolveBucket(ip);
        Bucket bucket2 = rateLimitService.resolveBucket(ip);

        assertSame(bucket1, bucket2, "Should return the existing bucket for the same IP");
    }

    @Test
    void shouldReturnDifferentBucketsForDifferentIps() {
        Bucket bucket1 = rateLimitService.resolveBucket("1.1.1.1");
        Bucket bucket2 = rateLimitService.resolveBucket("2.2.2.2");

        assertNotSame(bucket1, bucket2);
    }
}