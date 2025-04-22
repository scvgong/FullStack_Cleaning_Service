package com.cleaning.backend.service.serviceimpl;

import com.cleaning.backend.dto.FaqRequestDto;
import com.cleaning.backend.mapper.FaqMapper;
import com.cleaning.backend.model.Faq;
import com.cleaning.backend.service.FaqService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
