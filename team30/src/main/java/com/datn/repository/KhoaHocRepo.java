package com.datn.repository;

import com.datn.entity.KhoaHoc;

import java.util.List;

public interface KhoaHocRepo {

    List<KhoaHoc> findAll();

    List<KhoaHoc> pagination(int pageNumber, int pageSize);

    KhoaHoc findById(String maKhoaHoc);

    List<KhoaHoc> findByTenKhoaHoc(String tenKhoaHoc);

    List<KhoaHoc> findByMaLinhVuc(String maLinhVuc, int pageNumber, int pageSize);

    void checkKhoaHocExists(String tenKhoaHoc);

    KhoaHoc add(KhoaHoc khoaHoc);

    KhoaHoc update(KhoaHoc khoaHoc);

    void delete(String maKhoaHoc);

    Long countTotalKhoaHocs();

}