package com.cleaning.backend.service;

import com.cleaning.backend.dto.AdminUserRegisterDto;
import com.cleaning.backend.model.AdminUser;

import java.util.List;

public interface AdminUserService {
    void register(AdminUserRegisterDto dto);
    List<AdminUser> getPendingAdmins();
    void approveAdminUser(Long id, String role);
    List<AdminUser> getAllAdmins();
}
