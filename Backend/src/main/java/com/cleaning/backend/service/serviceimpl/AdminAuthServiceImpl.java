package com.cleaning.backend.service.serviceimpl;

import com.cleaning.backend.mapper.AdminUserMapper;
import com.cleaning.backend.model.AdminUser;
import com.cleaning.backend.service.AdminAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AdminAuthServiceImpl implements AdminAuthService {

    private final AdminUserMapper adminUserMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public AdminUser login(String username, String password){
        AdminUser user = adminUserMapper.findByUsername(username);
        if(user != null && passwordEncoder.matches(password, user.getPassword())){
            return user;
        }
        return null;
    }
}
