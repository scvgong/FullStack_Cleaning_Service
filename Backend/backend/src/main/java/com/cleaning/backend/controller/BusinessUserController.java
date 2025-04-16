package com.cleaning.backend.controller;

import com.cleaning.backend.dto.BusinessUserRegisterDto;
import com.cleaning.backend.service.BusinessUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/business")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class BussinessUserController {
    private final BusinessUserService businessUserService;

    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> register(
            @RequestPart("data") BusinessUserRegisterDto dto,
            @RequestPart(value = "bizDoc", required = false) MultipartFile bizDoc
    ) {
        dto.setBizDoc(bizDoc);
        businessUserService.register(dto);
        return ResponseEntity.ok("사업자 등록 완료");
    }
}
