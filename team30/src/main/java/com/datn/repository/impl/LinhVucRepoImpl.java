package com.datn.repository.impl;

import com.datn.entity.LinhVuc;
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
        LinhVuc linhVuc = this.entityManager.find(this.getEntityClass(), maLinhVuc);

        return linhVuc;
    }

    private Class<LinhVuc> getEntityClass() {
        return LinhVuc.class;
    }

}
