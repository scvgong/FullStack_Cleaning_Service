package com.cleaning.backend.controller;

import com.cleaning.backend.dto.InquiryRequestDto;
import com.cleaning.backend.dto.InquiryResponseDto;
import com.cleaning.backend.service.BusinessInquiryService;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/business/inquiries")
public class BusinessInquiryController {
    private final BusinessInquiryService service;

    // 문의 생성
    @PostMapping
    public ResponseEntity<Void> create(@RequestBody InquiryRequestDto dto, Authentication auth) {
        Long businessId = ((Claims)auth.getPrincipal()).get("userId", Long.class);
        dto.setBusinessId(businessId);
        service.createInquiry(dto);
        return ResponseEntity.status(201).build();
    }

    // 문의 목록
    @GetMapping
    public ResponseEntity<List<InquiryResponseDto>> list(Authentication auth) {
        Long businessId = ((Claims)auth.getPrincipal()).get("userId", Long.class);
        return ResponseEntity.ok(service.listMyInquiries(businessId));
    }

    // 상세 문의
    @GetMapping("/{id}")
    public ResponseEntity<InquiryResponseDto> detail(@PathVariable Long id, Authentication auth) throws AccessDeniedException {
        Long businessId = ((Claims)auth.getPrincipal()).get("userId", Long.class);
        return ResponseEntity.ok(service.getDetail(id, businessId));
    }

    // 문의 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id, Authentication auth) throws AccessDeniedException {
        Long businessId = ((Claims)auth.getPrincipal()).get("userId", Long.class);
        service.deleteInquiry(id, businessId);
        return ResponseEntity.noContent().build();
    }
}
