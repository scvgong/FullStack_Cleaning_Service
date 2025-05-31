package com.cleaning.backend.model;

import lombok.Data;

@Data
public class QuoteImage {
    private Long id;         // 시퀀스로 생성되는 ID
    private Long quoteId;    // 견적 요청 ID (foreign key)
    private String filePath; // 업로드된 이미지 경로
}
