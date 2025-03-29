package com.datn.service;

import com.datn.dto.response.PaginationResponse;
import com.datn.entity.GiangVien;

import java.util.List;

public interface GiangVienService {

    GiangVien add(GiangVien giangVien);

    GiangVien findById(String maGiangVien);

    List<GiangVien> findAll();

    GiangVien update(GiangVien giangVien);

    void delete(String maGiangVien);

    PaginationResponse<GiangVien> pagination(int pageNumber, int pageSize);

    List<GiangVien> findByTenGiangVien(String tenGiangVien);

}
