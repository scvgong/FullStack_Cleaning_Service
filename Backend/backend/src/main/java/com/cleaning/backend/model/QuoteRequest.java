package com.cleaning.backend.model;

import lombok.Data;
import java.util.List;

// 견적 요청 데이터 모델
@Data
public class QuoteRequest {
    private Long id;              // 시퀀스로 들어가는 기본 키
    private String serviceType;
    private String spaceType;
    private String area;
    private String name;
    private String phone;
    private String email;
    private String location;
    private String message;
    private List<QuoteImage> images;
}
