package com.datn.service.impl;

import com.datn.entity.LinhVuc;
import com.datn.repository.LinhVucRepo;
import com.datn.service.LinhVucService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LinhVucServiceImpl implements LinhVucService {

    private final LinhVucRepo linhVucRepo;

    @Autowired
    public LinhVucServiceImpl(LinhVucRepo linhVucRepo) {
        this.linhVucRepo = linhVucRepo;
    }

    @Override
    public List<LinhVuc> findAll() {
        return this.linhVucRepo.findAll();
    }

    @Override
    public LinhVuc findById(String maLinhVuc) {
        return this.linhVucRepo.findById(maLinhVuc);
    }

}
