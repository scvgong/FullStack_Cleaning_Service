package com.cleaning.backend.controller;

import com.cleaning.backend.model.QuoteRequest;
import com.cleaning.backend.service.QuoteRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/quotes")
@RequiredArgsConstructor
public class AdminQuoteController {
    private final QuoteRequestService quoteRequestService;

    // 전체 견적 요청 목록 조회
    @GetMapping
    public List<QuoteRequest> getAllQuotes() {
        return quoteRequestService.getAllQuotes();
    }
    
    // 상세조회
    @GetMapping("/{id}")
    public QuoteRequest getQuoteDetail(@PathVariable Long id) {
        return quoteRequestService.getQuoteDetail(id);
    }

    //삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuote(@PathVariable Long id) {
        quoteRequestService.deleteQuote(id);
        return ResponseEntity.noContent().build(); // 204 응답
    }
}
