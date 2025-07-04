package com.cleaning.backend.repository;

import com.cleaning.backend.model.BusinessUser;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.Optional;

@Mapper
public interface BusinessUserRepository {

    @Select("SELECT * FROM BUSINESS_USER WHERE USERNAME = #{username}")
    Optional<BusinessUser> findByUsername(String username);

    @Select("SELECT * FROM BUSINESS_USER WHERE ID = #{id}")
    Optional<BusinessUser> findById(Long id);
}
