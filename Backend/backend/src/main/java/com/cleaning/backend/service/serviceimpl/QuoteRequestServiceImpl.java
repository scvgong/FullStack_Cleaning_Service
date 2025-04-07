package com.cleaning.backend.service.serviceimpl;

import com.cleaning.backend.dto.QuoteRequestDto;
import com.cleaning.backend.mapper.QuoteRequestMapper;
import com.cleaning.backend.model.QuoteRequest;
import com.cleaning.backend.service.QuoteRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;

@RequiredArgsConstructor
@Service
public class QuoteRequestServiceImpl implements QuoteRequestService {

    private final QuoteRequestMapper quoteRequestMapper;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Override
    public void saveQuote(QuoteRequestDto dto, MultipartFile image) {
        QuoteRequest entity = new QuoteRequest();
        entity.setServiceType(dto.getServiceType());
        entity.setSpaceType(dto.getSpaceType());
        entity.setArea(dto.getArea());
        entity.setName(dto.getName());
        entity.setPhone(dto.getPhone());
        entity.setEmail(dto.getEmail());
        entity.setLocation(dto.getLocation());
        entity.setMessage(dto.getMessage());

        // 이미지 저장 로직
        if (image != null && !image.isEmpty()) {
            try {
                String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();

                // 프로젝트 루트 기준 상대경로 → 절대경로로 변환
                String absolutePath = new File(System.getProperty("user.dir"), uploadDir).getAbsolutePath();
                File uploadPath = new File(absolutePath);
                if (!uploadPath.exists()) {
                    uploadPath.mkdirs();
                }

                File dest = new File(uploadPath, fileName);
                image.transferTo(dest);

                // DB에 경로 저장 (상대경로 또는 파일명만 저장)
                entity.setImagePath(uploadDir + fileName);

            } catch (IOException e) {
                e.printStackTrace();
                throw new RuntimeException("파일 업로드 실패", e);
            }
        }

        quoteRequestMapper.insertQuote(entity);
    }
}
