package com.cleaning.backend.mapper;

import com.cleaning.backend.model.QuoteRequest;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface QuoteRequestMapper {
    void insertQuote(QuoteRequest request);
    QuoteRequest findById(Long id);
    List<QuoteRequest> getAllQuotes();

}
