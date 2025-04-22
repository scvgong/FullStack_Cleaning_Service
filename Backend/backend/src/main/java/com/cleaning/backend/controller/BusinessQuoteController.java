package com.cleaning.backend.controller;

import com.cleaning.backend.dto.BusinessQuoteResponseDto;
import com.cleaning.backend.service.BusinessQuoteService;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/business/quotes")
@RequiredArgsConstructor
public class BusinessQuoteController {
    private final BusinessQuoteService service;

    @GetMapping
    public ResponseEntity<List<BusinessQuoteResponseDto>> list(Authentication authentication) {
        // 필터에서 principal로 Claims를 담아두었으므로 꺼내기만 하면 됩니다.
        Claims claims = (Claims) authentication.getPrincipal();
        String category = claims.get("category", String.class);

        List<BusinessQuoteResponseDto> quotes = service.getQuotesForCategory(category);
        return ResponseEntity.ok(quotes);
    }

}
