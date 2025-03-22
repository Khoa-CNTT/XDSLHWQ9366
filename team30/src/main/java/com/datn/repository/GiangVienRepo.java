package com.datn.repository;

import com.datn.entity.GiangVien;

import java.util.List;

public interface GiangVienRepo {

    List<GiangVien> findAll();

    GiangVien findById(String maGiangVien);

    GiangVien add(GiangVien giangVien);

    GiangVien update(GiangVien giangVien);

    void delete(String maGiangVien);

    void checkSoCMNDExists(String soCMND);

    void checkSoDienThoaiExists(String soDienThoai);

    void checkEmailExists(String email);

}
