package com.cleaning.backend.service.serviceimpl;

import com.cleaning.backend.dto.InquiryReplyDto;
import com.cleaning.backend.dto.InquiryResponseDto;
import com.cleaning.backend.mapper.InquiryMapper;
import com.cleaning.backend.mapper.InquiryReplyMapper;
import com.cleaning.backend.model.Inquiry;
import com.cleaning.backend.model.InquiryReply;
import com.cleaning.backend.service.AdminInquiryService;
import com.cleaning.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminInquiryServiceImpl implements AdminInquiryService {
    private final InquiryMapper inquiryMapper;
    private final InquiryReplyMapper replyMapper;
    private final JwtUtil jwtUtil; // adminId 추출용

    @Override
    public List<InquiryResponseDto> listAllPending() {
        return inquiryMapper.findAllPending().stream()
                .map(i -> toDto(i, null))
                .collect(Collectors.toList());
    }

    @Override
    public InquiryResponseDto getDetail(Long id) {
        Inquiry i = inquiryMapper.findById(id);
        InquiryReply r = replyMapper.findByInquiryId(id);
        return toDto(i, r);
    }

    @Override
    public void replyInquiry(Long id, InquiryReplyDto replyDto, Long adminId) {
//        replyMapper.insertReply(new InquiryReply(null, id, adminId, replyDto.getReply(), null));
        inquiryMapper.updateStatus(id, "ANSWERED");
    }

    @Override
    public void updateReply(Long id, InquiryReplyDto replyDto) {
//        replyMapper.updateReply(new InquiryReply(null, id, /* adminId? */ null, replyDto.getReply(), null));
    }

    @Override
    public void deleteReply(Long id) {
        replyMapper.deleteByInquiryId(id);
        inquiryMapper.updateStatus(id, "PENDING");
    }

    private InquiryResponseDto toDto(Inquiry i, InquiryReply r) {
        InquiryResponseDto dto = new InquiryResponseDto();
        // set fields...
        return dto;
    }
}
