package com.cleaning.backend.controller;

import com.cleaning.backend.service.QuoteRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import com.cleaning.backend.dto.QuoteRequestDto;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/api/quotes")
@RequiredArgsConstructor
public class QuoteController {

    private final QuoteRequestService quoteRequestService;

    @PostMapping(value = "/api/quote", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<String> receiveQuote(@RequestPart("data") QuoteRequestDto dto) {

        quoteRequestService.saveQuote(dto);
        return ResponseEntity.ok("견적 요청이 접수되었습니다.");
    }
}
