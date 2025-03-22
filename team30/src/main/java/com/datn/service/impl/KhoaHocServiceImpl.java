package com.datn.service.impl;

import com.datn.dto.request.KhoaHocAddDTO;
import com.datn.dto.request.KhoaHocUpdateDTO;
import com.datn.dto.response.PaginationResponse;
import com.datn.entity.KhoaHoc;
import com.datn.entity.LinhVuc;
import com.datn.exception.linhvuc.LinhVucNotFoundException;
import com.datn.repository.KhoaHocRepo;
import com.datn.repository.LinhVucRepo;
import com.datn.service.KhoaHocService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KhoaHocServiceImpl implements KhoaHocService {

    private final KhoaHocRepo khoaHocRepo;

    private final LinhVucRepo linhVucRepo;

    @Autowired
    public KhoaHocServiceImpl(KhoaHocRepo khoaHocRepo, LinhVucRepo linhVucRepo) {
        this.khoaHocRepo = khoaHocRepo;
        this.linhVucRepo = linhVucRepo;
    }

    @Override
    @Transactional
    public KhoaHoc add(KhoaHocAddDTO khoaHocAddDTO) {
        this.khoaHocRepo.checkKhoaHocExists(khoaHocAddDTO.getTenKhoaHoc());

        KhoaHoc khoaHoc = new KhoaHoc();
        khoaHoc.setTenKhoaHoc(khoaHocAddDTO.getTenKhoaHoc());

        LinhVuc linhVuc = this.linhVucRepo.findById(khoaHocAddDTO.getMaLinhVuc());
        if(linhVuc == null) {
            throw new LinhVucNotFoundException("Không tìm thấy lĩnh vực với mã - " + khoaHocAddDTO.getMaLinhVuc());
        }

        khoaHoc.setLinhVuc(linhVuc);
        khoaHoc.setSoBuoi(khoaHocAddDTO.getSoBuoi());
        khoaHoc.setHocPhi(khoaHocAddDTO.getHocPhi());
        khoaHoc.setNoiDungTomTatKhoaHoc(khoaHocAddDTO.getNoiDungTomTatKhoaHoc());
        khoaHoc.setNoiDungKhoaHoc(khoaHocAddDTO.getNoiDungKhoaHoc());
        khoaHoc.setGhiChu(khoaHocAddDTO.getGhiChu());

        return this.khoaHocRepo.add(khoaHoc);
    }

    @Override
    public KhoaHoc update(String maKhoaHoc, KhoaHocUpdateDTO khoaHocUpdateDTO) {
        return null;
    }

    @Override
    public void delete(String maKhoaHoc) {

    }

    @Override
    public PaginationResponse<KhoaHoc> pagination(int pageNumber, int pageSize) {
        return null;
    }

    @Override
    public List<KhoaHoc> findByTenKhoaHoc(String tenKhoaHoc) {
        return List.of();
    }

}
