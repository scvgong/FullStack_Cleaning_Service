package com.cleaning.backend.service;

import com.cleaning.backend.dto.InquiryReplyDto;
import com.cleaning.backend.dto.InquiryResponseDto;

import java.util.List;

public interface AdminInquiryService {
    List<InquiryResponseDto> listAllPending();
    InquiryResponseDto getDetail(Long id);
    void replyInquiry(Long id, InquiryReplyDto replyDto, Long adminId);
    void updateReply(Long id, InquiryReplyDto replyDto);
    void deleteReply(Long id);
    List<InquiryResponseDto> listAllAnswered();
}
