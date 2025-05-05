package com.datn.repository.impl;/*
 * @project team30
 * @author Huy
 */

import com.datn.entity.NhanVien;
import com.datn.repository.NhanVienRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class NhanVienRepoImpl implements NhanVienRepo {

    @PersistenceContext
    private EntityManager entityManager;

    public Optional<NhanVien> findById(Long id) {
        NhanVien nhanVien = entityManager.find(NhanVien.class, id);
        return Optional.ofNullable(nhanVien);
    }

}
