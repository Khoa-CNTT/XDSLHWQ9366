package com.datn.repository;

import com.datn.entity.LopHoc;

import java.util.List;

public interface LopHocRepo {

    List<LopHoc> findAll();

    List<LopHoc> pagination(int pageNumber, int pageSize);

    LopHoc findById(String maLopHoc);

    List<LopHoc> findByTenLopHoc(String tenLopHoc);

    void checkLopHocExists(String tenLopHoc);

    LopHoc add(LopHoc lopHoc);

    LopHoc update(LopHoc lopHoc);

    void delete(String maLopHoc);

    Long countTotalLopHocs();

}
