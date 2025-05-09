package com.datn.repository.impl;

import com.datn.entity.ChucVu;
import com.datn.exception.chucvu.ChucVuNotFoundException;
import com.datn.exception.chucvu.DuplicateChucVuException;
import com.datn.repository.ChucVuRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ChucVuRepoImpl implements ChucVuRepo {

    private final EntityManager entityManager;

    @Autowired
    public ChucVuRepoImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<ChucVu> findAll() {
        TypedQuery<ChucVu> typedQuery =
                this.entityManager.createQuery("FROM ChucVu", this.getEntityClass());

        return typedQuery.getResultList();
    }

    @Override
    public ChucVu findById(String maChucVu) {
        return this.entityManager.find(this.getEntityClass(), maChucVu);
    }

    @Override
    public ChucVu add(ChucVu chucVu) {
        String generatedId = (String) entityManager.createNativeQuery(
                "SELECT CONCAT('CV', LPAD(IFNULL(MAX(CAST(SUBSTRING(MACHUCVU, 3, 3) AS UNSIGNED)), 0) + 1, 3, '0')) FROM CHUCVUS"
        ).getSingleResult();
        chucVu.setMaChucVu(generatedId);

        this.entityManager.persist(chucVu);
        this.entityManager.flush();

        return chucVu;
    }

    @Override
    public ChucVu update(ChucVu chucVu) {
        return this.entityManager.merge(chucVu);
    }

    @Override
    public void delete(String maChucVu) {
        ChucVu chucVu = this.findById(maChucVu);
        if (chucVu == null) {
            throw new ChucVuNotFoundException("Không tìm thấy chức vụ với mã - " + maChucVu);
        }

        this.entityManager.remove(chucVu);
    }

    @Override
    public void checkChucVuExists(String tenChucVu) {
        Long count = (Long) entityManager.createQuery(
                        "SELECT COUNT(n) FROM ChucVu n WHERE n.tenChucVu = :tenChucVu"
                )
                .setParameter("tenChucVu", tenChucVu)
                .getSingleResult();

        if (count > 0) {
            throw new DuplicateChucVuException("Tên chức vụ đã tồn tại.");
        }
    }

    @Override
    public List<ChucVu> pagination(int pageNumber, int pageSize) {
        TypedQuery<ChucVu> typedQuery = this.entityManager.createQuery
                ("FROM ChucVu ", this.getEntityClass());

        typedQuery.setFirstResult((pageNumber - 1) * pageSize);
        typedQuery.setMaxResults(pageSize);

        return typedQuery.getResultList();
    }

    private Class<ChucVu> getEntityClass() {
        return ChucVu.class;
    }

}
