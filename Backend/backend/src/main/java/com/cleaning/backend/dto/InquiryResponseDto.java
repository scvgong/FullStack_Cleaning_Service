package com.cleaning.backend.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class InquiryResponseDto{
    private Long id;
    private Long businessId;
    private String businessName;
    private String subject;
    private String message;
    private String status;
    private String reply;          // ← 추가
    private LocalDateTime createdAt;
    private LocalDateTime repliedAt;
}
