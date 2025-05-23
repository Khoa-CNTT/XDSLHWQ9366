package com.datn.repository;/*
 * @project team30
 * @author Huy
 */

import com.datn.entity.PhieuThu;

import java.util.List;

public interface PhieuThuRepo {
     List<PhieuThu> findAll();
     PhieuThu findById(String id);
     PhieuThu save(PhieuThu phieuThu);
     void deleteById(String id);
}
