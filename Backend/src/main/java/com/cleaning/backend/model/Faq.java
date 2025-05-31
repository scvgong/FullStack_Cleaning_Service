package com.cleaning.backend.model;

import lombok.Data;

import java.util.Date;

@Data
public class Faq {
    private Long id;
    private String question;
    private String answer;
    private Date createAt;
}
