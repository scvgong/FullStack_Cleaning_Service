package com.cleaning.backend.service;

import com.cleaning.backend.dto.FaqRequestDto;
import com.cleaning.backend.dto.FaqResponseDto;

import java.util.List;

public interface FaqService {
    void createFaq(FaqRequestDto dto);
    List<FaqResponseDto> getFaqList();
    FaqResponseDto getFaq(Long id);
    void updateFaq(Long id, FaqRequestDto dto);
    void deleteFaq(Long id);
}
