package com.datn.repository.impl;/*
 * @project team30
 * @author Huy
 */

import com.datn.dto.request.BaiVietAddDTO;
import com.datn.dto.request.BaiVietUpdateDTO;
import com.datn.entity.BaiViet;
import com.datn.entity.NhanVien;
import com.datn.repository.BaiVietRepo;
import org.springframework.stereotype.Repository;

import java.util.List;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class BaiVietRepoImpl implements BaiVietRepo {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<BaiViet> getAllBaiViet() {
        String query = "SELECT b FROM BaiViet b";
        TypedQuery<BaiViet> typedQuery = entityManager.createQuery(query, BaiViet.class);
        return typedQuery.getResultList();
    }

    @Override
    public BaiViet getBaiVietById(String id) {
        return entityManager.find(BaiViet.class, id);
    }

    @Override
    @Transactional
    public BaiViet createBaiViet(BaiVietAddDTO baiVietDTO) {
        BaiViet baiViet = new BaiViet();
        baiViet.setMaBaiViet(baiVietDTO.getMaBaiViet());
        baiViet.setTieuDe(baiVietDTO.getTieuDe());
        baiViet.setUriHinhAnhMinhHoa(baiVietDTO.getUriHinhAnhMinhHoa());
        baiViet.setNoiDungTomTat(baiVietDTO.getNoiDungTomTat());
        baiViet.setNoiDung(baiVietDTO.getNoiDung());
        baiViet.setNgayDang(baiVietDTO.getNgayDang());
        baiViet.setNhanVien(entityManager.find(NhanVien.class, baiVietDTO.getNhanVienId()));
        baiViet.setMenu(baiVietDTO.getMenu());
        baiViet.setTrangThai(baiVietDTO.isTrangThai());
        entityManager.persist(baiViet);
        return baiViet;
    }

    @Override
    @Transactional
    public BaiViet updateBaiViet(String id, BaiVietUpdateDTO baiVietDTO) {
        BaiViet baiViet = entityManager.find(BaiViet.class, id);
        if (baiViet != null) {
            baiViet.setTieuDe(baiVietDTO.getTieuDe());
            baiViet.setUriHinhAnhMinhHoa(baiVietDTO.getUriHinhAnhMinhHoa());
            baiViet.setNoiDungTomTat(baiVietDTO.getNoiDungTomTat());
            baiViet.setNoiDung(baiVietDTO.getNoiDung());
            baiViet.setNgayDang(baiVietDTO.getNgayDang());
            baiViet.setNhanVien(entityManager.find(NhanVien.class, baiVietDTO.getNhanVienId()));
            baiViet.setLanCapNhatCuoiCung(baiVietDTO.getLanCapNhatCuoiCung());
            baiViet.setSoLuongTruyCap(baiVietDTO.getSoLuongTruyCap());
            baiViet.setMenu(baiVietDTO.getMenu());
            baiViet.setTrangThai(baiVietDTO.getTrangThai());
            entityManager.merge(baiViet);
        }
        return baiViet;
    }

    @Override
    @Transactional
    public void deleteBaiViet(String id) {
        BaiViet baiViet = entityManager.find(BaiViet.class, id);
        if (baiViet != null) {
            entityManager.remove(baiViet);
        }
    }
}
