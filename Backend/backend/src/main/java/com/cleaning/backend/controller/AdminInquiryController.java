package com.cleaning.backend.controller;

import com.cleaning.backend.dto.InquiryReplyDto;
import com.cleaning.backend.dto.InquiryResponseDto;
import com.cleaning.backend.service.AdminInquiryService;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/inquiries")
@RequiredArgsConstructor
public class AdminInquiryController {
    private final AdminInquiryService service;

    @GetMapping
    public ResponseEntity<List<InquiryResponseDto>> list() {
        return ResponseEntity.ok(service.listAllPending());
    }

    @GetMapping("/{id}")
    public ResponseEntity<InquiryResponseDto> detail(@PathVariable Long id) {
        return ResponseEntity.ok(service.getDetail(id));
    }

    @PostMapping("/{id}/reply")
    public ResponseEntity<Void> reply(
            @PathVariable Long id,
            @RequestBody InquiryReplyDto dto,
            Authentication auth
    ) {
        Long adminId = ((Claims)auth.getPrincipal()).get("userId", Long.class);
        service.replyInquiry(id, dto, adminId);
        return ResponseEntity.status(201).build();
    }

    @PutMapping("/{id}/reply")
    public ResponseEntity<Void> updateReply(
            @PathVariable Long id,
            @RequestBody InquiryReplyDto dto
    ) {
        service.updateReply(id, dto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}/reply")
    public ResponseEntity<Void> deleteReply(@PathVariable Long id) {
        service.deleteReply(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/completed")
    public ResponseEntity<List<InquiryResponseDto>> listAnswered() {
        return ResponseEntity.ok(service.listAllAnswered());
    }
}
