package com.cleaning.backend.service;

import com.cleaning.backend.model.QuoteRequest;
import com.cleaning.backend.dto.QuoteRequestDto;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface QuoteRequestService {
    void saveQuote(QuoteRequestDto dto, List<MultipartFile> images);
    List<QuoteRequest> getAllQuotes();
}
