package com.datn.service.impl;

import com.datn.entity.GiangVien;
import com.datn.repository.GiangVienRepo;
import com.datn.service.GiangVienService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GiangVienServiceImpl implements GiangVienService {

    private final GiangVienRepo giangVienRepo;

    @Autowired
    public GiangVienServiceImpl(GiangVienRepo giangVienRepo) {
        this.giangVienRepo = giangVienRepo;
    }

    @Override
    public GiangVien findById(String maGiangVien) {
        return this.giangVienRepo.findById(maGiangVien);
    }

    @Override
    @Transactional
    public GiangVien add(GiangVien giangVien) {
        this.giangVienRepo.checkEmailExists(giangVien.getEmail());
        this.giangVienRepo.checkSoCMNDExists(giangVien.getSoCMND());
        this.giangVienRepo.checkSoDienThoaiExists(giangVien.getSoDienThoai());

        return this.giangVienRepo.add(giangVien);
    }

    @Override
    @Transactional
    public GiangVien update(GiangVien giangVien) {
        this.giangVienRepo.checkEmailExists(giangVien.getEmail());
        this.giangVienRepo.checkSoCMNDExists(giangVien.getSoCMND());
        this.giangVienRepo.checkSoDienThoaiExists(giangVien.getSoDienThoai());

        return this.giangVienRepo.update(giangVien);
    }
}
