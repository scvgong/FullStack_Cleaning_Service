package com.cleaning.backend.service;

import com.cleaning.backend.model.BusinessUser;

public interface BusinessAuthService {
    BusinessUser login(String username, String rawPassword);
}
