package com.datn.service.impl;

import com.datn.dto.request.PhongHocAddDTO;
import com.datn.entity.PhongHoc;
import com.datn.repository.PhongHocRepo;
import com.datn.service.PhongHocService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

}
