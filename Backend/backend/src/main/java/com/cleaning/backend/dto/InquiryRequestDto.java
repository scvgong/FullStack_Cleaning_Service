package com.cleaning.backend.dto;

import lombok.Data;

// 사업자 -> 관리자 요청
@Data
public class InquiryRequestDto{
    private Long businessId;
    private String subject;
    private String message;
}
