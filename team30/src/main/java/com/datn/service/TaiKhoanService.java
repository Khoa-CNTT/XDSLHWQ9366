package com.datn.service;/*
 * @project team30
 * @author Huy
 */

import com.datn.dto.request.TaiKhoanDTO;
import com.datn.entity.TaiKhoan;

import java.util.List;
import java.util.Optional;

public interface TaiKhoanService {

    TaiKhoan register(TaiKhoanDTO dto);

    Optional<TaiKhoan> findByUsername(String username);

    List<TaiKhoan> findAll();

    void deleteById(String maTaiKhoan);

    Optional<TaiKhoan> findById(String id);
}
