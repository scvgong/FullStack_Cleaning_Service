package com.cleaning.backend.dto;

import lombok.Data;

@Data
public class QuoteRequestDto {
    private String serviceType;  // 청소 서비스 유형 (예: 이사청소, 사무실청소 등)
    private String spaceType;    // 공간 유형 (예: 아파트, 상가 등)
    private String area;         // 면적 (예: 30평 등)
    private String name;         // 고객 이름
    private String phone;        // 연락처
    private String email;        // 이메일 주소
    private String location;     // 청소 위치
    private String message;      // 추가 요청 사항 또는 메시지
}