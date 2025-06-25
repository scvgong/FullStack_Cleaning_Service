package com.cleaning.backend.controller;

import com.cleaning.backend.dto.BusinessQuoteResponseDto;
import com.cleaning.backend.service.BusinessQuoteService;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/business/quotes")
@RequiredArgsConstructor
public class BusinessQuoteController {
    private final BusinessQuoteService service;

    // 견적 리스트(카테고리 별로 조회)
//    @GetMapping
//    public ResponseEntity<List<BusinessQuoteResponseDto>> list(Authentication authentication) {
//        // 필터에서 principal로 Claims를 담아두었으므로 꺼내기만 하면 됩니다.
//        Claims claims = (Claims) authentication.getPrincipal();
//        String category = claims.get("category", String.class);
//
//        List<BusinessQuoteResponseDto> quotes = service.getQuotesForCategory(category);
//        return ResponseEntity.ok(quotes);
//    }

    // 견적 리스트 전체조회
    @GetMapping
    public ResponseEntity<List<BusinessQuoteResponseDto>> list() {
        List<BusinessQuoteResponseDto> quotes = service.getAllQuotes();
        return ResponseEntity.ok(quotes);
    }

    @GetMapping
    public ResponseEntity<List<BusinessQuoteResponseDto>> list(@RequestParam(required = false) String keyword) {
        List<BusinessQuoteResponseDto> quotes = service.getQuotesByKeyword(keyword);
        return ResponseEntity.ok(quotes);
    }

    // 상세 조회 추가
//    @GetMapping("/{id}")
//    public ResponseEntity<BusinessQuoteResponseDto> detail(
//            @PathVariable Long id,
//            Authentication authentication
//    ) {
//        Claims claims = (Claims) authentication.getPrincipal();
//        String category = claims.get("category", String.class);
//
//        BusinessQuoteResponseDto dto = service.getQuoteDetail(id, category);
//        return ResponseEntity.ok(dto);
//    }

    // 상세 조회 추가
    @GetMapping("/{id}")
    public ResponseEntity<BusinessQuoteResponseDto> detail(@PathVariable Long id) {
//        Claims claims = (Claims) authentication.getPrincipal();
//        String category = claims.get("category", String.class);

        BusinessQuoteResponseDto dto = service.getQuoteDetail(id);
        return ResponseEntity.ok(dto);
    }

}
