package com.datn.repository;


import com.datn.entity.HocVien;

import java.util.List;

public interface HocVienRepo {

    List<HocVien> findAll();

    List<HocVien> pagination(int pageNumber, int pageSize);

    HocVien findById(String maHocVien);

    List<HocVien> findByTenHocVien(String tenHocVien);

    HocVien add(HocVien hocVien);

    HocVien update(HocVien hocVien);

    void delete(String maHocVien);

    void checkSoCMNDExists(String soCMND);

    void checkSoDienThoaiExists(String soDienThoai);

    void checkEmailExists(String email);

}
