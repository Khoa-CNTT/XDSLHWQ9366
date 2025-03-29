package com.datn.service.impl;

import com.datn.dto.request.HocVienAddDTO;
import com.datn.dto.response.PaginationResponse;
import com.datn.entity.HocVien;
import com.datn.exception.hocvien.HocVienNotFoundException;
import com.datn.repository.HocVienRepo;
import com.datn.service.HocVienService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HocVienServiceImpl implements HocVienService {

    private final HocVienRepo hocVienRepo;

    @Autowired
    public HocVienServiceImpl(HocVienRepo hocVienRepo) {
        this.hocVienRepo = hocVienRepo;
    }

    @Override
    @Transactional
    public HocVien add(HocVienAddDTO hocVienAddDTO) {
        this.hocVienRepo.checkEmailExists(hocVienAddDTO.getEmail());
        this.hocVienRepo.checkSoCMNDExists(hocVienAddDTO.getSoCMND());
        this.hocVienRepo.checkSoDienThoaiExists(hocVienAddDTO.getSoDienThoai());

        HocVien hocVien = new HocVien();
        hocVien.setTenHocVien(hocVienAddDTO.getTenHocVien());
        hocVien.setNgaySinh(hocVienAddDTO.getNgaySinh());
        hocVien.setGioiTinh(hocVienAddDTO.isGioiTinh());
        hocVien.setSoCMND(hocVienAddDTO.getSoCMND());
        hocVien.setSoDienThoai(hocVienAddDTO.getSoDienThoai());
        hocVien.setEmail(hocVienAddDTO.getEmail());
        hocVien.setDiaChi(hocVienAddDTO.getDiaChi());
        hocVien.setTinhTrangHocTap(hocVienAddDTO.getTinhTrangHocTap());
        hocVien.setNguoiNhapThongTin(hocVienAddDTO.getNguoiNhapThongTin());
        hocVien.setGhiChu(hocVienAddDTO.getGhiChu());

        return this.hocVienRepo.add(hocVien);
    }

    @Override
    public HocVien findById(String maHocVien) {
        HocVien hocVien = this.hocVienRepo.findById(maHocVien);
        if(hocVien == null) {
            throw new HocVienNotFoundException("Không tìm thấy học viên với mã - " + maHocVien);
        }

        return hocVien;
    }

    @Override
    public List<HocVien> findAll() {
        return List.of();
    }

    @Override
    public HocVien update(HocVien hocVien) {
        return null;
    }

    @Override
    public void delete(String maHocVien) {

    }

    @Override
    public PaginationResponse<HocVien> pagination(int pageNumber, int pageSize) {
        return null;
    }

    @Override
    public List<HocVien> findByTenHocVien(String tenHocVien) {
        return List.of();
    }
}
