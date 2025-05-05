package com.datn.service;

import com.datn.entity.ChucVu;

import java.util.List;

public interface ChucVuService {

    List<ChucVu> findAll();

    ChucVu findById(String maChucVu);

}
