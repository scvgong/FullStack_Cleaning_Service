package com.cleaning.backend.mapper;

import com.cleaning.backend.model.AdminUser;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface AdminUserMapper {
    AdminUser findByUsername(@Param("username") String name);
    void insertAdminUser(AdminUser user);
}