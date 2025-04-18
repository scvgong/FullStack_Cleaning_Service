package com.cleaning.backend.mapper;

import com.cleaning.backend.dto.BusinessUserRegisterDto;
import com.cleaning.backend.model.BusinessUser;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface BusinessUserMapper {
    BusinessUser findByUsername(String username);
    void insertBusinessUser(@Param("dto") BusinessUserRegisterDto dto, @Param("filePath") String filePath);
}
