package com.cleaning.backend.controller;

import com.cleaning.backend.dto.InquiryRequestDto;
import com.cleaning.backend.service.BusinessInquiryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/business/inquiries")
public class BusinessInquiryController {
    private final BusinessInquiryService service;

    @PostMapping
    public ResponseEntity<Void> createInquiry(@RequestBody InquiryRequestDto dto) {
        service.createInquiry(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
