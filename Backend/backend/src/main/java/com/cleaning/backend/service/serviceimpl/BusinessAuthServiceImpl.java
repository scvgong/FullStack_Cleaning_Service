package com.cleaning.backend.service.serviceimpl;

import com.cleaning.backend.mapper.BusinessUserMapper;
import com.cleaning.backend.model.BusinessUser;
import com.cleaning.backend.service.BusinessAuthService;
import com.cleaning.backend.service.BusinessUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BusinessAuthServiceImpl implements BusinessAuthService {
    private final BusinessUserMapper mapper;
    private final PasswordEncoder encoder;


    @Override
    public BusinessUser login(String username, String rawPassword) {
        BusinessUser u = mapper.findByUsername(username);
        if (u != null && encoder.matches(rawPassword, u.getPassword())) {
            return u;
        }
        return null;
    }
}
