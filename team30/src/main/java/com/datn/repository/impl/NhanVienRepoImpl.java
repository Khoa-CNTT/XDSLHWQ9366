package com.datn.repository.impl;/*
 * @project team30
 * @author Huy
 */

import com.datn.entity.NhanVien;
import com.datn.exception.nhanvien.DuplicateNhanVienException;
import com.datn.exception.nhanvien.NhanVienNotFoundException;
import com.datn.repository.NhanVienRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class NhanVienRepoImpl implements NhanVienRepo {

    private EntityManager entityManager;

    public NhanVienRepoImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public boolean add(NhanVien nhanVien) {
        try {
            String generatedId = (String) entityManager.createNativeQuery(
                    "SELECT CONCAT('NV', LPAD(IFNULL(MAX(CAST(SUBSTRING(MANHANVIEN, 3, 3) AS UNSIGNED)), 0) + 1, 3, '0')) FROM NHANVIENS"
            ).getSingleResult();

            nhanVien.setMaNhanVien(generatedId);

            this.entityManager.persist(nhanVien);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<NhanVien> findAll() {
        Query query = this.entityManager.createQuery("FROM NhanVien ");

        return query.getResultList();
    }

    @Override
    public List<NhanVien> findAll(int pageNumber, int pageSize) {
        Query query = this.entityManager.createQuery("FROM NhanVien");

        query.setFirstResult((pageNumber - 1) * pageSize);
        query.setMaxResults(pageSize);

        return query.getResultList();
    }

    @Override
    public List<NhanVien> findByTenNhanVien(String tenNhanVien) {
        TypedQuery<NhanVien> typedQuery = this.entityManager
                .createQuery("FROM NhanVien AS NV WHERE NV.tenNhanVien LIKE :tenNhanVien", this.getEntityClass());

        return typedQuery.setParameter("tenNhanVien", "%" + tenNhanVien + "%").getResultList();
    }

    @Override
    public NhanVien findById(String maNhanVien) {
        TypedQuery<NhanVien> query = this.entityManager
                .createQuery("FROM NhanVien AS NV WHERE NV.maNhanVien = :maNhanVien", this.getEntityClass());

        query.setParameter("maNhanVien", maNhanVien);
        List<NhanVien> results = query.getResultList();

        return results.isEmpty() ? null : results.get(0);
    }

    @Override
    public NhanVien update(NhanVien nhanVien) {
        return this.entityManager.merge(nhanVien);
    }

    @Override
    public void delete(String maNhanVien) {
        NhanVien nhanVien = this.entityManager.find(this.getEntityClass(), maNhanVien);
        if (nhanVien == null) {
            throw new NhanVienNotFoundException("Không tìm thấy nhân viên với mã: " + maNhanVien);
        }

        // xóa liên kết - do CasadeType.All
        nhanVien.setChucVu(null);
        this.entityManager.merge(nhanVien);

        this.entityManager.remove(nhanVien);
    }

    public void checkSoCMNDExists(String soCMND) {
        Long count = (Long) entityManager.createQuery(
                        "SELECT COUNT(n) FROM NhanVien n WHERE n.soCMND = :soCMND"
                )
                .setParameter("soCMND", soCMND)
                .getSingleResult();

        if (count > 0) {
            throw new DuplicateNhanVienException("Số CMND đã tồn tại.");
        }
    }

    public void checkSoDienThoaiExists(String soDienThoai) {
        Long count = (Long) entityManager.createQuery(
                        "SELECT COUNT(n) FROM NhanVien n WHERE n.soDienThoai = :soDienThoai"
                )
                .setParameter("soDienThoai", soDienThoai)
                .getSingleResult();

        if (count > 0) {
            throw new DuplicateNhanVienException("Số điện thoại đã tồn tại.");
        }
    }

    public void checkEmailExists(String email) {
        Long count = (Long) entityManager.createQuery(
                        "SELECT COUNT(n) FROM NhanVien n WHERE n.email = :email"
                )
                .setParameter("email", email)
                .getSingleResult();

        if (count > 0) {
            throw new DuplicateNhanVienException("Email đã tồn tại.");
        }
    }

    private Class<NhanVien> getEntityClass() {
        return NhanVien.class;
    }

}
