package com.cleaning.backend.dto;

import lombok.Data;

@Data
public class BusinessUserUpdateRequest {
    private String name;
    private String phone;
    private String altPhone;
    private String password; // 선택 입력
}
