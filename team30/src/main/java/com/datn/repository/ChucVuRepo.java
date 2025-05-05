package com.datn.repository;

import com.datn.entity.ChucVu;

import java.util.List;

public interface ChucVuRepo {

    List<ChucVu> findAll();

    ChucVu findById(String maChucVu);

}
