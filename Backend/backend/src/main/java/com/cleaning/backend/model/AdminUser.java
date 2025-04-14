package com.cleaning.backend.model;

import lombok.Data;

import java.util.Date;

@Data
public class AdminUser {
    private Long id;
    private String username;
    private String password;
    private String name;
    private String role;
    private Date createdAt;
}
