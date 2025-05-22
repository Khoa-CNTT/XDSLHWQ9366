package com.datn.repository.impl;

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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Repository
public class ThanhToanRepoImpl implements ThanhToanRepo {
    private static final Logger logger = LoggerFactory.getLogger(ThanhToanRepoImpl.class);

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
        String maGiaoDich = "GD" + UUID.randomUUID().toString().substring(0, 8);

        // Kiểm tra trùng maGiaoDich
        if (findByMaGiaoDich(maGiaoDich) != null) {
            logger.error("Duplicate maGiaoDich: {}", maGiaoDich);
            throw new IllegalArgumentException("Mã giao dịch đã tồn tại");
        }

        // Validate HocVien by MATAIKHOAN
        String jpql = "SELECT h FROM HocVien h WHERE h.maTaiKhoan = :maTaiKhoan";
        List<HocVien> hocVienList = entityManager.createQuery(jpql, HocVien.class)
                .setParameter("maTaiKhoan", thanhToanDTO.getMaHocVien())
                .getResultList();
        if (hocVienList.isEmpty()) {
            logger.error("HocVien not found: maTaiKhoan={}", thanhToanDTO.getMaHocVien());
            throw new IllegalArgumentException("Học viên với MATAIKHOAN " + thanhToanDTO.getMaHocVien() + " không tồn tại.");
        }

        // Validate KhoaHoc
        KhoaHoc khoaHoc = entityManager.find(KhoaHoc.class, thanhToanDTO.getMaKhoaHoc());
        if (khoaHoc == null) {
            logger.error("KhoaHoc not found: {}", thanhToanDTO.getMaKhoaHoc());
            throw new IllegalArgumentException("Khóa học với ID " + thanhToanDTO.getMaKhoaHoc() + " không tồn tại.");
        }

        // Validate NhanVien
        NhanVien nhanVien = nhanVienRepo.findById(thanhToanDTO.getNguoiTao());
        if (nhanVien == null) {
            logger.error("NhanVien not found: {}", thanhToanDTO.getNguoiTao());
            throw new IllegalArgumentException("Nhân viên với ID " + thanhToanDTO.getNguoiTao() + " không tồn tại.");
        }

        // Insert transaction with corrected column names
        String sql = "INSERT INTO THANHTOANS (MAGIAODICH, LOAIGIAODICH, SOTIEN, PHUONGTHUCTHANHTOAN, " +
                "MAHOCVIEN, MAKHOAHOC, MOTA, TRANGTHAI, NGAYTHUCHIEN, NGUOITAO) " +
                "VALUES (:maGiaoDich, :loaiGiaoDich, :soTien, :phuongThucThanhToan, :maHocVien, :maKhoaHoc, " +
                ":moTa, :trangThai, :ngayThucHien, :nguoiTao)";

        entityManager.createNativeQuery(sql)
                .setParameter("maGiaoDich", maGiaoDich)
                .setParameter("loaiGiaoDich", thanhToanDTO.getLoaiGiaoDich())
                .setParameter("soTien", thanhToanDTO.getSoTien())
                .setParameter("phuongThucThanhToan", thanhToanDTO.getPhuongThucThanhToan().toString())
                .setParameter("maHocVien", thanhToanDTO.getMaHocVien())
                .setParameter("maKhoaHoc", thanhToanDTO.getMaKhoaHoc())
                .setParameter("moTa", thanhToanDTO.getMoTa())
                .setParameter("trangThai", thanhToanDTO.getTrangThai().toString())
                .setParameter("ngayThucHien", thanhToanDTO.getNgayThucHien())
                .setParameter("nguoiTao", thanhToanDTO.getNguoiTao())
                .executeUpdate();

        logger.info("Inserted transaction: maGiaoDich={}", maGiaoDich);

        return entityManager.createQuery("SELECT t FROM ThanhToan t WHERE t.maGiaoDich = :maGiaoDich", ThanhToan.class)
                .setParameter("maGiaoDich", maGiaoDich)
                .getSingleResult();
    }

    @Override
    public ThanhToan findByMaGiaoDich(String maGiaoDich) {
        List<ThanhToan> result = entityManager.createQuery(
                        "SELECT t FROM ThanhToan t WHERE t.maGiaoDich = :maGiaoDich", ThanhToan.class)
                .setParameter("maGiaoDich", maGiaoDich)
                .getResultList();
        return result.isEmpty() ? null : result.get(0);
    }

    @Override
    @Transactional
    public ThanhToan save(ThanhToan thanhToan) {
        logger.info("Updating transaction: maGiaoDich={}", thanhToan.getMaGiaoDich());
        return entityManager.merge(thanhToan);
    }
}