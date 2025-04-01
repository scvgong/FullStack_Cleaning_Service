package com.cleaning.backend.mapper;

import com.cleaning.backend.model.QuoteRequest;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface QuoteRequestMapper {
    void insertQuote(QuoteRequest request);
    QuoteRequest findById(Long id);
}
