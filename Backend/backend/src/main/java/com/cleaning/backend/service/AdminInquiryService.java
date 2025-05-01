package com.cleaning.backend.service;

import com.cleaning.backend.dto.InquiryReplyDto;
import com.cleaning.backend.dto.InquiryResponseDto;

import java.util.List;

public interface AdminInquiryService {
    List<InquiryResponseDto> listAll();
    InquiryResponseDto getDetail(Long id);
    void replyToInquiry(Long id, InquiryReplyDto dto);
}
