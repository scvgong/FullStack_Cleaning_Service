package com.cleaning.backend.mapper;

import com.cleaning.backend.dto.QuoteRequestDto;
import com.cleaning.backend.model.QuoteRequest;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface QuoteRequestMapper {
    void insertQuote(QuoteRequest request);
    QuoteRequest findQuoteWithImagesById(Long id);
    List<QuoteRequest> getAllQuotes();
    void deleteQuoteById(Long id);
    void updateQuote(QuoteRequest quoteRequest);
    
    //페이징
    List<QuoteRequest> getQuotesWithPagination(@Param("offset") int offset, @Param("limit") int limit);
    int getTotalQuoteCount();// 전체 데이터 개수 조회

}
