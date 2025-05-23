package com.datn.repository;/*
 * @project team30
 * @author Huy
 */

import com.datn.entity.PhieuChi;


import java.util.List;

public interface PhieuChiRepo {

    List<PhieuChi> findAll();
    PhieuChi findById(String id);
    PhieuChi save(PhieuChi phieuThu);
    void deleteById(String id);

}
