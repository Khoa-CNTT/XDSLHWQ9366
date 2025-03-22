package com.datn.service.impl;

import com.datn.dto.request.LopHocAddDTO;
import com.datn.dto.request.LopHocUpdateDTO;
import com.datn.dto.response.PaginationResponse;
import com.datn.entity.GiangVien;
import com.datn.entity.KhoaHoc;
import com.datn.entity.LopHoc;
import com.datn.entity.PhongHoc;
import com.datn.exception.giangvien.GiangVienNotFoundException;
import com.datn.exception.khoahoc.KhoaHocNotFoundException;
import com.datn.exception.lophoc.InvalidLopHocException;
import com.datn.exception.lophoc.LopHocNotFoundException;
import com.datn.exception.phonghoc.PhongHocNotFoundException;
import com.datn.repository.GiangVienRepo;
import com.datn.repository.KhoaHocRepo;
import com.datn.repository.LopHocRepo;
import com.datn.repository.PhongHocRepo;
import com.datn.service.LopHocService;
import jakarta.transaction.Transactional;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LopHocServiceImpl implements LopHocService {

    private final LopHocRepo lopHocRepo;
    private final KhoaHocRepo khoaHocRepo;
    private final PhongHocRepo phongHocRepo;
    private final GiangVienRepo giangVienRepo;

    public LopHocServiceImpl(LopHocRepo lopHocRepo, KhoaHocRepo khoaHocRepo,
                             GiangVienRepo giangVienRepo, PhongHocRepo phongHocRepo) {
        this.lopHocRepo = lopHocRepo;
        this.khoaHocRepo = khoaHocRepo;
        this.giangVienRepo = giangVienRepo;
        this.phongHocRepo = phongHocRepo;
    }

    @Override
    @Transactional
    public LopHoc add(LopHocAddDTO lopHocAddDTO) {
        this.lopHocRepo.checkLopHocExists(lopHocAddDTO.getTenLopHoc());

        LopHoc lopHoc = new LopHoc();
        lopHoc.setTenLopHoc(lopHocAddDTO.getTenLopHoc());
        lopHoc.setLichHoc(lopHocAddDTO.getLichHoc());
        lopHoc.setTinhTrang(lopHocAddDTO.getTinhTrang());

        if(lopHocAddDTO.getNgayBatDau().isAfter(lopHocAddDTO.getNgayKetThuc())) {
            throw new InvalidLopHocException("Ngày kết thúc phải trước ngày bắt đầu");
        }

        lopHoc.setNgayBatDau(lopHocAddDTO.getNgayBatDau());
        lopHoc.setNgayKetThuc(lopHocAddDTO.getNgayKetThuc());

        if(lopHocAddDTO.getDaThanhToan() > lopHocAddDTO.getThuLao()) {
            throw new InvalidLopHocException("Sao lại trả cho giáo viên nhiều hơn thù lao sẵn có");
        }

        lopHoc.setThuLao(lopHocAddDTO.getThuLao());
        lopHoc.setDaThanhToan(lopHocAddDTO.getDaThanhToan());

        KhoaHoc khoaHoc = this.khoaHocRepo.findById(lopHocAddDTO.getMaKhoaHoc());
        if(khoaHoc == null) {
            throw new KhoaHocNotFoundException("Khóa học không tồn tại với mã - " + lopHocAddDTO.getMaKhoaHoc());
        }

        PhongHoc phongHoc = this.phongHocRepo.findById(lopHocAddDTO.getMaPhongHoc());
        if(phongHoc == null) {
            throw new PhongHocNotFoundException("Phòng học không tồn tại với mã - " + lopHocAddDTO.getMaPhongHoc());
        }

        GiangVien giangVien = this.giangVienRepo.findById(lopHocAddDTO.getMaGiangVien());
        if(giangVien == null) {
            throw new GiangVienNotFoundException("Giảng viên không tồn tại với mã - " + lopHocAddDTO.getMaGiangVien());
        }

        lopHoc.setKhoaHoc(khoaHoc);
        lopHoc.setPhongHoc(phongHoc);
        lopHoc.setGiangVien(giangVien);

        lopHoc.setGhiChu(lopHocAddDTO.getGhiChu());

        return this.lopHocRepo.add(lopHoc);
    }

    @Override
    @Transactional
    public LopHoc update(String maLopHoc, LopHocUpdateDTO lopHocUpdateDTO) {
        LopHoc lopHoc = this.lopHocRepo.findById(maLopHoc);
        if(lopHoc == null) {
            throw new LopHocNotFoundException("Không tồn tại lớp học với mã - " + maLopHoc);
        }

        lopHoc.setTenLopHoc(lopHocUpdateDTO.getTenLopHoc());
        lopHoc.setLichHoc(lopHocUpdateDTO.getLichHoc());
        lopHoc.setTinhTrang(lopHocUpdateDTO.getTinhTrang());

        if(lopHocUpdateDTO.getNgayBatDau().isAfter(lopHocUpdateDTO.getNgayKetThuc())) {
            throw new InvalidLopHocException("Ngày kết thúc phải trước ngày bắt đầu");
        }

        lopHoc.setNgayBatDau(lopHocUpdateDTO.getNgayBatDau());
        lopHoc.setNgayKetThuc(lopHocUpdateDTO.getNgayKetThuc());

        if(lopHocUpdateDTO.getDaThanhToan() > lopHocUpdateDTO.getThuLao()) {
            throw new InvalidLopHocException("Sao lại trả cho giáo viên nhiều hơn thù lao sẵn có");
        }

        lopHoc.setThuLao(lopHocUpdateDTO.getThuLao());
        lopHoc.setDaThanhToan(lopHocUpdateDTO.getDaThanhToan());

        PhongHoc phongHoc = this.phongHocRepo.findById(lopHocUpdateDTO.getMaPhongHoc());
        if(phongHoc == null) {
            throw new PhongHocNotFoundException("Phòng học không tồn tại với mã - " + lopHocUpdateDTO.getMaPhongHoc());
        }

        GiangVien giangVien = this.giangVienRepo.findById(lopHocUpdateDTO.getMaGiangVien());
        if(giangVien == null) {
            throw new GiangVienNotFoundException("Giảng viên không tồn tại với mã - " + lopHocUpdateDTO.getMaGiangVien());
        }

        lopHoc.setPhongHoc(phongHoc);
        lopHoc.setGiangVien(giangVien);

        lopHoc.setGhiChu(lopHocUpdateDTO.getGhiChu());

        LopHoc updatedLopHoc = this.lopHocRepo.update(lopHoc);

        return updatedLopHoc;
    }

    @Override
    @Transactional
    public void delete(String maLopHoc) {
        this.lopHocRepo.delete(maLopHoc);
    }

    @Override
    public PaginationResponse<LopHoc> pagination(int pageNumber, int pageSize) {
        if (pageNumber < 1 || pageSize < 1) {
            throw new IllegalArgumentException("Số trang và kích thước trang phải lớn hơn 0");
        }

        long totalElements = this.lopHocRepo.countTotalLopHocs();

        List<LopHoc> lopHocs = this.lopHocRepo.pagination(pageNumber, pageSize);

        return new PaginationResponse<>(pageNumber, pageSize, totalElements, lopHocs);
    }

    @Override
    public List<LopHoc> findByTenLopHoc(String tenLopHoc) {
        return List.of();
    }

}
