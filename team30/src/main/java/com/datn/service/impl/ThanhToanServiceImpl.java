package com.datn.service.impl;/*
 * @project team30
 * @author Huy
 */

import com.datn.dto.request.ThanhToanDTO;
import com.datn.entity.ThanhToan;
import com.datn.repository.ThanhToanRepo;
import com.datn.service.ThanhToanService;
import com.datn.utils.TrangThaiThanhToan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThanhToanServiceImpl implements ThanhToanService {

    @Autowired
    private ThanhToanRepo thanhToanRepo;

    @Override
    public ThanhToan createThanhToan(ThanhToanDTO thanhToan) {
        return thanhToanRepo.createThanhToan(thanhToan);
    }

    @Override
    public List<ThanhToan> getAllThanhToans() {
        return thanhToanRepo.getAllThanhToans();
    }

    @Override
    public ThanhToan getThanhToanByMaGiaoDich(String maGiaoDich) {
        return thanhToanRepo.getThanhToanByMaGiaoDich(maGiaoDich);
    }

    @Override
    public ThanhToan updateTrangThaiThanhToan(String maGiaoDich, TrangThaiThanhToan trangThai) {
        return thanhToanRepo.updateTrangThaiThanhToan(maGiaoDich, trangThai);
    }
}
