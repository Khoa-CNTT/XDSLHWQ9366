package com.datn.repository.impl;

import com.datn.entity.ThiSinhDuThi;
import com.datn.exception.thisinh.ThiSinhNotFoundException;
import com.datn.repository.ThiSinhDuThiRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ThiSinhDuThiRepoImpl implements ThiSinhDuThiRepo {

    private final EntityManager entityManager;

    @Autowired
    public ThiSinhDuThiRepoImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<ThiSinhDuThi> findAll() {
        TypedQuery<ThiSinhDuThi> typedQuery = this.entityManager
                .createQuery("FROM ThiSinhDuThi AS TS ORDER BY TS.maThiSinhDuThi", this.getEntityClass());

        return typedQuery.getResultList();
    }

    @Override
    public List<ThiSinhDuThi> pagination(int pageNumber, int pageSize) {
        TypedQuery<ThiSinhDuThi> typedQuery = this.entityManager.createQuery
                ("FROM ThiSinhDuThi AS TS ORDER BY TS.maThiSinhDuThi", this.getEntityClass());

        typedQuery.setFirstResult((pageNumber - 1) * pageSize);
        typedQuery.setMaxResults(pageSize);

        return typedQuery.getResultList();
    }

    @Override
    public ThiSinhDuThi findById(String maThiSinhDuThi) {
        TypedQuery<ThiSinhDuThi> typedQuery = this.entityManager.createQuery
                ("FROM ThiSinhDuThi AS TS WHERE TS.maThiSinhDuThi = :maThiSinhDuThi", this.getEntityClass());
        typedQuery.setParameter("maThiSinhDuThi", maThiSinhDuThi);

        List<ThiSinhDuThi> thiSinhDuThis = typedQuery.getResultList();

        return thiSinhDuThis.isEmpty() ? null : thiSinhDuThis.get(0);
    }

    @Override
    public List<ThiSinhDuThi> findByTenThiSinhDuThi(String tenThiSinhDuThi) {
        TypedQuery<ThiSinhDuThi> typedQuery = this.entityManager
                .createQuery("FROM ThiSinhDuThi AS TS WHERE TS.tenThiSinhDuThi LIKE :tenThiSinhDuThi", this.getEntityClass());
        typedQuery.setParameter("tenThiSinhDuThi", "%" + tenThiSinhDuThi + "%");

        List<ThiSinhDuThi> thiSinhDuThis = typedQuery.getResultList();

        return thiSinhDuThis;
    }

    @Override
    public ThiSinhDuThi add(ThiSinhDuThi thiSinhDuThi) {
        String generatedId = (String) entityManager.createNativeQuery(
                "SELECT CONCAT('TS', LPAD(IFNULL(MAX(CAST(SUBSTRING(MATHISINHDUTHI, 3, 3) AS UNSIGNED)), 0) + 1, 3, '0')) FROM THISINHDUTHIS"
        ).getSingleResult();

        thiSinhDuThi.setMaThiSinhDuThi(generatedId);

        this.entityManager.persist(thiSinhDuThi);
        this.entityManager.flush();

        return thiSinhDuThi;
    }

    @Override
    public ThiSinhDuThi update(ThiSinhDuThi thiSinhDuThi) {
        return this.entityManager.merge(thiSinhDuThi);
    }

    @Override
    public void delete(String maThiSinhDuThi) {
        ThiSinhDuThi thiSinhDuThi = this.findById(maThiSinhDuThi);

        if(thiSinhDuThi == null) {
            throw new ThiSinhNotFoundException("Không tìm thấy thí sinh với mã - " + maThiSinhDuThi);
        } else {
            this.entityManager.remove(thiSinhDuThi);
        }
    }

    private Class<ThiSinhDuThi> getEntityClass() {
        return ThiSinhDuThi.class;
    }

}
