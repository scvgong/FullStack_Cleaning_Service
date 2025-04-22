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
        BusinessUser user = mapper.findByUsername(username);
        if (user != null && encoder.matches(rawPassword, user.getPassword())) {
            return user;
        }
//        System.out.println(">> 로그인 시도: " + username + " / db-pw=" + user.getPassword());
//        System.out.println("rawPassword = " + rawPassword);
//        System.out.println("encodedPw   = " + user.getPassword());
//        System.out.println("matches     = " + encoder.matches(rawPassword, user.getPassword()));
        return null;
    }
}
