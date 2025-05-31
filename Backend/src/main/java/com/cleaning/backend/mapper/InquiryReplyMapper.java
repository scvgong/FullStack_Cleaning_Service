package com.cleaning.backend.mapper;

import com.cleaning.backend.model.InquiryReply;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface InquiryReplyMapper {
    void insertReply(InquiryReply reply);
    InquiryReply findByInquiryId(@Param("inquiryId") Long inquiryId);
    void updateReply(InquiryReply reply);
    void deleteByInquiryId(@Param("inquiryId") Long inquiryId);
}
