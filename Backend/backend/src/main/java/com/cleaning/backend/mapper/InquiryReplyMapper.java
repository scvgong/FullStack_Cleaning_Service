package com.cleaning.backend.mapper;

import com.cleaning.backend.model.InquiryReply;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface InquiryReplyMapper {
    void insertReply(InquiryReply reply);
    InquiryReply findInquiryId(@Param("inquiryId") Long id);
}
