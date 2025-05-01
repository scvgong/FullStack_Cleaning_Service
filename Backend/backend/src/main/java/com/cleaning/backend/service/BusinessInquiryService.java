package com.cleaning.backend.service;

import com.cleaning.backend.dto.InquiryRequestDto;
import com.cleaning.backend.dto.InquiryResponseDto;

import java.nio.file.AccessDeniedException;
import java.util.List;

public interface BusinessInquiryService {
    void createInquiry(InquiryRequestDto req);
    List<InquiryResponseDto> listMyInquiries(Long businessId);
    InquiryResponseDto getDetail(Long id, Long businessId) throws AccessDeniedException;
    void deleteInquiry(Long id, Long businessId) throws AccessDeniedException;
}
