package com.datn.service;

import com.datn.entity.LinhVuc;

import java.util.List;

public interface LinhVucService {

    List<LinhVuc> findAll();

    LinhVuc findById(String maLinhVuc);

}
