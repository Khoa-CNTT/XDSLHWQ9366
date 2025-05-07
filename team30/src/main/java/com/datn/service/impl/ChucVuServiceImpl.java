package com.datn.service.impl;

import com.datn.entity.ChucVu;
import com.datn.repository.ChucVuRepo;
import com.datn.service.ChucVuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChucVuServiceImpl implements ChucVuService {

    private final ChucVuRepo chucVuRepo;

    @Autowired
    public ChucVuServiceImpl(ChucVuRepo chucVuRepo) {
        this.chucVuRepo = chucVuRepo;
    }

    @Override
    public ChucVu findById(String maChucVu) {
        return this.chucVuRepo.findById(maChucVu);
    }

    @Override
    public List<ChucVu> findAll() {
        return this.chucVuRepo.findAll();
    }

}
