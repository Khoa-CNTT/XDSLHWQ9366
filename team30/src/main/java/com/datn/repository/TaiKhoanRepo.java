package com.datn.repository;

import com.datn.entity.TaiKhoan;

import java.util.List;
import java.util.Optional;

public interface TaiKhoanRepo {

    Optional<TaiKhoan> findByTenTaiKhoan(String tenTaiKhoan);

    TaiKhoan save(TaiKhoan taiKhoan);

    List<TaiKhoan> findAll();

    void deleteById(String id);

    Optional<TaiKhoan> findByIdTaiKhoan(String id);

    TaiKhoan findById(String maTaiKhoan);

}
