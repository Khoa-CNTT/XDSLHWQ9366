package com.datn.service.impl;

import com.datn.dto.request.PhongHocAddDTO;
import com.datn.dto.request.PhongHocUpdateDTO;
import com.datn.dto.response.PaginationResponse;
import com.datn.entity.PhongHoc;
import com.datn.repository.PhongHocRepo;
import com.datn.service.PhongHocService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhongHocServiceImpl implements PhongHocService {

    private final PhongHocRepo phongHocRepo;

    @Autowired
    public PhongHocServiceImpl(PhongHocRepo phongHocRepo) {
        this.phongHocRepo = phongHocRepo;
    }

    @Override
    @Transactional
    public PhongHoc add(PhongHocAddDTO phongHocAddDTO) {
        this.phongHocRepo.checkPhongHocExists(phongHocAddDTO.tenPhongHoc());

        PhongHoc phongHoc = new PhongHoc();
        phongHoc.setTenPhongHoc(phongHocAddDTO.tenPhongHoc());
        phongHoc.setSoChoNgoi(phongHocAddDTO.soChoNgoi());
        phongHoc.setGhiChu(phongHocAddDTO.ghiChu());

        return this.phongHocRepo.add(phongHoc);
    }

    @Override
    @Transactional
    public PhongHoc update(String maPhongHoc, PhongHocUpdateDTO phongHocUpdateDTO) {
        this.phongHocRepo.checkPhongHocExists(phongHocUpdateDTO.getTenPhongHoc());

        PhongHoc phongHoc = new PhongHoc();
        phongHoc.setMaPhongHoc(maPhongHoc);
        phongHoc.setTenPhongHoc(phongHocUpdateDTO.getTenPhongHoc());
        phongHoc.setSoChoNgoi(phongHocUpdateDTO.getSoChoNgoi());
        phongHoc.setGhiChu(phongHocUpdateDTO.getGhiChu());

        return this.phongHocRepo.update(phongHoc);
    }

    @Override
    @Transactional
    public void delete(String maPhongHoc) {
        this.phongHocRepo.delete(maPhongHoc);
    }

    @Override
    public PaginationResponse<PhongHoc> pagination(int pageNumber, int pageSize) {
        if (pageNumber < 1 || pageSize < 1) {
            throw new IllegalArgumentException("Số trang và kích thước trang phải lớn hơn 0");
        }

        long totalElements = this.phongHocRepo.countTotalPhongHocs();

        List<PhongHoc> phongHocs = this.phongHocRepo.pagination(pageNumber, pageSize);

        return new PaginationResponse<>(pageNumber, pageSize, totalElements, phongHocs);
    }

    @Override
    public List<PhongHoc> findByTenPhongHoc(String tenPhongHoc) {
        return this.phongHocRepo.findByTenPhongHoc(tenPhongHoc);
    }

    @Override
    public PhongHoc findById(String maPhongHoc) {
        return this.phongHocRepo.findById(maPhongHoc);
    }
}
