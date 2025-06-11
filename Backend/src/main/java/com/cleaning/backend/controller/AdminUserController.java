package com.cleaning.backend.controller;

import com.cleaning.backend.dto.AdminUserApproveDto;
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

    @PutMapping("/{id}/approve")
    public ResponseEntity<?> approveAdminUser(@PathVariable Long id, @RequestBody AdminUserApproveDto dto){
        adminUserService.approveAdminUser(id, dto.getRole());
        return ResponseEntity.ok("승인완료");
    }

    @GetMapping
    public ResponseEntity<?> getAllAdmins() {
        return ResponseEntity.ok(adminUserService.getAllAdmins());
    }
}
