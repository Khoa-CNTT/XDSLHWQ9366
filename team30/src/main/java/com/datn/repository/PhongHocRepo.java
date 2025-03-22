package com.datn.repository;

import com.datn.entity.PhongHoc;

import java.util.List;

public interface PhongHocRepo {

    List<PhongHoc> findAll();

    List<PhongHoc> pagination(int pageNumber, int pageSize);

    PhongHoc findById(String maPhongHoc);

    List<PhongHoc> findByTenPhongHoc(String tenPhongHoc);

    void checkPhongHocExists(String tenPhongHoc);

    PhongHoc add(PhongHoc phongHoc);

    PhongHoc update(PhongHoc phongHoc);

    void delete(String maPhongHoc);

    Long countTotalPhongHocs();

}
