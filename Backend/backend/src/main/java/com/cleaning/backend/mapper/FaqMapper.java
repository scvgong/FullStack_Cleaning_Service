package com.cleaning.backend.mapper;

import com.cleaning.backend.dto.FaqRequestDto;
import com.cleaning.backend.dto.FaqResponseDto;
import com.cleaning.backend.model.Faq;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface FaqMapper {
    void insert(Faq faq);
    List<FaqResponseDto> findAll();
    FaqResponseDto findById(@Param("id") Long id);
    void update(@Param("id") Long id, @Param("dto") FaqRequestDto dto);
    void delete(@Param("id") Long id);
}
