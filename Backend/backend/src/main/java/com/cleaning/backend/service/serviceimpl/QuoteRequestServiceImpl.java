package com.cleaning.backend.service.serviceimpl;

import com.cleaning.backend.dto.QuoteRequestDto;
import com.cleaning.backend.mapper.QuoteRequestMapper;
import com.cleaning.backend.model.QuoteRequest;
import com.cleaning.backend.service.QuoteRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class QuoteRequestServiceImpl implements QuoteRequestService {

    private final QuoteRequestMapper quoteRequestMapper;

    @Override
    public void saveQuote(QuoteRequestDto dto) {
        QuoteRequest entity = new QuoteRequest();
        entity.setServiceType(dto.getServiceType());
        entity.setSpaceType(dto.getSpaceType());
        entity.setArea(dto.getArea());
        entity.setName(dto.getName());
        entity.setPhone(dto.getPhone());
        entity.setEmail(dto.getEmail());
        entity.setLocation(dto.getLocation());
        entity.setMessage(dto.getMessage());
        quoteRequestMapper.insertQuote(entity);
    }
}
