package com.datn.service.impl;

import com.datn.dto.request.ThanhToanDTO;
import com.datn.entity.ThanhToan;
import com.datn.repository.ThanhToanRepo;
import com.datn.service.ThanhToanService;
import com.datn.utils.TrangThaiThanhToan;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThanhToanServiceImpl implements ThanhToanService {
    private static final Logger logger = LoggerFactory.getLogger(ThanhToanServiceImpl.class);

    @Autowired
    private ThanhToanRepo thanhToanRepo;

    @Override
    public ThanhToan createThanhToan(ThanhToanDTO thanhToanDTO) {
        if (thanhToanDTO.getSoTien() <= 0) {
            logger.error("Invalid amount: {}", thanhToanDTO.getSoTien());
            throw new IllegalArgumentException("Số tiền phải lớn hơn 0");
        }
        if (thanhToanDTO.getMaHocVien() == null || thanhToanDTO.getMaKhoaHoc() == null || thanhToanDTO.getMaHocVien() == null) {
            logger.error("Missing required fields: maHocVien={}, maKhoaHoc={}, nguoiTao={}",
                    thanhToanDTO.getMaHocVien(), thanhToanDTO.getMaKhoaHoc(), thanhToanDTO.getNguoiTao());
            throw new IllegalArgumentException("Thiếu thông tin học viên, khóa học hoặc người tạo");
        }

        logger.info("Creating transaction: maHocVien={}, maKhoaHoc={}, nguoiTao={}",
                thanhToanDTO.getMaHocVien(), thanhToanDTO.getMaKhoaHoc(), thanhToanDTO.getNguoiTao());

        return thanhToanRepo.createThanhToan(thanhToanDTO);
    }

    @Override
    public List<ThanhToan> getAllThanhToans() {
        logger.info("Fetching all transactions");
        return thanhToanRepo.getAllThanhToans();
    }
}