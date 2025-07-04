package com.cleaning.backend.service.serviceimpl;

import com.cleaning.backend.dto.BusinessUserDto;
import com.cleaning.backend.dto.BusinessUserRegisterDto;
import com.cleaning.backend.dto.BusinessUserUpdateRequest;
import com.cleaning.backend.mapper.BusinessUserMapper;
import com.cleaning.backend.model.BusinessUser;
import com.cleaning.backend.service.BusinessUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BusinessUserServiceImpl implements BusinessUserService {
    private final BusinessUserMapper mapper;
    private final PasswordEncoder passwordEncoder;

    public void register(BusinessUserRegisterDto dto) {
        MultipartFile file = dto.getBizDoc();
        String filePath = null;

        if (file != null && !file.isEmpty()) {
            try {
                String uploadDir = "uploads/business_docs/";
                File dir = new File(uploadDir);
                if (!dir.exists()) dir.mkdirs();

                String ext = file.getOriginalFilename()
                        .substring(file.getOriginalFilename().lastIndexOf("."));
                String filename = UUID.randomUUID() + ext;
                Path savePath = Paths.get(uploadDir + filename);
                Files.write(savePath, file.getBytes());
                filePath = "/uploads/business_docs/" + filename;
            } catch (IOException e) {
                throw new RuntimeException("파일 저장 실패", e);
            }
        }

        dto.setPassword(passwordEncoder.encode(dto.getPassword()));
        mapper.insertBusinessUser(dto, filePath);
    }

    @Override
    public BusinessUserDto getMyInfo(Long userId) {
        BusinessUser user = mapper.findById(userId);

        BusinessUserDto dto = new BusinessUserDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setName(user.getName());
        dto.setBusinessNo(user.getBusinessNo());
        dto.setPhone(user.getPhone());
        dto.setAltPhone(user.getAltPhone());
        dto.setBizDocPath(user.getBizDocPath());
        dto.setCreatedAt(user.getCreatedAt());
        return dto;
    }

    @Override
    public void updateMyInfo(Long userId, BusinessUserUpdateRequest request, MultipartFile bizDoc) {
        BusinessUser user = new BusinessUser();
        user.setId(userId);
        user.setName(request.getName());
        user.setPhone(request.getPhone());
        user.setAltPhone(request.getAltPhone());

        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        // 등록증 파일 처리
        if (bizDoc != null && !bizDoc.isEmpty()) {
            String uploadDir = "uploads/biz-docs/";
            File dir = new File(uploadDir);
            if (!dir.exists()) dir.mkdirs();

            String filename = UUID.randomUUID() + "_" + bizDoc.getOriginalFilename();
            File savedFile = new File(uploadDir + filename);

            try {
                bizDoc.transferTo(savedFile);
                user.setBizDocPath(uploadDir + filename);
            } catch (IOException e) {
                throw new RuntimeException("사업자 등록증 저장 실패", e);
            }
        }

        mapper.update(user);
    }
}
