package com.datn.repository;

import com.datn.entity.ChucVu;

import java.util.List;

public interface ChucVuRepo {

    List<ChucVu> findAll();

    ChucVu findById(String maChucVu);

    ChucVu add(ChucVu chucVu);

    ChucVu update(ChucVu chucVu);

    void delete(String maChucVu);

    void checkChucVuExists(String tenChucVu);

    List<ChucVu> pagination(int pageNumber, int pageSize);

}
