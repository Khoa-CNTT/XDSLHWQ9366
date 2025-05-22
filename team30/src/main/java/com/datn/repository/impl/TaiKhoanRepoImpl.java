package com.datn.repository.impl;/*
 * @project team30
 * @author Huy
 */

import com.datn.entity.TaiKhoan;
import com.datn.repository.TaiKhoanRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class TaiKhoanRepoImpl implements TaiKhoanRepo {
    @PersistenceContext
    private EntityManager entityManager;

    public Optional<TaiKhoan> findByTenTaiKhoan(String tenTaiKhoan) {
        String query = "SELECT t FROM TaiKhoan t WHERE t.tenTaiKhoan = :tenTaiKhoan";
        TypedQuery<TaiKhoan> typedQuery = entityManager.createQuery(query, TaiKhoan.class);
        typedQuery.setParameter("tenTaiKhoan", tenTaiKhoan);
        List<TaiKhoan> result = typedQuery.getResultList();
        return result.isEmpty() ? Optional.empty() : Optional.of(result.get(0));
    }

    public TaiKhoan save(TaiKhoan taiKhoan) {
        entityManager.persist(taiKhoan);
        return taiKhoan;
    }

    public List<TaiKhoan> findAll() {
        String query = "SELECT t FROM TaiKhoan t";
        return entityManager.createQuery(query, TaiKhoan.class).getResultList();
    }

    @Override
    public TaiKhoan findById(String maTaiKhoan) {
        TypedQuery<TaiKhoan> typedQuery = this.entityManager
                .createQuery("FROM TaiKhoan AS TK WHERE TK.maTaiKhoan = :maTaiKhoan", TaiKhoan.class);
        typedQuery.setParameter("maTaiKhoan", maTaiKhoan);

        List<TaiKhoan> taiKhoans = typedQuery.getResultList();

        return taiKhoans.isEmpty() ? null : taiKhoans.get(0);
    }

    public void deleteById(String id) {
        TaiKhoan taiKhoan = entityManager.find(TaiKhoan.class, id);
        if (taiKhoan != null) {
            entityManager.remove(taiKhoan);
        }
    }

    @Override
    public Optional<TaiKhoan> findByIdTaiKhoan(String id) {
        TaiKhoan taiKhoan = entityManager.find(TaiKhoan.class, id);
        return Optional.ofNullable(taiKhoan);
    }
}