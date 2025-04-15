package com.cleaning.backend.controller;

import com.cleaning.backend.dto.QuoteRequestDto;
import com.cleaning.backend.model.QuoteRequest;
import com.cleaning.backend.service.QuoteRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/quotes")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class QuoteController {

    private final QuoteRequestService quoteRequestService;

    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<String> receiveQuote(
            @RequestPart("data") QuoteRequestDto dto,
            @RequestPart("images") List<MultipartFile> images) {

        // 이미지 유효성 검사, 파일 형식 및 용량
        long maxSize = 5 * 1024 * 1024;
        List<String> allowedTypes = List.of("image/jpeg","image/png");

        if(images != null){
            for(MultipartFile file : images){
                if(!allowedTypes.contains(file.getContentType())){
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이미지 형식만 가능합니다.");
                }

                if(file.getSize() > maxSize){
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("파일 크기는 5MB 이하만 가능합니다.");
                }
            }
        }

        // 전화번호 정규식 (010-1234-5678 형식)
        if (dto.getPhone().matches("^\\d{3}-\\d{3,4}-\\d{4}$")) {
            return ResponseEntity.badRequest().body("유효한 전화번호 형식이 아닙니다.");
        }

        // 이메일 정규식
        if (!dto.getEmail().matches("^\\S+@\\S+\\.\\S+$")) {
            return ResponseEntity.badRequest().body("유효한 이메일 형식이 아닙니다.");
        }

        // 이름 유효성 (한글 또는 영문 2자 이상)
        if (!dto.getName().matches("^[가-힣a-zA-Z\\s]{2,}$")) {
            return ResponseEntity.badRequest().body("이름은 한글 또는 영문 2자 이상이어야 합니다.");
        }

        // 면적 유효성 (숫자만 허용)
        if (dto.getArea() != null && !dto.getArea().matches("^\\d+$")) {
            return ResponseEntity.badRequest().body("면적은 숫자만 입력 가능합니다.");
        }


        quoteRequestService.saveQuote(dto, images);
        return ResponseEntity.ok("견적 요청이 성공적으로 접수되었습니다.");
    }

}
