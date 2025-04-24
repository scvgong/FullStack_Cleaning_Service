package com.cleaning.backend.service.serviceimpl;

import com.cleaning.backend.dto.FaqRequestDto;
import com.cleaning.backend.dto.FaqResponseDto;
import com.cleaning.backend.mapper.FaqMapper;
import com.cleaning.backend.model.Faq;
import com.cleaning.backend.service.FaqService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class FaqServiceImpl implements FaqService {

    private final FaqMapper faqMapper;

    @Override
    public void createFaq(FaqRequestDto dto) {
        Faq faq = new Faq();
        faq.setQuestion(dto.getQuestion());
        faq.setAnswer(dto.getAnswer());
        faqMapper.insert(faq);
    }

    @Override
    public List<FaqResponseDto> getFaqList() {
        return faqMapper.findAll();
    }

    @Override
    public FaqResponseDto getFaq(Long id) {
        return faqMapper.findById(id);
    }

    @Override
    public void updateFaq(Long id, FaqRequestDto dto) {
        faqMapper.update(id, dto);
    }

    @Override
    public void deleteFaq(Long id) {
        faqMapper.delete(id);
    }
}
