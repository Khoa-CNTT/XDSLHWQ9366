package com.datn.service.impl;

import com.datn.dto.request.ThiSinhDuThiAddDTO;
import com.datn.dto.request.ThiSinhDuThiUpdateDTO;
import com.datn.dto.response.PaginationResponse;
import com.datn.entity.ThiSinhDuThi;
import com.datn.exception.base.NotFoundException;
import com.datn.exception.giangvien.GiangVienNotFoundException;
import com.datn.repository.LichThiRepo;
import com.datn.repository.PhongHocRepo;
import com.datn.repository.ThiSinhDuThiRepo;
import com.datn.service.ThiSinhDuThiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.rmi.NotBoundException;
import java.util.List;

@Service
public class ThiSinhDuThiServiceImpl implements ThiSinhDuThiService {

    private final ThiSinhDuThiRepo thiSinhDuThiRepo;
    private final LichThiRepo lichThiRepo;
    private final PhongHocRepo phongHocRepo;

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
        entity.setLichThi(this.lichThiRepo.getLichThiById(dto.getMaLichThi()));
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

        if(entity == null) {
            throw new NotFoundException("Không tìm thấy thí sinh với mã - " + entity.getMaThiSinhDuThi());
        }

        entity.setTenThiSinhDuThi(dto.getTenThiSinhDuThi());
        entity.setNgaySinh(dto.getNgaySinh());
        entity.setGioiTinh(dto.getGioiTinh());
        entity.setSoCMND(dto.getSoCMND());
        entity.setSoDienThoai(dto.getSoDienThoai());
        entity.setEmail(dto.getEmail());
        entity.setDiaChi(dto.getDiaChi());
        entity.setDienDangKy(dto.getDienDangKy());
        entity.setLichThi(this.lichThiRepo.getLichThiById(dto.getMaLichThi()));
        entity.setPhongThi(this.phongHocRepo.findById(dto.getMaPhongThi()));
        entity.setDiem(dto.getDiem());
        entity.setXepLoai(dto.getXepLoai());
        entity.setNgayCapChungChi(dto.getNgayCapChungChi());
        entity.setGhiChu(dto.getGhiChu());

        return this.thiSinhDuThiRepo.update(entity);
    }

    @Override
    public ThiSinhDuThi update(ThiSinhDuThi thiSinhDuThi) {
        return this.thiSinhDuThiRepo.update(thiSinhDuThi);
    }

    @Override
    public void delete(String maThiSinhDuThi) {
        this.thiSinhDuThiRepo.delete(maThiSinhDuThi);
    }

    @Override
    public PaginationResponse<ThiSinhDuThi> pagination(int pageNumber, int pageSize) {
        if (pageNumber < 1 || pageSize < 1) {
            throw new IllegalArgumentException("Số trang và kích thước trang phải lớn hơn 0");
        }

        long totalElements = this.thiSinhDuThiRepo.findAll().size();
        List<ThiSinhDuThi> thiSinhDuThis = this.thiSinhDuThiRepo.pagination(pageNumber, pageSize);

        return new PaginationResponse<>(pageNumber, pageSize, totalElements, thiSinhDuThis);
    }

    @Override
    public List<ThiSinhDuThi> findByTenThiSinhDuThi(String tenThiSinhDuThi) {
        return this.thiSinhDuThiRepo.findByTenThiSinhDuThi(tenThiSinhDuThi);
    }

    @Override
    public ThiSinhDuThi findById(String maThiSinhDuThi) {
        ThiSinhDuThi thiSinhDuThi = this.thiSinhDuThiRepo.findById(maThiSinhDuThi);
        if(thiSinhDuThi == null) {
            throw new GiangVienNotFoundException("Không tìm thấy thí sinh dự thi với mã - " + maThiSinhDuThi);
        }

        return thiSinhDuThi;
    }

}
