package com.cleaning.backend.mapper;

import com.cleaning.backend.dto.BusinessQuoteResponseDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BusinessQuoteMapper {
    List<BusinessQuoteResponseDto> findByCategory(@Param("category") String category);
    List<String> findImagesByQuoteId(@Param("quoteId") Long quoteId);

    BusinessQuoteResponseDto findByIdAndCategory(Long id);

    List<BusinessQuoteResponseDto> findAll();

    List<BusinessQuoteResponseDto> findByKeyword(@Param("keyword") String keyword);

    List<BusinessQuoteResponseDto> searchQuotes(
            @Param("keyword") String keyword,
            @Param("serviceType") String serviceType,
            @Param("spaceType") String spaceType,
            @Param("size") int size,
            @Param("offset") int offset
    );

    int countSearchQuotes(
            @Param("keyword") String keyword,
            @Param("serviceType") String serviceType,
            @Param("spaceType") String spaceType
    );
}
