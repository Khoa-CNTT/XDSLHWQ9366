package com.datn.service.impl;/*
 * @project team30
 * @author Huy
 */

import com.datn.dto.request.TaiKhoanDTO;
import com.datn.entity.HocVien;
import com.datn.entity.LopHoc;
import com.datn.entity.NhanVien;
import com.datn.entity.TaiKhoan;
import com.datn.repository.NhanVienRepo;
import com.datn.repository.TaiKhoanRepo;
import com.datn.service.TaiKhoanService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class TaiKhoanServiceImpl implements TaiKhoanService {

    @Autowired
    private TaiKhoanRepo taiKhoanRepository;

    @Autowired
    private NhanVienRepo nhanVienRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public TaiKhoan register(TaiKhoanDTO dto) {
        String generatedId = (String) entityManager.createNativeQuery(
                "SELECT CONCAT('TK', LPAD(IFNULL(MAX(CAST(SUBSTRING(MATAIKHOAN, 3, 3) AS UNSIGNED)), 0) + 1, 3, '0')) FROM TAIKHOANS"
        ).getSingleResult();

        TaiKhoan taiKhoan = new TaiKhoan();
        taiKhoan.setMaTaiKhoan(generatedId);
        taiKhoan.setTenTaiKhoan(dto.getTenTaiKhoan());
        taiKhoan.setMatKhau(passwordEncoder.encode(dto.getMatKhau()));

        if (dto.getMaNhanVien() != null) {
            NhanVien nhanVien = entityManager.createQuery(
                            "SELECT nv FROM NhanVien nv WHERE nv.id = :id", NhanVien.class)
                    .setParameter("id", dto.getMaNhanVien())
                    .getResultStream()
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Nhân viên không tồn tại với ID: " + dto.getMaNhanVien()));

            taiKhoan.setNhanVien(nhanVien);
        }

        entityManager.persist(taiKhoan);

        HocVien hocVien = new HocVien();
        hocVien.setMaHocVien(generatedId);
        hocVien.setMaTaiKhoan(taiKhoan.getMaTaiKhoan());

        entityManager.persist(hocVien);
        entityManager.flush();

        return taiKhoan;
    }

    @Override
    @Transactional
    public Optional<TaiKhoan> update(String id, TaiKhoanDTO dto) {
        Optional<TaiKhoan> existingTaiKhoan = taiKhoanRepository.findByIdTaiKhoan(id);

        if (existingTaiKhoan.isEmpty()) {
            return Optional.empty();
        }

        TaiKhoan taiKhoan = existingTaiKhoan.get();
        if (dto.getTenTaiKhoan() != null) {
            taiKhoan.setTenTaiKhoan(dto.getTenTaiKhoan());
        }
        if (dto.getMatKhau() != null) {
            taiKhoan.setMatKhau(passwordEncoder.encode(dto.getMatKhau()));
        }
        if (dto.getMaNhanVien() != null) {
            NhanVien nhanVien = entityManager.createQuery(
                            "SELECT nv FROM NhanVien nv WHERE nv.id = :id", NhanVien.class)
                    .setParameter("id", dto.getMaNhanVien())
                    .getResultStream()
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Nhân viên không tồn tại với ID: " + dto.getMaNhanVien()));
            taiKhoan.setNhanVien(nhanVien);
        }
        if (dto.getQuyenTruyCap() != null) {
            taiKhoan.setQuyenTruyCap(dto.getQuyenTruyCap());
        }

        entityManager.merge(taiKhoan);
        return Optional.of(taiKhoan);
    }

    @Override
    public Optional<TaiKhoan> findByUsername(String username) {
        return taiKhoanRepository.findByTenTaiKhoan(username);
    }

    @Override
    public List<TaiKhoan> findAll() {
        return taiKhoanRepository.findAll();
    }

    @Override
    public void deleteById(String maTaiKhoan) {
        taiKhoanRepository.deleteById(maTaiKhoan);
    }

    @Override
    public Optional<TaiKhoan> findById(String id) {
        return taiKhoanRepository.findByIdTaiKhoan(id);
    }

    @Override
    public List<TaiKhoan> getAllTaiKhoan() {
        return taiKhoanRepository.getAllTaiKhoan();
    }
}
