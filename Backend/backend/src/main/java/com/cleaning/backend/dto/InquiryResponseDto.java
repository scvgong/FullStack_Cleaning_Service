package com.cleaning.backend.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;


public record InquiryResponseDto(Long id,
                                 Long businessId,
                                 String businessName,
                                 String subject,
                                 String message,
                                 String reply,
                                 LocalDateTime createdAt,
                                 LocalDateTime repliedAt){

}
