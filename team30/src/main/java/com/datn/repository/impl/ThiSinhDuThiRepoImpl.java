package com.datn.repository.impl;

import com.datn.entity.ThiSinhDuThi;
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
        return List.of();
    }

    @Override
    public ThiSinhDuThi findById(String maThiSinhDuThi) {
        return null;
    }

    @Override
    public List<ThiSinhDuThi> findByTenThiSinhDuThi(String tenThiSinhDuThi) {
        return List.of();
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
        return null;
    }

    @Override
    public void delete(String maThiSinhDuThi) {

    }

    private Class<ThiSinhDuThi> getEntityClass() {
        return ThiSinhDuThi.class;
    }

}
