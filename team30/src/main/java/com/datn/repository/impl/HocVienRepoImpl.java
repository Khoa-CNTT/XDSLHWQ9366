package com.datn.repository.impl;

import com.datn.entity.HocVien;
import com.datn.exception.hocvien.DuplicateHocVienException;
import com.datn.exception.hocvien.HocVienNotFoundException;
import com.datn.repository.HocVienRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class HocVienRepoImpl implements HocVienRepo {

    private final EntityManager entityManager;

    @Autowired
    public HocVienRepoImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<HocVien> findAll() {
        TypedQuery<HocVien> typedQuery = this.entityManager.createQuery
            ("FROM HocVien", HocVien.class);

        return typedQuery.getResultList();
    }

    @Override
    public List<HocVien> pagination(int pageNumber, int pageSize) {
        TypedQuery<HocVien> typedQuery = this.entityManager.createQuery
                ("FROM HocVien", HocVien.class);

        typedQuery.setFirstResult((pageNumber - 1) * pageSize);
        typedQuery.setMaxResults(pageSize);

        return typedQuery.getResultList();
    }

    @Override
    public HocVien findById(String maHocVien) {
        TypedQuery<HocVien> typedQuery = this.entityManager
                .createQuery("FROM HocVien WHERE maHocVien = :maHocVien", HocVien.class);
        typedQuery.setParameter("maHocVien", maHocVien);

        List<HocVien> hocViens = typedQuery.getResultList();

        return hocViens.isEmpty() ? null : hocViens.get(0);
    }

    @Override
    public List<HocVien> findByTenHocVien(String tenHocVien) {
        TypedQuery<HocVien> typedQuery = this.entityManager
                .createQuery("FROM HocVien AS GV WHERE GV.tenHocVien LIKE :tenHocVien",
                        this.getEntityClass());
        typedQuery.setParameter("tenHocVien", "%" + tenHocVien + "%");

        return typedQuery.getResultList();

    }

    @Override
    public HocVien add(HocVien hocVien) {
        String generatedId = (String) entityManager.createNativeQuery(
                "SELECT CONCAT('HV', LPAD(IFNULL(MAX(CAST(SUBSTRING(MAHOCVIEN, 3, 3) AS UNSIGNED)), 0) + 1, 3, '0')) FROM HOCVIENS"
        ).getSingleResult();
        hocVien.setMaHocVien(generatedId);

        this.entityManager.persist(hocVien);
        this.entityManager.flush();

        return hocVien;
    }

    @Override
    public HocVien update(HocVien hocVien) {
        return this.entityManager.merge(hocVien);
    }

    @Override
    public void delete(String maHocVien) {
        HocVien hocVien = this.findById(maHocVien);
        if (hocVien == null) {
            throw new HocVienNotFoundException("Không tìm thấy học viên với mã - " + maHocVien);
        }

        this.entityManager.remove(hocVien);
    }

    @Override
    public void checkSoCMNDExists(String soCMND) {
        Long count = (Long) entityManager.createQuery(
                        "SELECT COUNT(n) FROM HocVien n WHERE n.soCMND = :soCMND"
                )
                .setParameter("soCMND", soCMND)
                .getSingleResult();

        if (count > 0) {
            throw new DuplicateHocVienException("Số CMND đã tồn tại.");
        }
    }

    @Override
    public void checkSoDienThoaiExists(String soDienThoai) {
        Long count = (Long) entityManager.createQuery(
                        "SELECT COUNT(n) FROM HocVien n WHERE n.soDienThoai = :soDienThoai"
                )
                .setParameter("soDienThoai", soDienThoai)
                .getSingleResult();

        if (count > 0) {
            throw new DuplicateHocVienException("Số điện thoại đã tồn tại.");
        }
    }

    @Override
    public void checkEmailExists(String email) {
        Long count = (Long) entityManager.createQuery(
                        "SELECT COUNT(n) FROM HocVien n WHERE n.email = :email"
                )
                .setParameter("email", email)
                .getSingleResult();

        if (count > 0) {
            throw new DuplicateHocVienException("Email đã tồn tại.");
        }
    }

    private Class<HocVien> getEntityClass() {
        return HocVien.class;
    }

}
