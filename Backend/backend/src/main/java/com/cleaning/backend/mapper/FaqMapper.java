package com.cleaning.backend.mapper;

import com.cleaning.backend.model.Faq;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FaqMapper {
    void insert(Faq faq);
}
