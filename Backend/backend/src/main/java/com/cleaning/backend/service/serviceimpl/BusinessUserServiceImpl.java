package com.cleaning.backend.service.serviceimpl;

import com.cleaning.backend.dto.BusinessUserRegisterDto;
import com.cleaning.backend.mapper.BusinessUserMapper;
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
public class BusinessUserServiceImpl {
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
}
