package com.datn.service.impl;/*
 * @project team30
 * @author Huy
 */

import com.datn.dto.request.TaiKhoanDTO;
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
        TaiKhoan taiKhoan = new TaiKhoan();
        taiKhoan.setMaTaiKhoan(dto.getMaTaiKhoan());
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
        return taiKhoan;
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
}
