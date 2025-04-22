package com.cleaning.backend.service;

import com.cleaning.backend.dto.BusinessQuoteResponseDto;

import java.util.List;

public interface BusinessQuoteService {
    List<BusinessQuoteResponseDto> getQuotesForCategory(String category);
}
