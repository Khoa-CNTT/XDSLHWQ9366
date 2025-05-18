package com.datn.repository;


import com.datn.entity.ChiTietLopHoc;
import com.datn.entity.LichThi;

import java.util.List;

public interface ChiTietLopHocRepo {

    List<ChiTietLopHoc> findAll();

    ChiTietLopHoc findById(String maCTLH);

    ChiTietLopHoc add(ChiTietLopHoc chiTietLopHoc);

    List<ChiTietLopHoc> pagination(int pageNumber, int pageSize);
    List<ChiTietLopHoc> getAllChiTietLopHoc();

}
