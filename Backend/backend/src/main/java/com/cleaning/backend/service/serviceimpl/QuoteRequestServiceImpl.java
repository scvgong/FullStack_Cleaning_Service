package com.cleaning.backend.service.serviceimpl;

import com.cleaning.backend.dto.QuoteRequestDto;
import com.cleaning.backend.mapper.QuoteImageMapper;
import com.cleaning.backend.mapper.QuoteRequestMapper;
import com.cleaning.backend.model.QuoteImage;
import com.cleaning.backend.model.QuoteRequest;
import com.cleaning.backend.service.QuoteRequestService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class QuoteRequestServiceImpl implements QuoteRequestService {

    private final QuoteRequestMapper quoteRequestMapper;
    private final QuoteImageMapper quoteImageMapper;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @PostConstruct
    public void initUploadDir() {
        // 1. 상대 경로를 프로젝트 기준 절대 경로로 변환
        String basePath = new File("").getAbsolutePath();
        File fullPath = new File(basePath, uploadDir);

        // 2. 디렉토리가 없으면 생성
        if (!fullPath.exists()) {
            boolean created = fullPath.mkdirs();
            System.out.println("📂 uploads 폴더 생성됨: " + fullPath.getAbsolutePath() + " (성공 여부: " + created + ")");
        } else {
            System.out.println("✅ uploads 폴더 이미 존재: " + fullPath.getAbsolutePath());
        }

        // 3. 이후 모든 업로드는 이 경로로 저장되게 설정
        uploadDir = fullPath.getAbsolutePath();
    }

    @Override
    public void saveQuote(QuoteRequestDto dto, List<MultipartFile> images){
        // 1. 견적 요청 정보 저장
        QuoteRequest entity = new QuoteRequest();
        entity.setServiceType(dto.getServiceType());
        entity.setSpaceType(dto.getSpaceType());
        entity.setArea(dto.getArea());
        entity.setName(dto.getName());
        entity.setPhone(dto.getPhone());
        entity.setEmail(dto.getEmail());
        entity.setLocation(dto.getLocation());
        entity.setMessage(dto.getMessage());

        quoteRequestMapper.insertQuote(entity); // 여기서 ID가 생성됨 (selectKey)

        // 2. 이미지 저장
        if (images != null && !images.isEmpty()) {
            for (MultipartFile image : images) {
                if (!image.isEmpty()) {
                    String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
                    File dest = new File(uploadDir, fileName);
                    System.out.println("Uploading image: " + image.getOriginalFilename());
                    try {
                        image.transferTo(dest);
                        System.out.println("Saved to: " + dest.getAbsolutePath());

                        QuoteImage quoteImage = new QuoteImage();
                        quoteImage.setQuoteId(entity.getId());
                        quoteImage.setFilePath(fileName);

                        quoteImageMapper.insertQuoteImage(quoteImage);
                    } catch (IOException e) {
                        e.printStackTrace();
                        // 예외 처리는 필요시 별도로 로깅하거나 예외 전파
                        throw new RuntimeException("이미지 저장 실패 : " + fileName, e);
                    }
                }
            }
        }
    }

    @Override
    public List<QuoteRequest> getAllQuotes() {
        return quoteRequestMapper.getAllQuotes();
    }

    public QuoteRequest getQuoteDetail(Long id) {
        return quoteRequestMapper.findQuoteWithImagesById(id);
    }

}
