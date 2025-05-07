package com.datn.service;/*
 * @project team30
 * @author Huy
 */

import com.datn.dto.request.ThanhToanDTO;
import com.datn.entity.ThanhToan;
import com.datn.utils.TrangThaiThanhToan;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface ThanhToanService {
    List<ThanhToan> getAllThanhToans();

    ThanhToan getThanhToanByMaGiaoDich(String maGiaoDich);
    ThanhToan updateTrangThaiThanhToan(String maGiaoDich, @RequestBody TrangThaiThanhToan trangThai);

    ThanhToan createThanhToan(ThanhToanDTO thanhToan);
}
