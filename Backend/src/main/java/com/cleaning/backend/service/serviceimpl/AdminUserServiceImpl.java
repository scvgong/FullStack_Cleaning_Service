package com.cleaning.backend.service.serviceimpl;

import com.cleaning.backend.dto.AdminUserRegisterDto;
import com.cleaning.backend.mapper.AdminUserMapper;
import com.cleaning.backend.model.AdminUser;
import com.cleaning.backend.service.AdminUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminUserServiceImpl implements AdminUserService {

    private final AdminUserMapper adminUserMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void register(AdminUserRegisterDto dto) {
        if (adminUserMapper.findByUsername(dto.getUsername()) != null) {
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }

        AdminUser user = new AdminUser();
        user.setUsername(dto.getUsername());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setName(dto.getName());
        user.setRole("ROLE_PENDING");
        user.setStatus("PENDING");
        user.setCreatedAt(new Date());

        adminUserMapper.insertAdminUser(user);
    }

    @Override
    public List<AdminUser> getPendingAdmins() {
        return adminUserMapper.findPendingAdmins();
    }

    @Override
    public void approveAdminUser(Long id, String role) {
        AdminUser user = adminUserMapper.findById(id);
        if (user == null) {
            throw new IllegalArgumentException("존재하지 않는 관리자입니다.");
        }

        user.setRole(role);
        user.setStatus("APPROVED");

        adminUserMapper.updateAdminUser(user);
    }

    @Override
    public List<AdminUser> getAllAdmins() {
        return adminUserMapper.findAllAdmins();
    }
}
