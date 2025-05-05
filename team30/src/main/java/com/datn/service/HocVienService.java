package com.datn.service;

import com.datn.dto.request.HocVienAddDTO;
import com.datn.dto.response.PaginationResponse;
import com.datn.entity.HocVien;

import java.util.List;

public interface HocVienService {

    HocVien add(HocVienAddDTO hocVienAddDTO);

    HocVien findById(String maHocVien);

    List<HocVien> findAll();

    HocVien update(HocVien hocVien);

    void delete(String maHocVien);

    PaginationResponse<HocVien> pagination(int pageNumber, int pageSize);

    List<HocVien> findByTenHocVien(String tenHocVien);

}
