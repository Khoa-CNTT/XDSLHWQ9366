package com.datn.service;


import com.datn.dto.request.KhoaHocAddDTO;
import com.datn.dto.request.KhoaHocUpdateDTO;
import com.datn.dto.response.PaginationResponse;
import com.datn.entity.KhoaHoc;

import java.util.List;

public interface KhoaHocService {

    KhoaHoc add(KhoaHocAddDTO khoaHocAddDTO);

    KhoaHoc update(String maKhoaHoc, KhoaHocUpdateDTO khoaHocUpdateDTO);

    void delete(String maKhoaHoc);

    PaginationResponse<KhoaHoc> pagination(int pageNumber, int pageSize);

    List<KhoaHoc> findByTenKhoaHoc(String tenKhoaHoc);

    KhoaHoc findById(String maKhoaHoc);

    PaginationResponse<KhoaHoc> findByMaLinhVuc(String maLinhVuc, int pageNumber, int pageSize);

}