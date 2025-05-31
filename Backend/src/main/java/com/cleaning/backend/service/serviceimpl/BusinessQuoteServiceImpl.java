package com.cleaning.backend.service.serviceimpl;

import com.cleaning.backend.dto.BusinessQuoteResponseDto;
import com.cleaning.backend.mapper.BusinessQuoteMapper;
import com.cleaning.backend.service.BusinessQuoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BusinessQuoteServiceImpl implements BusinessQuoteService {

    private final BusinessQuoteMapper mapper;

    @Override
    public List<BusinessQuoteResponseDto> getQuotesForCategory(String category) {
        List<BusinessQuoteResponseDto> list = mapper.findByCategory(category);
        list.forEach(q -> q.setImages(mapper.findImagesByQuoteId(q.getId())));
        return list;
    }

    @Override
    public BusinessQuoteResponseDto getQuoteDetail(Long id, String category) {
        return mapper.findByIdAndCategory(id, category);
    }
}
