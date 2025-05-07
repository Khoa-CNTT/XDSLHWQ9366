package com.datn.service.impl;

import com.datn.dto.request.ThiSinhDuThiAddDTO;
import com.datn.dto.request.ThiSinhDuThiUpdateDTO;
import com.datn.dto.response.PaginationResponse;
import com.datn.entity.ThiSinhDuThi;
import com.datn.repository.LichThiRepo;
import com.datn.repository.PhongHocRepo;
import com.datn.repository.ThiSinhDuThiRepo;
import com.datn.service.ThiSinhDuThiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThiSinhDuThiServiceImpl implements ThiSinhDuThiService {

    private final ThiSinhDuThiRepo thiSinhDuThiRepo;
    private final LichThiRepo lichThiRepo;
    private final PhongHocRepo phongHocRepo;

    // ĐỂ LÀM TIẾP CẦN LichThiRepo và PhongThiRepo

    @Autowired
    public ThiSinhDuThiServiceImpl(ThiSinhDuThiRepo thiSinhDuThiRepo,
                                   LichThiRepo lichThiRepo, PhongHocRepo phongHocRepo) {
        this.thiSinhDuThiRepo = thiSinhDuThiRepo;
        this.lichThiRepo = lichThiRepo;
        this.phongHocRepo = phongHocRepo;
    }

    @Override
    public ThiSinhDuThi add(ThiSinhDuThiAddDTO dto) {
        ThiSinhDuThi entity = new ThiSinhDuThi();

        entity.setTenThiSinhDuThi(dto.getTenThiSinhDuThi());
        entity.setNgaySinh(dto.getNgaySinh());
        entity.setGioiTinh(dto.getGioiTinh());
        entity.setSoCMND(dto.getSoCMND());
        entity.setSoDienThoai(dto.getSoDienThoai());
        entity.setEmail(dto.getEmail());
        entity.setDiaChi(dto.getDiaChi());
        entity.setDienDangKy(dto.getDienDangKy());
        entity.setLichThi(null); // chưa xử lý lich thi findById
        entity.setPhongThi(this.phongHocRepo.findById(dto.getMaPhongThi()));
        entity.setDiem(dto.getDiem());
        entity.setXepLoai(dto.getXepLoai());
        entity.setNgayCapChungChi(dto.getNgayCapChungChi());
        entity.setGhiChu(dto.getGhiChu());
        entity.setUrlHinhDaiDien(dto.getUrlHinhDaiDien());

        return this.thiSinhDuThiRepo.add(entity);
    }

    @Override
    public ThiSinhDuThi update(String maThiSinhDuThi, ThiSinhDuThiUpdateDTO dto) {
        ThiSinhDuThi entity = this.thiSinhDuThiRepo.findById(maThiSinhDuThi);
        entity.setTenThiSinhDuThi(dto.getTenThiSinhDuThi());
        entity.setNgaySinh(dto.getNgaySinh());
        entity.setGioiTinh(dto.getGioiTinh());
        entity.setSoCMND(dto.getSoCMND());
        entity.setSoDienThoai(dto.getSoDienThoai());
        entity.setEmail(dto.getEmail());
        entity.setDiaChi(dto.getDiaChi());
        entity.setDienDangKy(dto.getDienDangKy());
//        entity.setLichThi(null);
        entity.setPhongThi(this.phongHocRepo.findById(dto.getMaPhongThi()));
        entity.setDiem(dto.getDiem());
        entity.setXepLoai(dto.getXepLoai());
        entity.setNgayCapChungChi(dto.getNgayCapChungChi());
        entity.setGhiChu(dto.getGhiChu());

        return this.thiSinhDuThiRepo.update(entity);
    }

    @Override
    public void delete(String maThiSinhDuThi) {

    }

    @Override
    public PaginationResponse<ThiSinhDuThi> pagination(int pageNumber, int pageSize) {
        return null;
    }

    @Override
    public List<ThiSinhDuThi> findByTenThiSinhDuThi(String tenThiSinhDuThi) {
        return List.of();
    }

    @Override
    public ThiSinhDuThi findById(String maThiSinhDuThi) {
        return null;
    }

}
