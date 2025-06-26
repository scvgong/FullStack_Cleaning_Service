package com.cleaning.backend.service;

import com.cleaning.backend.dto.BusinessQuoteResponseDto;
import com.cleaning.backend.dto.PagedResponseDto;

import java.util.List;

public interface BusinessQuoteService {
    List<BusinessQuoteResponseDto> getQuotesForCategory(String category);
    BusinessQuoteResponseDto getQuoteDetail(Long id);
    List<BusinessQuoteResponseDto> getAllQuotes();

    List<BusinessQuoteResponseDto> getQuotesByKeyword(String keyword);

    PagedResponseDto<BusinessQuoteResponseDto> searchQuotes(String keyword, String serviceType, String spaceType, int page, int size);
}
