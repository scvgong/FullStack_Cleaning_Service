package com.cleaning.backend.service;

import com.cleaning.backend.model.QuoteRequest;
import com.cleaning.backend.dto.QuoteRequestDto;

public interface QuoteRequestService {
    void saveQuote(QuoteRequestDto dto);
}
