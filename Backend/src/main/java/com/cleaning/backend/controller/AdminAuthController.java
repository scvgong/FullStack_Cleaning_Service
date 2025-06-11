package com.cleaning.backend.controller;

import com.cleaning.backend.dto.AdminLoginRequestDto;
import com.cleaning.backend.model.AdminUser;
import com.cleaning.backend.service.serviceimpl.AdminAuthServiceImpl;
import com.cleaning.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/auth")
@RequiredArgsConstructor
public class AdminAuthController {
//    private final AdminAuthServiceImpl authService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AdminLoginRequestDto loginDto) {
        try{
            // Spring Security 인증 시도 → 여기서 AdminUserDetailsServiceImpl 호출됨
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDto.getUsername(),
                            loginDto.getPassword()
                    )
            );

            //인증된 사용자 정보 가져오기
            User user =  (User) authentication.getPrincipal();

            //JWT 발급(role, id는 DB에서 따로 조회하거나 추후 커스텀 UserDetails 구현시 추가 가능)
            String token = jwtUtil.generateToken(user.getUsername(), user.getAuthorities().toString(), null, null);

            return ResponseEntity.ok(Map.of("token",token));
        } catch( BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디 또는 비밀번호가 일치하지 않거나 승인되지 않은 계정입니다.");
        }
//        AdminUser user = authService.login(loginDto.getUsername(), loginDto.getPassword());
//
//        if (user == null) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
//        }
//
//        String token = jwtUtil.generateToken(user.getUsername(), user.getRole(), user.getId(), null);
//        return ResponseEntity.ok(Map.of("token", token));
    }

}