package com.cleaning.backend.service.serviceimpl;

import com.cleaning.backend.dto.QuoteRequestDto;
import com.cleaning.backend.mapper.QuoteRequestMapper;
import com.cleaning.backend.model.QuoteRequest;
import com.cleaning.backend.service.QuoteRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class QuoteRequestServiceImpl implements QuoteRequestService {

    private final QuoteRequestMapper quoteRequestMapper;

    @Override
    public void saveQuote(QuoteRequestDto dto) {
        // 이미지 저장처리
//        String imagePath = null;
//        if (image != null && !image.isEmpty()) {
//            try{
//                String uploadDir = "uploads/";
//                String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
//                File uploadPath = new File(uploadDir);
//                if(!uploadPath.exists()){
//                    uploadPath.mkdirs();
//                }
//                File dest = new File(uploadDir + fileName);
//                image.transferTo(dest);
//                imagePath = dest.getPath();
//                System.out.printlm("이미지 저장 완료 : " + imagePath);
//            } catch (IOException e){
//                throw new RuntimeException("파일 업로드 실패",e);
//            }
//        }

        QuoteRequest entity = new QuoteRequest();
        entity.setServiceType(dto.getServiceType());
        entity.setSpaceType(dto.getSpaceType());
        entity.setArea(dto.getArea());
        entity.setName(dto.getName());
        entity.setPhone(dto.getPhone());
        entity.setEmail(dto.getEmail());
        entity.setLocation(dto.getLocation());
        entity.setMessage(dto.getMessage());
        quoteRequestMapper.insertQuote(entity);
    }
}
