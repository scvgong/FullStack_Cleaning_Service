package com.cleaning.backend.controller;

import com.cleaning.backend.dto.FaqRequestDto;
import com.cleaning.backend.service.FaqService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/faqs")
@RequiredArgsConstructor
public class AdminFaqController {
    private final FaqService faqService;

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody FaqRequestDto dto){
        faqService.createFaq(dto);
        return ResponseEntity.status(201).build();
    }
}
