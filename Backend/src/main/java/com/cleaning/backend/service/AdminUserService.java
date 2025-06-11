package com.cleaning.backend.service;

import com.cleaning.backend.dto.AdminUserRegisterDto;

public interface AdminUserService {
    void register(AdminUserRegisterDto dto);
}
