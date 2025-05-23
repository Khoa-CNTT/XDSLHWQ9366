package com.datn.service.impl;

import com.datn.dto.request.PhieuThuAddDTO;
import com.datn.dto.request.PhieuThuUpdateDTO;
import com.datn.entity.NhanVien;
import com.datn.entity.NhanVienKeToan;
import com.datn.entity.PhieuChi;
import com.datn.entity.PhieuThu;
import com.datn.repository.NhanVienRepo;
import com.datn.repository.PhieuThuRepo;
import com.datn.service.PhieuThuService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhieuThuServiceImpl implements PhieuThuService {

    @Autowired
    private PhieuThuRepo phieuThuRepo;

    @Autowired
    private NhanVienRepo nhanVienRepo;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<PhieuThu> getAllPhieuThu() {
        return phieuThuRepo.findAll();
    }

    @Override
    @Transactional
    public PhieuThu createPhieuThu(PhieuThuAddDTO dto) {
        PhieuThu pt = new PhieuThu();
        String id = (String) entityManager.createNativeQuery(
                "SELECT CONCAT('PT', LPAD(IFNULL(MAX(CAST(SUBSTRING(MAPHIEUTHU, 3, 3) AS UNSIGNED)), 0) + 1, 3, '0')) FROM PHIEUTHUS"
        ).getSingleResult();

        pt.setMaPhieuThu(id);
        pt.setNoiDung(dto.getNoiDung());
        pt.setSoTien(dto.getSoTien());
        pt.setNgayThu(dto.getNgayThu());
        pt.setNguoiNop(dto.getNguoiNop());
        pt.setDiaChi(dto.getDiaChi());
        pt.setGhiChu(dto.getGhiChu());

        if (dto.getMaKeToanVien() != null) {
            NhanVienKeToan keToan = nhanVienRepo.findByIdKT(dto.getMaKeToanVien());
            pt.setNhanVienKeToan(keToan);
        }

        return phieuThuRepo.save(pt);
    }

    @Override
    @Transactional
    public PhieuThu updatePhieuThu(String id, PhieuThuUpdateDTO dto) {
        PhieuThu pt = phieuThuRepo.findById(id);
        if (pt != null) {
            pt.setNoiDung(dto.getNoiDung());
            pt.setSoTien(dto.getSoTien());
            pt.setNgayThu(dto.getNgayThu());
            pt.setNguoiNop(dto.getNguoiNop());
            pt.setDiaChi(dto.getDiaChi());
            pt.setGhiChu(dto.getGhiChu());
            return phieuThuRepo.save(pt);
        }
        return null;
    }

    @Override
    @Transactional
    public void deletePhieuThu(String id) {
        PhieuThu pt = phieuThuRepo.findById(id);
        if (pt == null) throw new RuntimeException("Không tìm thấy phiếu chi để xóa");
        phieuThuRepo.deleteById(id);
    }
}
