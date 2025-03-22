package com.datn.repository;

import com.datn.entity.PhongHoc;

import java.util.List;

public interface PhongHocRepo {

    List<PhongHoc> findAll();

    List<PhongHoc> findAll(int pageNumber, int pageSize);

    PhongHoc findById(int id);

    void checkPhongHocExists(String tenPhongHoc);

    PhongHoc add(PhongHoc phongHoc);

    PhongHoc update(PhongHoc phongHoc);

    void delete(PhongHoc phongHoc);

}
