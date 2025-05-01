package com.cleaning.backend.dto;

// 사업자 -> 관리자 요청
public record InquiryRequestDto(Long businessId, String subject, String message) { }
