package com.cleaning.backend.controller;

import com.cleaning.backend.dto.AdminUserRegisterDto;
import com.cleaning.backend.service.AdminUserService;
import com.cleaning.backend.service.serviceimpl.AdminUserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminUserController {
    private final AdminUserService adminUserService;

    @PostMapping
    public ResponseEntity<String> register(@RequestBody AdminUserRegisterDto dto){
        adminUserService.register(dto);
        return ResponseEntity.ok("가입 신청 완료. 승인 대기중");
    }

    @GetMapping("/pending")
    public ResponseEntity<?> getPendingAdmins() {
        return ResponseEntity.ok(adminUserService.getPendingAdmins());
    }
}
