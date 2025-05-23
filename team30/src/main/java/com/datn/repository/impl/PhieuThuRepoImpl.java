package com.datn.repository.impl;

import com.datn.entity.PhieuThu;
import com.datn.repository.PhieuThuRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PhieuThuRepoImpl implements PhieuThuRepo {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<PhieuThu> findAll() {
        return entityManager.createQuery("SELECT p FROM PhieuThu p", PhieuThu.class).getResultList();
    }

    @Override
    public PhieuThu findById(String id) {
        return entityManager.find(PhieuThu.class, id);
    }

    @Override
    public PhieuThu save(PhieuThu phieuThu) {
        if (entityManager.find(PhieuThu.class, phieuThu.getMaPhieuThu()) == null) {
            entityManager.persist(phieuThu);
        } else {
            phieuThu = entityManager.merge(phieuThu);
        }
        return phieuThu;
    }

    @Override
    public void deleteById(String id) {
        PhieuThu pt = findById(id);
        if (pt != null) {
            entityManager.remove(pt);
        }
    }
}
