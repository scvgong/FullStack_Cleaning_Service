package com.cleaning.backend.service;

import com.cleaning.backend.dto.BusinessUserDto;
import com.cleaning.backend.dto.BusinessUserRegisterDto;
import com.cleaning.backend.dto.BusinessUserUpdateRequest;
import org.springframework.web.multipart.MultipartFile;

public interface BusinessUserService {
    void register(BusinessUserRegisterDto dto);

    BusinessUserDto getMyInfo(Long userId);

    void updateMyInfo(Long userId, BusinessUserUpdateRequest request, MultipartFile bizDoc);
}
