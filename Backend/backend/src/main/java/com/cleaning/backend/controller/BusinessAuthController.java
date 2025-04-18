package com.cleaning.backend.controller;

import com.cleaning.backend.dto.BusinessLoginRequestDto;
import com.cleaning.backend.model.BusinessUser;
import com.cleaning.backend.service.BusinessAuthService;
import com.cleaning.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/business/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class BusinessAuthController {
    private final BusinessAuthService authService;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody BusinessLoginRequestDto dto) {
        BusinessUser u = authService.login(dto.getUsername(), dto.getPassword());
        if (u == null)
            return ResponseEntity.status(401).body("Invalid credentials");
        String token = jwtUtil.generateToken(u.getUsername(), "BUSINESS", u.getId());
        return ResponseEntity.ok(Map.of("token", token));
    }
}
