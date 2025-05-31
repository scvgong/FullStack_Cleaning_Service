package com.cleaning.backend.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class BusinessQuoteResponseDto {
    private Long id;
    private String serviceType;
    private String spaceType;
    private String area;
    private String name;
    private String phone;
    private String email;
    private String location;
    private String message;
    private List<String> images;      // 이미지 URL 리스트
    private LocalDateTime createdAt;
}
