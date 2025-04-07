package com.cleaning.backend.mapper;

import com.cleaning.backend.model.QuoteImage;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface QuoteImageMapper {
    void insertQuoteImage(QuoteImage quoteImage);
}