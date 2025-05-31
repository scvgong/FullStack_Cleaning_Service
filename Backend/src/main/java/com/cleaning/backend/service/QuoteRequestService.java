package com.cleaning.backend.service;

import com.cleaning.backend.model.QuoteRequest;
import com.cleaning.backend.dto.QuoteRequestDto;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Map;

public interface QuoteRequestService {
    void saveQuote(QuoteRequestDto dto, List<MultipartFile> images);
    List<QuoteRequest> getAllQuotes();

    QuoteRequest getQuoteDetail(Long id);
    void deleteQuote(Long id);
    void updateQuote(Long id, QuoteRequestDto dto);
    void updateStatus(Long id, String status);

    Map<String, Object> getQuotesWithPagination(int page, int size);
    int getTotalQuoteCount();
}
