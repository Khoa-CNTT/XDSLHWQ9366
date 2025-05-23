package com.datn.repository.impl;

import com.datn.entity.PhieuChi;
import com.datn.repository.PhieuChiRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public class PhieuChiRepoImpl implements PhieuChiRepo {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<PhieuChi> findAll() {
        return entityManager.createQuery("SELECT pc FROM PhieuChi pc", PhieuChi.class).getResultList();
    }

    @Override
    public PhieuChi findById(String id) {
        return entityManager.find(PhieuChi.class, id);
    }

    @Override
    public PhieuChi save(PhieuChi phieuChi) {
        if (findById(phieuChi.getMaPhieuChi()) == null) {
            entityManager.persist(phieuChi);
            return phieuChi;
        } else {
            return entityManager.merge(phieuChi);
        }
    }

    @Override
    public void deleteById(String id) {
        PhieuChi pc = entityManager.find(PhieuChi.class, id);
        if (pc != null) {
            entityManager.remove(pc);
            entityManager.flush();
        }
    }
}
