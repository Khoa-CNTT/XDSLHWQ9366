package com.datn.service.impl;

import com.datn.dto.request.PhieuChiAddDTO;
import com.datn.dto.request.PhieuChiUpdateDTO;
import com.datn.entity.NhanVienKeToan;
import com.datn.entity.PhieuChi;
import com.datn.repository.NhanVienRepo;
import com.datn.repository.PhieuChiRepo;
import com.datn.service.PhieuChiService;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PhieuChiServiceImpl implements PhieuChiService {

    private final PhieuChiRepo phieuChiRepo;
    private final NhanVienRepo nhanVienRepo;
    private final EntityManager entityManager;

    public PhieuChiServiceImpl(PhieuChiRepo phieuChiRepo, NhanVienRepo nhanVienRepo, EntityManager entityManager) {
        this.phieuChiRepo = phieuChiRepo;
        this.nhanVienRepo = nhanVienRepo;
        this.entityManager = entityManager;
    }

    @Override
    public List<PhieuChi> getAllPhieuChi() {
        return phieuChiRepo.findAll();
    }

    @Override
    @Transactional
    public PhieuChi createPhieuChi(PhieuChiAddDTO dto) {
        PhieuChi pc = new PhieuChi();

        String id = (String) entityManager.createNativeQuery(
                "SELECT CONCAT('PC', LPAD(IFNULL(MAX(CAST(SUBSTRING(MAPHIEUCHI, 3, 3) AS UNSIGNED)), 0) + 1, 3, '0')) FROM PHIEUCHIS"
        ).getSingleResult();

        pc.setMaPhieuChi(id);
        pc.setNoiDung(dto.getNoiDung());
        pc.setSoTien(dto.getSoTien());
        pc.setNgayChi(dto.getNgayChi());
        pc.setNguoiNhan(dto.getNguoiNhan());
        pc.setDiaChi(dto.getDiaChi());
        pc.setGhiChu(dto.getGhiChu());

        if (dto.getMaKeToanVien() != null) {
            NhanVienKeToan keToan = nhanVienRepo.findByIdKT(dto.getMaKeToanVien());
            pc.setNhanVienKeToan(keToan);
        }

        return phieuChiRepo.save(pc);
    }

    @Override
    @Transactional
    public PhieuChi updatePhieuChi(String id, PhieuChiUpdateDTO dto) {
        PhieuChi pc = phieuChiRepo.findById(id);
        if (pc == null) throw new RuntimeException("Không tìm thấy phiếu chi với mã: " + id);

        pc.setNoiDung(dto.getNoiDung());
        pc.setSoTien(dto.getSoTien());
        pc.setNgayChi(dto.getNgayChi());
        pc.setNguoiNhan(dto.getNguoiNhan());
        pc.setDiaChi(dto.getDiaChi());
        pc.setGhiChu(dto.getGhiChu());

        if (dto.getMaKeToanVien() != null) {
            NhanVienKeToan keToan = nhanVienRepo.findByIdKT(dto.getMaKeToanVien());
            pc.setNhanVienKeToan(keToan);
        }

        return phieuChiRepo.save(pc);
    }

    @Override
    @Transactional
    public void deletePhieuChi(String id) {
        PhieuChi pc = phieuChiRepo.findById(id);
        if (pc == null) throw new RuntimeException("Không tìm thấy phiếu chi để xóa");
        phieuChiRepo.deleteById(id);
    }
}
