package com.cleaning.backend.service.serviceimpl;

import com.cleaning.backend.dto.InquiryRequestDto;
import com.cleaning.backend.dto.InquiryResponseDto;
import com.cleaning.backend.mapper.InquiryMapper;
import com.cleaning.backend.service.BusinessInquiryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class BusinessInquiryServiceImpl implements BusinessInquiryService {

    private final InquiryMapper mapper;
    public void createInquiry(InquiryRequestDto dto) {
        mapper.insertInquiry(dto.businessId(), dto.subject(), dto.message());
    }
}
