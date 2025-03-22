package com.datn.service;

import com.datn.entity.GiangVien;

public interface GiangVienService {

    GiangVien add(GiangVien giangVien);

    GiangVien findById(String maGiangVien);

}
