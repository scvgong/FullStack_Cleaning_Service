package com.cleaning.backend.dto;

import lombok.Data;

@Data
public class AdminUserRegisterDto {
    private String username;
    private String password;
    private String name;
}
