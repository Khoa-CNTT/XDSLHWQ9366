package com.datn.repository.impl;

import com.datn.entity.PhongHoc;
import com.datn.exception.phonghoc.DuplicatePhongHocException;
import com.datn.repository.PhongHocRepo;
import jakarta.persistence.EntityManager;
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
        return List.of();
    }

    @Override
    public List<PhongHoc> findAll(int pageNumber, int pageSize) {
        return List.of();
    }

    @Override
    public PhongHoc findById(int id) {
        return null;
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
        return null;
    }

    @Override
    public void delete(PhongHoc phongHoc) {

    }

    public Class<PhongHoc> getEntityClass() {
        return PhongHoc.class;
    };

}
