package com.datn.repository.impl;

import com.datn.entity.LinhVuc;
import com.datn.exception.linhvuc.DuplicateLinhVucException;
import com.datn.exception.linhvuc.LinhVucNotFoundException;
import com.datn.repository.LinhVucRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LinhVucRepoImpl implements LinhVucRepo {

    private final EntityManager entityManager;

    @Autowired
    public LinhVucRepoImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<LinhVuc> findAll() {
        TypedQuery<LinhVuc> typedQuery =
                this.entityManager.createQuery("FROM LinhVuc", this.getEntityClass());

        return typedQuery.getResultList();
    }

    @Override
    public LinhVuc findById(String maLinhVuc) {
        TypedQuery<LinhVuc> typedQuery = this.entityManager
                .createQuery("FROM LinhVuc WHERE maLinhVuc = :maLinhVuc", this.getEntityClass());
        typedQuery.setParameter("maLinhVuc", maLinhVuc);

        List<LinhVuc> linhVucs = typedQuery.getResultList();

        return linhVucs.isEmpty() ? null : linhVucs.get(0);
    }

    @Override
    public LinhVuc add(LinhVuc linhVuc) {
        String generatedId = (String) entityManager.createNativeQuery(
                "SELECT CONCAT('LV', LPAD(IFNULL(MAX(CAST(SUBSTRING(MALINHVUC, 3, 3) AS UNSIGNED)), 0) + 1, 3, '0')) FROM LINHVUCS"
        ).getSingleResult();
        linhVuc.setMaLinhVuc(generatedId);

        this.entityManager.persist(linhVuc);
        this.entityManager.flush();

        return linhVuc;
    }

    @Override
    public LinhVuc update(LinhVuc linhVuc) {
        return this.entityManager.merge(linhVuc);
    }

    @Override
    public void delete(String maLinhVuc) {
        LinhVuc linhVuc = this.findById(maLinhVuc);
        if (linhVuc == null) {
            throw new LinhVucNotFoundException("Không tìm thấy lĩnh vực với mã - " + maLinhVuc);
        }

        this.entityManager.remove(linhVuc);
    }

    @Override
    public void checkLinhVucExists(String tenLinhVuc) {
        Long count = (Long) entityManager.createQuery(
                        "SELECT COUNT(n) FROM LinhVuc n WHERE n.tenLinhVuc = :tenLinhVuc"
                )
                .setParameter("tenLinhVuc", tenLinhVuc)
                .getSingleResult();

        if (count > 0) {
            throw new DuplicateLinhVucException("Tên lĩnh vực đã tồn tại.");
        }
    }

    @Override
    public List<LinhVuc> pagination(int pageNumber, int pageSize) {
        TypedQuery<LinhVuc> typedQuery = this.entityManager.createQuery
                ("FROM LinhVuc ", this.getEntityClass());

        typedQuery.setFirstResult((pageNumber - 1) * pageSize);
        typedQuery.setMaxResults(pageSize);

        return typedQuery.getResultList();
    }

    private Class<LinhVuc> getEntityClass() {
        return LinhVuc.class;
    }

}
