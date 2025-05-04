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
        // 1) 답변 삽입
        InquiryReply reply = new InquiryReply();
        reply.setInquiryId(id);
        reply.setAdminId(adminId);
        reply.setAnswer(replyDto.getAnswer());
        replyMapper.insertReply(reply);

        // 2) 문의 상태 변경
        inquiryMapper.updateStatus(id, "ANSWERED");
    }

    @Override
    public void updateReply(Long id, InquiryReplyDto replyDto) {
        InquiryReply r = new InquiryReply();
        r.setInquiryId(id);
        r.setAnswer(replyDto.getAnswer());
        replyMapper.updateReply(r);
    }

    @Override
    public void deleteReply(Long id) {
        replyMapper.deleteByInquiryId(id);
        inquiryMapper.updateStatus(id, "PENDING");
    }

    @Override
    public List<InquiryResponseDto> listAllAnswered() {
        return inquiryMapper.findAllAnswered().stream()
                .map(i -> {
                    InquiryReply r = replyMapper.findByInquiryId(i.getId());
                    return toDto(i,r);
                }).collect(Collectors.toList());
    }

    private InquiryResponseDto toDto(Inquiry i, InquiryReply r) {
        InquiryResponseDto dto = new InquiryResponseDto();
        dto.setId(i.getId());
        dto.setBusinessId(i.getBusinessId());
        dto.setBusinessName(i.getBusinessName());
        dto.setSubject(i.getSubject());
        dto.setMessage(i.getMessage());
        dto.setStatus(i.getStatus());
        dto.setCreatedAt(i.getCreatedAt());
        if (r != null) {
            dto.setReply(r.getAnswer());
            dto.setRepliedAt(r.getRepliedAt());
        }
        return dto;
    }
}
