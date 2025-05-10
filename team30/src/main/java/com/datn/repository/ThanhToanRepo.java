package com.datn.repository;/*
 * @project team30
 * @author Huy
 */

import com.datn.dto.request.ThanhToanDTO;
import com.datn.entity.ThanhToan;
import com.datn.utils.TrangThaiThanhToan;

import java.util.List;

public interface ThanhToanRepo {
    List<ThanhToan> getAllThanhToans();

    ThanhToan createThanhToan(ThanhToanDTO thanhToan);

    ThanhToan getThanhToanByMaGiaoDich(String maGiaoDich);

    ThanhToan updateTrangThaiThanhToan(String maGiaoDich, TrangThaiThanhToan trangThai);
}
