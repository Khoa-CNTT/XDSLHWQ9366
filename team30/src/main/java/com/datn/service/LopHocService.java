package com.datn.service;

import com.datn.dto.request.LopHocAddDTO;
import com.datn.dto.request.LopHocUpdateDTO;
import com.datn.dto.response.PaginationResponse;
import com.datn.entity.LopHoc;

import java.util.List;

public interface LopHocService {

    LopHoc add(LopHocAddDTO lopHocAddDTO);

    LopHoc update(String maLopHoc, LopHocUpdateDTO lopHocUpdateDTO);

    void delete(String maLopHoc);

    PaginationResponse<LopHoc> pagination(int pageNumber, int pageSize);

    List<LopHoc> findByTenLopHoc(String tenLopHoc);

}
