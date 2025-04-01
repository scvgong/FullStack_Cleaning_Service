package com.cleaning.backend.controller;

import com.cleaning.backend.model.QuoteRequest;
import com.cleaning.backend.service.QuoteRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cleaning.backend.dto.QuoteRequestDto;


@RestController
@RequestMapping("/api/quotes")
@RequiredArgsConstructor
public class QuoteController {

    private final QuoteRequestService quoteRequestService;

    @PostMapping
    public ResponseEntity<String> receiveQuote(@RequestBody QuoteRequestDto dto) {
        quoteRequestService.saveQuote(dto);  // ✅ 이 호출이 핵심
        return ResponseEntity.ok("견적 요청이 접수되었습니다.");
    }
}
