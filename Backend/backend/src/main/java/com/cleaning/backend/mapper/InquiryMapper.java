package com.cleaning.backend.mapper;

import com.cleaning.backend.dto.InquiryRequestDto;
import com.cleaning.backend.dto.InquiryResponseDto;
import com.cleaning.backend.model.Inquiry;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Arrays;
import java.util.List;

@Mapper
public interface InquiryMapper {
    void insert(InquiryRequestDto req);
    List<Inquiry> findAllByBusiness(@Param("businessId") Long businessId);
    Inquiry findById(@Param("id") Long id);
    void updateStatus(@Param("id") Long id, @Param("status") String status);
    List<Inquiry> findAllPending();
}
