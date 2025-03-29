package com.datn.service.impl;

import com.datn.dto.response.PaginationResponse;
import com.datn.entity.GiangVien;
import com.datn.exception.giangvien.GiangVienNotFoundException;
import com.datn.repository.GiangVienRepo;
import com.datn.service.GiangVienService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GiangVienServiceImpl implements GiangVienService {

    private final GiangVienRepo giangVienRepo;

    @Autowired
    public GiangVienServiceImpl(GiangVienRepo giangVienRepo) {
        this.giangVienRepo = giangVienRepo;
    }

    @Override
    public GiangVien findById(String maGiangVien) {
        GiangVien giangVien = this.giangVienRepo.findById(maGiangVien);
        if(giangVien == null) {
            throw new GiangVienNotFoundException("Không tìm thấy giảng viên với mã - " + maGiangVien);
        }

        return giangVien;
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

    @Override
    @Transactional
    public void delete(String maGiangVien) {
        this.giangVienRepo.delete(maGiangVien);
    }

    @Override
    public PaginationResponse<GiangVien> pagination(int pageNumber, int pageSize) {
        if (pageNumber < 1 || pageSize < 1) {
            throw new IllegalArgumentException("Số trang và kích thước trang phải lớn hơn 0");
        }

        long totalElements = this.giangVienRepo.findAll().size();
        List<GiangVien> giangViens = this.giangVienRepo.pagination(pageNumber, pageSize);

        return new PaginationResponse<>(pageNumber, pageSize, totalElements, giangViens);
    }
}
