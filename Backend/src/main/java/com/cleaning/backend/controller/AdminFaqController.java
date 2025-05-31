package com.cleaning.backend.controller;

import com.cleaning.backend.dto.FaqRequestDto;
import com.cleaning.backend.dto.FaqResponseDto;
import com.cleaning.backend.service.FaqService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/faqs")
@RequiredArgsConstructor
public class AdminFaqController {
    private final FaqService faqService;

    //전체 리스트
    @GetMapping
    public ResponseEntity<List<FaqResponseDto>> list() {
        List<FaqResponseDto> faqs = faqService.getFaqList();
        return ResponseEntity.ok(faqs);
    }

    // 상세조회
    @GetMapping("/{id}")
    public ResponseEntity<FaqResponseDto> detail(@PathVariable Long id) {
        FaqResponseDto dto = faqService.getFaq(id);
        if (dto == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(dto);
    }

    // 4) 수정
    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody FaqRequestDto dto) {
        faqService.updateFaq(id, dto);
        return ResponseEntity.noContent().build();
    }

    // 생성
    @PostMapping
    public ResponseEntity<Void> create(@RequestBody FaqRequestDto dto){
        faqService.createFaq(dto);
        return ResponseEntity.status(201).build();
    }

    // 5) 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        faqService.deleteFaq(id);
        return ResponseEntity.noContent().build();
    }

}
