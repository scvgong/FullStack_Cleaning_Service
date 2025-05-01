package com.cleaning.backend.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class InquiryReply {
    private Long id;
    private Long inquiryId;
    private Long adminId;
    private String answer;       // DB 컬럼명은 answer
    private LocalDateTime repliedAt;
}
