package com.datn.repository.impl;

import com.datn.entity.ChiTietLopHoc;
import com.datn.repository.ChiTietLopHocRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ChiTietLopHocRepoImpl implements ChiTietLopHocRepo {

    private EntityManager entityManager;

    @Autowired
    public ChiTietLopHocRepoImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<ChiTietLopHoc> findAll() {
        TypedQuery<ChiTietLopHoc> typedQuery = this.entityManager
                .createQuery("FROM ChiTietLopHoc", this.getEntityClass());

        return typedQuery.getResultList();
    }

    @Override
    public ChiTietLopHoc findById(String maCTLH) {
        TypedQuery<ChiTietLopHoc> typedQuery = this.entityManager
                .createQuery("FROM ChiTietLopHoc AS CTLH WHERE CTLH.maCtlh = :maCTLH", this.getEntityClass());
        typedQuery.setParameter("maCTLH", maCTLH);

        List<ChiTietLopHoc> chiTietLopHocs = typedQuery.getResultList();

        return chiTietLopHocs.isEmpty() ? null : chiTietLopHocs.get(0);
    }

    @Override
    public ChiTietLopHoc add(ChiTietLopHoc chiTietLopHoc) {
        String generatedId = (String) entityManager.createNativeQuery(
                "SELECT \n" +
                        "  CONCAT('CTLH', LPAD(COALESCE(MAX(CAST(SUBSTRING(MACTLH, 5) AS UNSIGNED)) + 1, 1), 4, '0')) \n" +
                        "FROM CHITIETLOPHOCS;"
        ).getSingleResult();

        chiTietLopHoc.setMaCtlh(generatedId);
        entityManager.persist(chiTietLopHoc);
        entityManager.flush();

        return chiTietLopHoc;
    }

    @Override
    public List<ChiTietLopHoc> pagination(int pageNumber, int pageSize) {
        TypedQuery<ChiTietLopHoc> typedQuery = this.entityManager
                .createQuery("FROM ChiTietLopHoc AS CTTH ORDER BY CTTH.maCtlh", this.getEntityClass());
        typedQuery.setFirstResult((pageNumber - 1) * pageSize);
        typedQuery.setMaxResults(pageSize);

        return typedQuery.getResultList();
    }

    private Class<ChiTietLopHoc> getEntityClass() {
        return ChiTietLopHoc.class;
    }
}
