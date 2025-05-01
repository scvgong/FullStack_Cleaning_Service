package com.cleaning.backend.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Inquiry {
    private Long id;
    private Long businessId;
    private String businessName; // 조인 정보가 필요하면
    private String subject;
    private String message;
    private String reply;
    private LocalDateTime createdAt;
    private LocalDateTime repliedAt;

}
