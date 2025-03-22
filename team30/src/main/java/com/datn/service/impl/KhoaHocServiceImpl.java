package com.datn.service.impl;

import com.datn.dto.request.KhoaHocAddDTO;
import com.datn.dto.request.KhoaHocUpdateDTO;
import com.datn.dto.response.PaginationResponse;
import com.datn.entity.KhoaHoc;
import com.datn.entity.LinhVuc;
import com.datn.exception.khoahoc.KhoaHocNotFoundException;
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
    @Transactional
    public KhoaHoc update(String maKhoaHoc, KhoaHocUpdateDTO khoaHocUpdateDTO) {
        KhoaHoc khoaHoc = this.khoaHocRepo.findById(maKhoaHoc);

        if(khoaHoc == null) {
            throw new KhoaHocNotFoundException("Khóa học không tồn tài với mã - " + maKhoaHoc);
        }

        khoaHoc.setMaKhoaHoc(maKhoaHoc);
        khoaHoc.setSoBuoi(khoaHocUpdateDTO.getSoBuoi());
        khoaHoc.setHocPhi(khoaHocUpdateDTO.getHocPhi());
        khoaHoc.setNoiDungTomTatKhoaHoc(khoaHocUpdateDTO.getNoiDungTomTatKhoaHoc());
        khoaHoc.setNoiDungKhoaHoc(khoaHocUpdateDTO.getNoiDungKhoaHoc());

        return this.khoaHocRepo.update(khoaHoc);
    }

    @Override
    @Transactional
    public void delete(String maKhoaHoc) {
        this.khoaHocRepo.delete(maKhoaHoc);
    }

    @Override
    public PaginationResponse<KhoaHoc> pagination(int pageNumber, int pageSize) {
        if (pageNumber < 1 || pageSize < 1) {
            throw new IllegalArgumentException("Số trang và kích thước trang phải lớn hơn 0");
        }

        long totalElements = this.khoaHocRepo.countTotalKhoaHocs();

        List<KhoaHoc> khoaHocs = this.khoaHocRepo.pagination(pageNumber, pageSize);

        return new PaginationResponse<>(pageNumber, pageSize, totalElements, khoaHocs);
    }

    @Override
    public List<KhoaHoc> findByTenKhoaHoc(String tenKhoaHoc) {
        return List.of();
    }

}
