package com.datn.service;

import com.datn.dto.response.PaginationResponse;
import com.datn.entity.GiangVien;

public interface GiangVienService {

    GiangVien add(GiangVien giangVien);

    GiangVien findById(String maGiangVien);

    GiangVien update(GiangVien giangVien);

    void delete(String maGiangVien);

    PaginationResponse<GiangVien> pagination(int pageNumber, int pageSize);

}
