package com.cleaning.backend.controller;

import com.cleaning.backend.dto.InquiryReplyDto;
import com.cleaning.backend.dto.InquiryResponseDto;
import com.cleaning.backend.service.AdminInquiryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/inquiries")
@RequiredArgsConstructor
public class AdminInquiryController {
    private final AdminInquiryService service;

    @GetMapping
    public List<InquiryResponseDto> listAll() {
        return service.listAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<InquiryResponseDto> getDetail(@PathVariable Long id) {
        var dto = service.getDetail(id);
        return dto != null
                ? ResponseEntity.ok(dto)
                : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/reply")
    public ResponseEntity<Void> replyToInquiry(
            @PathVariable Long id,
            @RequestBody InquiryReplyDto dto
    ) {
        service.replyToInquiry(id, dto);
        return ResponseEntity.noContent().build();
    }
}
