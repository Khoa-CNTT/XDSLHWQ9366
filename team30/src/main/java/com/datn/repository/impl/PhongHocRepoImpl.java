package com.datn.repository.impl;

import com.datn.entity.PhongHoc;
import com.datn.exception.phonghoc.DuplicatePhongHocException;
import com.datn.exception.phonghoc.PhongHocNotFoundException;
import com.datn.repository.PhongHocRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PhongHocRepoImpl implements PhongHocRepo {

    private final EntityManager entityManager;

    @Autowired
    public PhongHocRepoImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<PhongHoc> findAll() {
        TypedQuery<PhongHoc> typedQuery =
                this.entityManager.createQuery("FROM PhongHoc", this.getEntityClass());

        return typedQuery.getResultList();
    }

    @Override
    public List<PhongHoc> pagination(int pageNumber, int pageSize) {
        TypedQuery<PhongHoc> typedQuery = this.entityManager.createQuery
                ("FROM PhongHoc AS PH ORDER BY PH.maPhongHoc", this.getEntityClass());

        typedQuery.setFirstResult((pageNumber - 1) * pageSize);
        typedQuery.setMaxResults(pageSize);

        return typedQuery.getResultList();
    }

    @Override
    public Long countTotalPhongHocs() {
        TypedQuery<Long> typedQuery = this.entityManager.createQuery
                ("SELECT COUNT(PH) FROM PhongHoc AS PH", Long.class);

        return typedQuery.getSingleResult();
    }

    @Override
    public PhongHoc findById(String maPhongHoc) {
        TypedQuery<PhongHoc> typedQuery = this.entityManager.createQuery
                ("FROM PhongHoc AS PH WHERE PH.maPhongHoc = :maPhongHoc", this.getEntityClass());
        typedQuery.setParameter("maPhongHoc", maPhongHoc);

        List<PhongHoc> phongHocs = typedQuery.getResultList();

        return phongHocs.isEmpty() ? null : phongHocs.get(0);
    }

    @Override
    public void checkPhongHocExists(String tenPhongHoc) {
        Long count = (Long) entityManager.createQuery(
                        "SELECT COUNT(*) FROM PhongHoc AS PH WHERE PH.tenPhongHoc = :tenPhongHoc"
                )
                .setParameter("tenPhongHoc", tenPhongHoc)
                .getSingleResult();
        if(count > 0) {
            throw new DuplicatePhongHocException("Tên phòng học đã tồn tại");
        }
    }

    @Override
    public PhongHoc add(PhongHoc phongHoc) {
        String generatedId = (String) entityManager.createNativeQuery(
                "SELECT CONCAT('PH', LPAD(IFNULL(MAX(CAST(SUBSTRING(MAPHONGHOC, 3, 3) AS UNSIGNED)), 0) + 1, 3, '0')) FROM PHONGHOCS"
        ).getSingleResult();

        phongHoc.setMaPhongHoc(generatedId);

        this.entityManager.persist(phongHoc);
        this.entityManager.flush(); // commit vào db
        this.entityManager.refresh(phongHoc);  // Cập nhật lại từ DB

        return phongHoc;
    }

    @Override
    public PhongHoc update(PhongHoc phongHoc) {
        return this.entityManager.merge(phongHoc);
    }

    @Override
    public void delete(String maPhongHoc) {
        PhongHoc phongHoc = this.findById(maPhongHoc);

        if(phongHoc == null) {
            throw new PhongHocNotFoundException("Không tìm thấy phòng học với mã - " + maPhongHoc);
        } else {
            this.entityManager.remove(phongHoc);
        }
    }

    public Class<PhongHoc> getEntityClass() {
        return PhongHoc.class;
    };

}
