package com.cleaning.backend.service.serviceimpl;

import com.cleaning.backend.dto.InquiryReplyDto;
import com.cleaning.backend.dto.InquiryResponseDto;
import com.cleaning.backend.mapper.InquiryMapper;
import com.cleaning.backend.model.Inquiry;
import com.cleaning.backend.service.AdminInquiryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminInquiryServiceImpl implements AdminInquiryService {
    private final InquiryMapper mapper;
    public List<InquiryResponseDto> listAll() {
        return mapper.findAll().stream()
                .map(inq -> new InquiryResponseDto(
                        inq.getId(), inq.getBusinessId(), inq.getBusinessName(),
                        inq.getSubject(), inq.getMessage(),
                        inq.getReply(), inq.getCreatedAt(), inq.getRepliedAt()
                ))
                .toList();
    }
    public InquiryResponseDto getDetail(Long id) { /* 동일 변환 */
        Inquiry inquiry = mapper.findById(id);

        // Inquiry → InquiryResponseDto 변환
        return new InquiryResponseDto(
                inquiry.getId(),
                inquiry.getBusinessId(),
                inquiry.getBusinessName(),
                inquiry.getSubject(),
                inquiry.getMessage(),
                inquiry.getReply(),
                inquiry.getCreatedAt(),
                inquiry.getRepliedAt()
        );
    }
    public void replyToInquiry(Long id, InquiryReplyDto dto) {
        mapper.updateReply(id, dto.reply());
    }
}
