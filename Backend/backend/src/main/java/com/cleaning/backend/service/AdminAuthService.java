package com.cleaning.backend.service;

import com.cleaning.backend.mapper.AdminUserMapper;
import com.cleaning.backend.model.AdminUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminAuthService {

    private final AdminUserMapper adminUserMapper;
    private final PasswordEncoder passwordEncoder;

    public AdminUser login(String username, String password){
        AdminUser user = adminUserMapper.findByUsername(username);
        if(user != null && passwordEncoder.matches(password, user.getPassword())){
            return user;
        }
        return null;
    }
}
