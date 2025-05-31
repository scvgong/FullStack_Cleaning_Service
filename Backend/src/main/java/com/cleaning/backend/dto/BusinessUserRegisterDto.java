package com.cleaning.backend.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class BusinessUserRegisterDto {
    private long id;
    private String username;
    private String password;
    private String name;
    private String businessNo;
    private String phone;
    private String altPhone;  // 선택
    private String category;
    private MultipartFile bizDoc; // 등록증 이미지
}
