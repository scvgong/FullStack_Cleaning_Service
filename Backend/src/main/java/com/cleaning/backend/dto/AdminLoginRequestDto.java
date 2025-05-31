package com.cleaning.backend.dto;

import lombok.Data;

import java.util.Date;

@Data
public class AdminLoginRequestDto {
    private String username;
    private String password;
}
