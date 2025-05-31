package com.cleaning.backend.init;

import com.cleaning.backend.mapper.AdminUserMapper;
import com.cleaning.backend.model.AdminUser;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class InitAdminUser {
    private final AdminUserMapper adminUserMapper;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void initAdmin() {
        String username = "admin";
        String rawPassword = "admin123";

        AdminUser existing = adminUserMapper.findByUsername(username);
        if (existing != null) {
            System.out.println("✅ 관리자 계정 이미 존재: " + username);
            return;
        }

        AdminUser admin = new AdminUser();
        admin.setUsername(username);
        admin.setPassword(passwordEncoder.encode(rawPassword));
        admin.setName("관리자");
        admin.setRole("ADMIN");

        adminUserMapper.insertAdminUser(admin);
        System.out.println("🎉 초기 관리자 계정 생성 완료: " + username);
    }
}
