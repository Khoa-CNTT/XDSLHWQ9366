package com.datn.service.impl;

import com.datn.dto.request.ChiTietLopHocAddDTO;
import com.datn.dto.response.PaginationResponse;
import com.datn.entity.ChiTietLopHoc;
import com.datn.entity.HocVien;
import com.datn.entity.LopHoc;
import com.datn.exception.hocvien.HocVienNotFoundException;
import com.datn.exception.lophoc.LopHocNotFoundException;
import com.datn.repository.ChiTietLopHocRepo;
import com.datn.service.ChiTietLopHocService;
import com.datn.service.HocVienService;
import com.datn.service.LopHocService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class ChiTietLopHocServiceImpl implements ChiTietLopHocService {

    private final ChiTietLopHocRepo chiTietLopHocRepo;
    private final HocVienService hocVienService;
    private final LopHocService lopHocService;

    public ChiTietLopHocServiceImpl
            (ChiTietLopHocRepo chiTietLopHocRepo,
             HocVienService hocVienService, LopHocService lopHocService) {
        this.chiTietLopHocRepo = chiTietLopHocRepo;
        this.hocVienService = hocVienService;
        this.lopHocService = lopHocService;
    }

    @Override
    public ChiTietLopHoc findById(String maCTLH) {
        return this.chiTietLopHocRepo.findById(maCTLH);
    }

    @Override
    public ChiTietLopHoc add(ChiTietLopHocAddDTO dto) {
        ChiTietLopHoc entity = new ChiTietLopHoc();

        HocVien hocVien = this.hocVienService.findById(dto.getMaHocVien());
        if(hocVien == null) {
            throw new HocVienNotFoundException("Không tồn tại học viên với mã - " + hocVien.getMaHocVien());
        }

        LopHoc lopHoc = this.lopHocService.findById(dto.getMaLopHoc());
        if(lopHoc == null) {
            throw new LopHocNotFoundException("Không tồn tại lớp học với mã - " + lopHoc.getMaLopHoc());
        }

        entity.setHocVien(hocVien);

        entity.setLopHoc(lopHoc);

        entity.setHocPhi(dto.getHocPhi());
        entity.setMienGiamHocPhi(dto.getMienGiamHocPhi());
        entity.setDaThuHocPhi(dto.isDaThuHocPhi());
        entity.setSoTienThu(dto.getSoTienThu());
        entity.setDiem(dto.getDiem());
        entity.setNgayCapChungChi(dto.getNgayCapChungChi());
        entity.setXepLoai(dto.getXepLoai());
        entity.setDiemDanh(dto.getDiemDanh());
        entity.setGhiChu(dto.getGhiChu());

        return this.chiTietLopHocRepo.add(entity);
    }

    @Override
    public PaginationResponse<ChiTietLopHoc> pagination(int pageNumber, int pageSize) {
        if (pageNumber < 1 || pageSize < 1) {
            throw new IllegalArgumentException("Số trang và kích thước trang phải lớn hơn 0");
        }
        long totalElements = this.chiTietLopHocRepo.findAll().size();
        List<ChiTietLopHoc> chiTietLopHocs = this.chiTietLopHocRepo.pagination(pageNumber, pageSize);

        return new PaginationResponse<>(pageNumber, pageSize, totalElements, chiTietLopHocs);
    }
}
