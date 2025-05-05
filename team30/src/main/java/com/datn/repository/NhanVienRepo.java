package com.datn.repository;/*
 * @project team30
 * @author Huy
 */

import com.datn.entity.NhanVien;

import java.util.Optional;

public interface NhanVienRepo {

    Optional<NhanVien> findById(Long id);

}
