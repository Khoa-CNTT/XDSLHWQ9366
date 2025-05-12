package com.datn.service;

import com.datn.dto.request.ChiTietLopHocAddDTO;
import com.datn.dto.response.PaginationResponse;
import com.datn.entity.ChiTietLopHoc;


public interface ChiTietLopHocService {

    ChiTietLopHoc findById(String maCTLH);

    ChiTietLopHoc add(ChiTietLopHocAddDTO dto);

    PaginationResponse<ChiTietLopHoc> pagination(int pageNumber, int pageSize);

}
