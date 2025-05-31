package com.cleaning.backend.service;

import com.cleaning.backend.model.AdminUser;

public interface AdminAuthService {
    AdminUser login(String username, String password);
}
