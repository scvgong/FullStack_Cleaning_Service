package com.cleaning.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
public class FaqResponseDto {
    private Long id;
    private String question;
    private String answer;
    private Date createdAt;
}
