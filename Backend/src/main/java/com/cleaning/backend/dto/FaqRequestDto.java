package com.cleaning.backend.dto;

import lombok.Data;

@Data
public class FaqRequestDto {
    private String question;
    private String answer;
}
