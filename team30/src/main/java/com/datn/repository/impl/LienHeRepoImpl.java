package com.datn.repository.impl;/*
 * @project team30
 * @author Huy
 */

import com.datn.entity.LienHe;
import com.datn.repository.LienHeRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LienHeRepoImpl implements LienHeRepo {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public LienHe save(LienHe lienHe) {
        return entityManager.merge(lienHe);
    }

    @Override
    public LienHe findById(String id) {
        return entityManager.find(LienHe.class, id);
    }

    @Override
    public List<LienHe> findAll() {
        return entityManager.createQuery("SELECT l FROM LienHe l", LienHe.class).getResultList();
    }

    @Override
    public void deleteById(String id) {
        LienHe lienHe = findById(id);
        if (lienHe != null) {
            entityManager.remove(lienHe);
        }
    }
}
