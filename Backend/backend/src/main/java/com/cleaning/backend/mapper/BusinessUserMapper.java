package com.cleaning.backend.mapper;

import com.cleaning.backend.dto.BusinessUserRegisterDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface BusinessUserMapper {
    void insertBusinessUser(@Param("dto") BusinessUserRegisterDto dto, @Param("filePath") String filePath);
}
