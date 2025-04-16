package com.cleaning.backend.service;

import com.cleaning.backend.dto.BusinessUserRegisterDto;

public interface BusinessUserService {
    void register(BusinessUserRegisterDto dto);
}
