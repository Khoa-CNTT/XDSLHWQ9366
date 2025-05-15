package com.datn.service;

import com.datn.dto.request.ChucVuMergeDTO;
import com.datn.dto.response.PaginationResponse;
import com.datn.entity.ChucVu;

import java.util.List;

public interface ChucVuService {

    List<ChucVu> findAll();

    ChucVu findById(String maChucVu);

    ChucVu add(ChucVuMergeDTO dto);

    ChucVu update(String maChucVu, ChucVuMergeDTO dto);

    void delete(String maChucVu);

    PaginationResponse<ChucVu> pagination(int pageNumber, int pageSize);

}
