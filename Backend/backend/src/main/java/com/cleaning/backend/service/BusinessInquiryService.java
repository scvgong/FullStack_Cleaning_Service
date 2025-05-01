package com.cleaning.backend.service;

import com.cleaning.backend.dto.InquiryRequestDto;
import com.cleaning.backend.dto.InquiryResponseDto;

import java.util.List;

public interface BusinessInquiryService {
    void createInquiry(InquiryRequestDto dto);
}
