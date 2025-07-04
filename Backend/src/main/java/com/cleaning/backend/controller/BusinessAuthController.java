package com.cleaning.backend.controller;

import com.cleaning.backend.dto.BusinessLoginRequestDto;
import com.cleaning.backend.model.BusinessUser;
import com.cleaning.backend.model.auth.BusinessUserDetails;
import com.cleaning.backend.service.BusinessAuthService;
import com.cleaning.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/business/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class BusinessAuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody BusinessLoginRequestDto dto) {
        try {
            // Spring Security 인증 처리
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword())
            );

            // 인증 성공 시 BusinessUserDetails에서 정보 추출
            BusinessUserDetails userDetails = (BusinessUserDetails) authentication.getPrincipal();

            // 토큰 발급 (role 및 ID 포함)
            String token = jwtUtil.generateToken(
                    userDetails.getUsername(),
                    "BUSINESS",
                    userDetails.getBusinessUser().getId()
            );

            return ResponseEntity.ok(Map.of("token", token));
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

}
