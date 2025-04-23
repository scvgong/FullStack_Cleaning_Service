package com.cleaning.backend.mapper;

import com.cleaning.backend.model.Faq;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FaqMapper {
    void insert(Faq faq);
    List<Faq> findAll();
}
