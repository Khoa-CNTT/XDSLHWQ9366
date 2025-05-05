package com.datn.repository;

import com.datn.entity.LinhVuc;

import java.util.List;

public interface LinhVucRepo {

    List<LinhVuc> findAll();

    LinhVuc findById(String maLinhVuc);

}
