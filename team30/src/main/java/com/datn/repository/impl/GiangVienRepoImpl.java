package com.datn.repository.impl;

import com.datn.entity.GiangVien;
import com.datn.exception.giangvien.DuplicateGiangVienException;
import com.datn.exception.giangvien.GiangVienNotFoundException;
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
        TypedQuery<GiangVien> typedQuery = this.entityManager
                .createQuery("FROM GiangVien", this.getEntityClass());

        return typedQuery.getResultList();
    }

    @Override
    public List<GiangVien> pagination(int pageNumber, int pageSize) {
        TypedQuery<GiangVien> typedQuery = this.entityManager
                .createQuery("FROM GiangVien AS GV ORDER BY GV.maGiangVien", this.getEntityClass());
        typedQuery.setFirstResult((pageNumber - 1) * pageSize);
        typedQuery.setMaxResults(pageSize);

        return typedQuery.getResultList();
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
        return this.entityManager.merge(giangVien);
    }

    @Override
    public void delete(String maGiangVien) {
        GiangVien giangVien = this.findById(maGiangVien);
        if(giangVien == null) {
            throw new GiangVienNotFoundException("Không tìm thấy giảng viên với mã - " + maGiangVien);
        }

        this.entityManager.remove(giangVien);
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
