package com.cleaning.backend.controller;

import com.cleaning.backend.dto.QuoteRequestDto;
import com.cleaning.backend.mapper.QuoteRequestMapper;
import com.cleaning.backend.model.QuoteRequest;
import com.cleaning.backend.service.QuoteRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/quotes")
@RequiredArgsConstructor
public class AdminQuoteController {
    private final QuoteRequestService quoteRequestService;
    private final QuoteRequestMapper quoteRequestMapper;

    // 전체 견적 요청 목록 조회
    @GetMapping("/all")
    public List<QuoteRequest> getAllQuotes() {
        return quoteRequestService.getAllQuotes();
    }

    //목록 페이징
    @GetMapping
    public ResponseEntity<Map<String, Object>> getQuotesPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        List<QuoteRequest> quotes = quoteRequestService.getQuotesWithPagination(page, size);
        int total = quoteRequestService.getTotalQuoteCount();

        Map<String, Object> result = new HashMap<>();
        result.put("quotes", quotes);
        result.put("total", total);

        return ResponseEntity.ok(result);
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
