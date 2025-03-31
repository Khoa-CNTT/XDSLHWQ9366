package com.datn.repository.impl;/*
 * @project team30
 * @author Huy
 */

import com.datn.dto.request.LichThiAddDTO;
import com.datn.entity.LichThi;
import com.datn.entity.LinhVuc;
import com.datn.repository.LichThiRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LichThiRepoImpl implements LichThiRepo {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public LichThi add(LichThiAddDTO lichThiDTO) {
        LichThi lichThi = new LichThi();
        lichThi.setMaLichThi(lichThiDTO.getMaLichThi());
        LinhVuc linhVuc = entityManager.find(LinhVuc.class, lichThiDTO.getMaLinhVuc());
        if (linhVuc == null) {
            throw new IllegalArgumentException("Lĩnh vực không tồn tại: " + lichThiDTO.getMaLinhVuc());
        }
        lichThi.setLinhVuc(linhVuc);
        lichThi.setTenChungChi(lichThiDTO.getTenChungChi());
        lichThi.setNgayThi(lichThiDTO.getNgayThi());
        lichThi.setLePhiThi(lichThiDTO.getLePhiThi());
        lichThi.setThongTinChiTiet(lichThiDTO.getThongTinChiTiet());

        entityManager.persist(lichThi);
        return lichThi;
    }

    @Override
    public LichThi update(String id, LichThiAddDTO lichThi) {
        return null;
    }

    @Override
    public void delete(String id) {

    }

    @Override
    public List<LichThi> search(String maLichThi, String tenChungChi) {
        return null;
    }
}
