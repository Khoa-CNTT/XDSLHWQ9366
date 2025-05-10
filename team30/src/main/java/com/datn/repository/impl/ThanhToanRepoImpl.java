package com.datn.repository.impl;/*
 * @project team30
 * @author Huy
 */

import com.datn.dto.request.ThanhToanDTO;
import com.datn.entity.HocVien;
import com.datn.entity.KhoaHoc;
import com.datn.entity.NhanVien;
import com.datn.entity.ThanhToan;
import com.datn.repository.NhanVienRepo;
import com.datn.repository.ThanhToanRepo;
import com.datn.utils.TrangThaiThanhToan;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class ThanhToanRepoImpl implements ThanhToanRepo {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private NhanVienRepo nhanVienRepo;

    @Override
    public List<ThanhToan> getAllThanhToans() {
        String jpql = "SELECT t FROM ThanhToan t";
        return entityManager.createQuery(jpql, ThanhToan.class).getResultList();
    }

    @Override
    @Transactional
    public ThanhToan createThanhToan(ThanhToanDTO thanhToanDTO) {
        String generatedId = (String) entityManager.createNativeQuery(
                "SELECT CONCAT('GD', LPAD(IFNULL(MAX(CAST(SUBSTRING(MAGIAODICH, 3, 3) AS UNSIGNED)), 0) + 1, 3, '0')) FROM THANHTOANS"
        ).getSingleResult();

        ThanhToan thanhToan = new ThanhToan();
        thanhToan.setMaGiaoDich(generatedId);
        thanhToan.setLoaiGiaoDich(thanhToanDTO.getLoaiGiaoDich());
        thanhToan.setSoTien(thanhToanDTO.getSoTien());
        thanhToan.setPhuongThucThanhToan(thanhToanDTO.getPhuongThucThanhToan());

        // Validate HocVien existence
        HocVien hocVien = entityManager.find(HocVien.class, thanhToanDTO.getMaHocVien());
        if (hocVien == null) {
            throw new IllegalArgumentException("HocVien with ID " + thanhToanDTO.getMaHocVien() + " does not exist.");
        }
        thanhToan.setHocVien(hocVien);

        // Validate KhoaHoc existence
        KhoaHoc khoaHoc = entityManager.find(KhoaHoc.class, thanhToanDTO.getMaKhoaHoc());
        if (khoaHoc == null) {
            throw new IllegalArgumentException("KhoaHoc with ID " + thanhToanDTO.getMaKhoaHoc() + " does not exist.");
        }
        thanhToan.setKhoaHoc(khoaHoc);

        thanhToan.setMoTa(thanhToanDTO.getMoTa());
        thanhToan.setTrangThai(thanhToanDTO.getTrangThai() == TrangThaiThanhToan.HOAN_THANH
                ? TrangThaiThanhToan.HOAN_THANH
                : (thanhToanDTO.getTrangThai() == TrangThaiThanhToan.THAT_BAI
                ? TrangThaiThanhToan.THAT_BAI
                : TrangThaiThanhToan.CHO_XU_LY));
        thanhToan.setNgayThucHien(thanhToanDTO.getNgayThucHien());

        // Validate NhanVien existence
        NhanVien nhanVien = nhanVienRepo.findById(thanhToanDTO.getMaNhanVien());
        if (nhanVien == null) {
            throw new IllegalArgumentException("NhanVien with ID " + thanhToanDTO.getMaNhanVien() + " does not exist.");
        }
        thanhToan.setNguoiTao(nhanVien);

        entityManager.persist(thanhToan);
        entityManager.flush();

        return thanhToan;
    }

    @Override
    public ThanhToan getThanhToanByMaGiaoDich(String maGiaoDich) {
        return entityManager.find(ThanhToan.class, maGiaoDich);
    }

    @Override
    @Transactional
    public ThanhToan updateTrangThaiThanhToan(String maGiaoDich, TrangThaiThanhToan trangThai) {
        entityManager.createQuery("UPDATE ThanhToan t SET t.trangThai = :trangThai WHERE t.maGiaoDich = :maGiaoDich")
                .setParameter("trangThai", trangThai)
                .setParameter("maGiaoDich", maGiaoDich)
                .executeUpdate();
        return entityManager.find(ThanhToan.class, maGiaoDich);
    }

}
