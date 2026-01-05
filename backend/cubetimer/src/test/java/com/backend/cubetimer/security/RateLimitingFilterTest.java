package com.backend.cubetimer.security;

import io.github.bucket4j.Bucket;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;

import java.io.IOException;
import java.io.PrintWriter;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RateLimitingFilterTest {

    @Mock
    private RateLimitService rateLimitService;
    @Mock
    private Bucket bucket;
    @Mock
    private HttpServletRequest request;
    @Mock
    private HttpServletResponse response;
    @Mock
    private FilterChain filterChain;
    @Mock
    private PrintWriter printWriter;

    @InjectMocks
    private RateLimitingFilter rateLimitingFilter;

    @Test
    void shouldAllowRequestWhenTokensAvailable() throws ServletException, IOException {
        when(request.getRequestURI()).thenReturn("/api/auth/login");
        when(request.getRemoteAddr()).thenReturn("127.0.0.1");
        when(rateLimitService.resolveBucket("127.0.0.1")).thenReturn(bucket);
        when(bucket.tryConsume(1)).thenReturn(true);

        rateLimitingFilter.doFilterInternal(request, response, filterChain);

        verify(filterChain).doFilter(request, response);
    }

    @Test
    void shouldBlockRequestWhenTokensExhausted() throws ServletException, IOException {
        when(request.getRequestURI()).thenReturn("/api/auth/register");
        when(request.getRemoteAddr()).thenReturn("127.0.0.1");
        when(rateLimitService.resolveBucket("127.0.0.1")).thenReturn(bucket);
        when(bucket.tryConsume(1)).thenReturn(false);
        when(response.getWriter()).thenReturn(printWriter);

        rateLimitingFilter.doFilterInternal(request, response, filterChain);

        verify(response).setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
        verifyNoInteractions(filterChain);
    }
}