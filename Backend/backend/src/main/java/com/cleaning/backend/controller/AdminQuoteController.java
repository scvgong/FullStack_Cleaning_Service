package com.cleaning.backend.controller;

import com.cleaning.backend.dto.QuoteRequestDto;
import com.cleaning.backend.model.QuoteRequest;
import com.cleaning.backend.service.QuoteRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    //수정
    @PutMapping("/{id}")
    public void updateQuote(@PathVariable Long id, @RequestBody QuoteRequestDto dto) {
        quoteRequestService.updateQuote(id, dto);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<String> updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> payload
    ) {
        String status = payload.get("status");
        quoteRequestService.updateStatus(id, status);
        return ResponseEntity.ok("견적 요청 상태가 업데이트되었습니다.");
    }
}
