package com.cleaning.backend.service.serviceimpl;

import com.cleaning.backend.mapper.AdminUserMapper;
import com.cleaning.backend.model.AdminUser;
import com.cleaning.backend.service.AdminUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminUserDetailsServiceImpl implements AdminUserDetailsService {

    private final AdminUserMapper adminUserMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AdminUser user = adminUserMapper.findByUsername(username);

        System.out.println("✅ 사용자 로딩 시도: " + username);

        if(user == null){
            throw new UsernameNotFoundException("존재하지 않는 아이디 입니다.");
        }

        if( !"APPROVED".equals(user.getStatus())){
            System.out.println("❌ 승인되지 않은 계정 로그인 시도: " + user.getUsername());
            throw new BadCredentialsException("승인되지 않은 관리자 계정입니다.");
        }

        return User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRole().replace("ROLE_",""))
                .build();

    }
}
