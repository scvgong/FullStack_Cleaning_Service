package com.cleaning.backend.dto;

import lombok.Data;

import java.time.LocalDateTime;

// 시압지 마이페이지 조회 필드
@Data
public class BusinessUserDto {
    private long id;
    private String username;
    private String name;
    private String businessNo;
    private String phone;
    private String altPhone;
    private String bizDocPath;
    private LocalDateTime createdAt; //가입일시
}
