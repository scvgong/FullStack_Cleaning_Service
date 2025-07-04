package com.cleaning.backend.controller;

import com.cleaning.backend.dto.BusinessUserDto;
import com.cleaning.backend.dto.BusinessUserRegisterDto;
import com.cleaning.backend.dto.BusinessUserUpdateRequest;
import com.cleaning.backend.service.BusinessUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/business")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class BusinessUserController {
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

    @GetMapping("/me") // 사업자 마이페이지 조회
    public BusinessUserDto getMyInfo(@AuthenticationPrincipal(expression = "id") Long userId) {
        return businessUserService.getMyInfo(userId);
    }

    @PutMapping(value = "/me", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void updateMyInfo(
            @AuthenticationPrincipal(expression = "id") Long userId,
            @RequestPart("data") BusinessUserUpdateRequest request,
            @RequestPart(value = "bizDoc", required = false) MultipartFile bizDoc
    ) {
        businessUserService.updateMyInfo(userId, request, bizDoc);
    }

}
