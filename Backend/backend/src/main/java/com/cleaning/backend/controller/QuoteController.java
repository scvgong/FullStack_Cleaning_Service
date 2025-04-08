package com.cleaning.backend.controller;

import com.cleaning.backend.dto.QuoteRequestDto;
import com.cleaning.backend.model.QuoteRequest;
import com.cleaning.backend.service.QuoteRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/quotes")
@RequiredArgsConstructor
public class QuoteController {

    private final QuoteRequestService quoteRequestService;

    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<String> receiveQuote(
            @RequestPart("data") QuoteRequestDto dto,
            @RequestPart("images") List<MultipartFile> images) {

        quoteRequestService.saveQuote(dto, images);
        return ResponseEntity.ok("견적 요청이 성공적으로 접수되었습니다.");
    }

}
