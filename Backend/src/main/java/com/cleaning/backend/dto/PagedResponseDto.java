package com.cleaning.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class PagedResponseDto<T>{
    private List<T> content;
    private int page;
    private int size;
    private int totalPages;
    private int totalElements;
}
