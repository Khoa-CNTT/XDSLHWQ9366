package com.datn.repository.impl;

import com.datn.entity.GiangVien;
import com.datn.exception.giangvien.DuplicateGiangVienException;
import com.datn.repository.GiangVienRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class GiangVienRepoImpl implements GiangVienRepo {

    private EntityManager entityManager;

    @Autowired
    public GiangVienRepoImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<GiangVien> findAll() {
        return List.of();
    }

    @Override
    public GiangVien findById(String maGiangVien) {
        TypedQuery<GiangVien> typedQuery = this.entityManager
                .createQuery("FROM GiangVien AS GV WHERE GV.maGiangVien = :maGiangVien", this.getEntityClass());
        typedQuery.setParameter("maGiangVien", maGiangVien);

        List<GiangVien> giangViens = typedQuery.getResultList();

        return giangViens.isEmpty() ? null : giangViens.get(0);
    }

    @Override
    public GiangVien add(GiangVien giangVien) {
        String generatedId = (String) entityManager.createNativeQuery(
                "SELECT CONCAT('GV', LPAD(IFNULL(MAX(CAST(SUBSTRING(MAGIANGVIEN, 3, 3) AS UNSIGNED)), 0) + 1, 3, '0')) FROM GIANGVIENS"
        ).getSingleResult();

        giangVien.setMaGiangVien(generatedId);
        entityManager.persist(giangVien);
        entityManager.flush();

        return giangVien;
    }

    @Override
    public GiangVien update(GiangVien giangVien) {
        return null;
    }

    @Override
    public void delete(String maGiangVien) {

    }

    @Override
    public void checkSoCMNDExists(String soCMND) {
        Long count = (Long) entityManager.createQuery(
                        "SELECT COUNT(n) FROM GiangVien n WHERE n.soCMND = :soCMND"
                )
                .setParameter("soCMND", soCMND)
                .getSingleResult();

        if (count > 0) {
            throw new DuplicateGiangVienException("Số CMND đã tồn tại.");
        }
    }

    @Override
    public void checkSoDienThoaiExists(String soDienThoai) {
        Long count = (Long) entityManager.createQuery(
                        "SELECT COUNT(n) FROM GiangVien n WHERE n.soDienThoai = :soDienThoai"
                )
                .setParameter("soDienThoai", soDienThoai)
                .getSingleResult();

        if (count > 0) {
            throw new DuplicateGiangVienException("Số điện thoại đã tồn tại.");
        }
    }

    @Override
    public void checkEmailExists(String email) {
        Long count = (Long) entityManager.createQuery(
                        "SELECT COUNT(n) FROM GiangVien n WHERE n.email = :email"
                )
                .setParameter("email", email)
                .getSingleResult();

        if (count > 0) {
            throw new DuplicateGiangVienException("Email đã tồn tại.");
        }
    }

    private Class<GiangVien> getEntityClass() {
        return GiangVien.class;
    }

}
