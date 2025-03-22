package com.datn.repository.impl;

import com.datn.entity.LopHoc;
import com.datn.exception.lophoc.DuplicateLopHocException;
import com.datn.exception.lophoc.LopHocNotFoundException;
import com.datn.repository.LopHocRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LopHocRepoImpl implements LopHocRepo {

    private final EntityManager entityManager;

    @Autowired
    public LopHocRepoImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<LopHoc> findAll() {
        return List.of();
    }

    @Override
    public List<LopHoc> pagination(int pageNumber, int pageSize) {
        TypedQuery<LopHoc> typedQuery = this.entityManager.createQuery
                ("FROM LopHoc AS LH ORDER BY LH.maLopHoc", this.getEntityClass());

        typedQuery.setFirstResult((pageNumber - 1) * pageSize);
        typedQuery.setMaxResults(pageSize);

        return typedQuery.getResultList();
    }

    @Override
    public LopHoc findById(String maLopHoc) {
        TypedQuery<LopHoc> typedQuery = this.entityManager.createQuery
                ("FROM LopHoc AS LH WHERE LH.maLopHoc = :maLopHoc", this.getEntityClass());
        typedQuery.setParameter("maLopHoc", maLopHoc);

        List<LopHoc> lopHocs = typedQuery.getResultList();

        return lopHocs.isEmpty() ? null : lopHocs.get(0);
    }

    @Override
    public List<LopHoc> findByTenLopHoc(String tenLopHoc) {
        return List.of();
    }

    @Override
    public void checkLopHocExists(String tenLopHoc) {
        Long count = (Long) entityManager.createQuery(
                        "SELECT COUNT(*) FROM LopHoc AS LH WHERE LH.tenLopHoc = :tenLopHoc"
                )
                .setParameter("tenLopHoc", tenLopHoc)
                .getSingleResult();
        if(count > 0) {
            throw new DuplicateLopHocException("Tên lớp học đã tồn tại");
        }
    }

    @Override
    public LopHoc add(LopHoc lopHoc) {
        String generatedId = (String) entityManager.createNativeQuery(
                "SELECT CONCAT('LH', LPAD(IFNULL(MAX(CAST(SUBSTRING(MALOPHOC, 3, 3) AS UNSIGNED)), 0) + 1, 3, '0')) FROM LOPHOCS"
        ).getSingleResult();

        lopHoc.setMaLopHoc(generatedId);

        this.entityManager.persist(lopHoc);
        this.entityManager.flush();

        return lopHoc;
    }

    @Override
    public LopHoc update(LopHoc lopHoc) {
        return this.entityManager.merge(lopHoc);
    }

    @Override
    public void delete(String maLopHoc) {
        LopHoc lopHoc = this.findById(maLopHoc);
        if(lopHoc == null) {
            throw new LopHocNotFoundException("Không tìm thấy lớp học với mã - " + maLopHoc);
        } else {
            this.entityManager.remove(lopHoc);
        }
    }

    @Override
    public Long countTotalLopHocs() {
        TypedQuery<Long> typedQuery = this.entityManager.createQuery
                ("SELECT COUNT(LH) FROM LopHoc AS LH", Long.class);

        return typedQuery.getSingleResult();
    }

    private Class<LopHoc> getEntityClass() {
        return LopHoc.class;
    }

}
