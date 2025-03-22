package com.datn.repository.impl;

import com.datn.entity.KhoaHoc;
import com.datn.exception.khoahoc.KhoaHocNotFoundException;
import com.datn.exception.phonghoc.DuplicatePhongHocException;
import com.datn.repository.KhoaHocRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class KhoaHocRepoImpl implements KhoaHocRepo {

    private EntityManager entityManager;

    @Autowired
    public KhoaHocRepoImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<KhoaHoc> findAll() {
        return List.of();
    }

    @Override
    public List<KhoaHoc> pagination(int pageNumber, int pageSize) {
        return List.of();
    }

    @Override
    public KhoaHoc findById(String maKhoaHoc) {
        TypedQuery<KhoaHoc> typedQuery = this.entityManager
                .createQuery("FROM KhoaHoc AS KH WHERE KH.maKhoaHoc = :maKhoaHoc", this.getEntityClass());
        typedQuery.setParameter("maKhoaHoc", maKhoaHoc);

        List<KhoaHoc> khoaHocs = typedQuery.getResultList();

        return khoaHocs.isEmpty() ? null : khoaHocs.get(0);
    }

    @Override
    public List<KhoaHoc> findByTenKhoaHoc(String tenKhoaHoc) {
        return List.of();
    }

    @Override
    public void checkKhoaHocExists(String tenKhoaHoc) {
        Long count = (Long) entityManager.createQuery(
                        "SELECT COUNT(*) FROM KhoaHoc AS KH WHERE KH.tenKhoaHoc = :tenKhoaHoc"
                )
                .setParameter("tenKhoaHoc", tenKhoaHoc)
                .getSingleResult();
        if(count > 0) {
            throw new DuplicatePhongHocException("Tên khóa học đã tồn tại");
        }
    }

    @Override
    public KhoaHoc add(KhoaHoc khoaHoc) {
        String generatedId = (String) entityManager.createNativeQuery(
                "SELECT CONCAT('KH', LPAD(IFNULL(MAX(CAST(SUBSTRING(MAKHOAHOC, 3, 3) AS UNSIGNED)), 0) + 1, 3, '0')) FROM KHOAHOCS"
        ).getSingleResult();

        khoaHoc.setMaKhoaHoc(generatedId);

        this.entityManager.persist(khoaHoc);
        this.entityManager.flush(); // commit vào db
        this.entityManager.refresh(khoaHoc);  // Cập nhật lại từ DB

        return khoaHoc;
    }

    @Override
    public KhoaHoc update(KhoaHoc khoaHoc) {
        return this.entityManager.merge(khoaHoc);
    }

    @Override
    public void delete(String maKhoaHoc) {
        KhoaHoc khoaHoc = this.findById(maKhoaHoc);
        if(khoaHoc == null) {
            throw  new KhoaHocNotFoundException("Không tìm thấy khóa học với mã - " + maKhoaHoc);
        } else {
            this.entityManager.remove(khoaHoc);
        }
    }

    @Override
    public Long countTotalKhoaHocs() {
        return null;
    }

    private Class<KhoaHoc> getEntityClass() {
        return KhoaHoc.class;
    }

}
