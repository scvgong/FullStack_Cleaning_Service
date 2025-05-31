package com.cleaning.backend.service.serviceimpl;

import com.cleaning.backend.dto.InquiryRequestDto;
import com.cleaning.backend.dto.InquiryResponseDto;
import com.cleaning.backend.mapper.InquiryMapper;
import com.cleaning.backend.mapper.InquiryReplyMapper;
import com.cleaning.backend.model.Inquiry;
import com.cleaning.backend.model.InquiryReply;
import com.cleaning.backend.service.BusinessInquiryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BusinessInquiryServiceImpl implements BusinessInquiryService {

    private final InquiryMapper inquiryMapper;
    private final InquiryReplyMapper replyMapper;

    @Override
    public void createInquiry(InquiryRequestDto req) {
        inquiryMapper.insert(req);
    }

    @Override
    public List<InquiryResponseDto> listMyInquiries(Long businessId) {
        return inquiryMapper.findAllByBusiness(businessId).stream()
                .map(this::toDto)  // 간단 변환 메서드
                .collect(Collectors.toList());
    }

    private InquiryResponseDto toDto(Inquiry i) {
        InquiryResponseDto dto = new InquiryResponseDto();
        dto.setId(i.getId());
        dto.setBusinessId(i.getBusinessId());
        dto.setBusinessName(i.getBusinessName());
        dto.setSubject(i.getSubject());
        dto.setMessage(i.getMessage());
        dto.setStatus(i.getStatus());
        dto.setCreatedAt(i.getCreatedAt());
        dto.setReply(null);
        dto.setRepliedAt(null);
        return dto;
    }

    @Override
    public InquiryResponseDto getDetail(Long id, Long businessId) throws AccessDeniedException {
        Inquiry i = inquiryMapper.findById(id);
        if (!i.getBusinessId().equals(businessId)) {
            throw new AccessDeniedException("본인 문의만 조회 가능합니다.");
        }
        InquiryReply r = replyMapper.findByInquiryId(id);
        return toDto(i, r);
    }

    @Override
    public void deleteInquiry(Long id, Long businessId) throws AccessDeniedException {
        Inquiry i = inquiryMapper.findById(id);
        if (!i.getBusinessId().equals(businessId)) {
            throw new AccessDeniedException("본인 문의만 삭제 가능합니다.");
        }
        inquiryMapper.updateStatus(id, "PENDING"); // or 실제 삭제 로직
    }

//    private InquiryResponseDto toDto(Inquiry i) {
//        return toDto(i, replyMapper.findByInquiryId(i.getId()));
//    }
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
            dto.setReply(r.getAnswer());       // 답변 텍스트
            dto.setRepliedAt(r.getRepliedAt());
        }
        return dto;
    }


}
