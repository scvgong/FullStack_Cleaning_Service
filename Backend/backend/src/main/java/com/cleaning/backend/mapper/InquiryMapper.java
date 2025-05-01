package com.cleaning.backend.mapper;

import com.cleaning.backend.dto.InquiryRequestDto;
import com.cleaning.backend.dto.InquiryResponseDto;
import com.cleaning.backend.model.Inquiry;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface InquiryMapper {
    void insertInquiry(@Param("businessId") Long b, @Param("subject") String s, @Param("message") String m);
    List<Inquiry> findAll();
    Inquiry findById(@Param("id") Long id);
    void updateReply(@Param("id") Long id, @Param("reply") String reply);
}
