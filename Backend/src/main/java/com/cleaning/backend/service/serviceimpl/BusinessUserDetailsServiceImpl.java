package com.cleaning.backend.service.serviceimpl;

import com.cleaning.backend.mapper.BusinessUserMapper;
import com.cleaning.backend.model.BusinessUser;
import com.cleaning.backend.model.auth.BusinessUserDetails;
import com.cleaning.backend.service.BusinessUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class BusinessUserDetailsServiceImpl implements BusinessUserDetailsService {

    private final BusinessUserMapper businessUserMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        BusinessUser user = businessUserMapper.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + username);
        }
        return new BusinessUserDetails(user);
    }
}
