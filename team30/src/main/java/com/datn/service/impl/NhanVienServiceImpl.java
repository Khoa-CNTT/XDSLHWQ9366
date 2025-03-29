package com.datn.service.impl;

import com.datn.dto.request.NhanVienUpdateDTO;
import com.datn.entity.ChucVu;
import com.datn.entity.NhanVien;
import com.datn.exception.chucvu.ChucVuNotFoundException;
import com.datn.exception.nhanvien.NhanVienNotFoundException;
import com.datn.repository.ChucVuRepo;
import com.datn.repository.NhanVienRepo;
import com.datn.service.NhanVienService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NhanVienServiceImpl implements NhanVienService {

    private final NhanVienRepo nhanvienRepo;
    private final ChucVuRepo chucVuRepo;


    public NhanVienServiceImpl(NhanVienRepo nhanvienRepo, ChucVuRepo chucVuRepo) {
        this.nhanvienRepo = nhanvienRepo;
        this.chucVuRepo = chucVuRepo;
    }

    @Override
    @Transactional
    public boolean add(NhanVien nhanVien, String maChucVu) {
        this.checkChucVuExists(maChucVu);

        this.nhanvienRepo.checkSoCMNDExists(nhanVien.getSoCMND());
        this.nhanvienRepo.checkSoDienThoaiExists(nhanVien.getSoDienThoai());
        this.nhanvienRepo.checkEmailExists(nhanVien.getEmail());

        ChucVu chucVu = this.chucVuRepo.findById(maChucVu);

        nhanVien.setChucVu(chucVu);

        return nhanvienRepo.add(nhanVien);
    }

    @Override
    @Transactional
    public NhanVien update(String maNhanVien, NhanVienUpdateDTO nhanVienUpdateDTO) {
        NhanVien nhanVien = this.nhanvienRepo.findById(maNhanVien);
        if (nhanVien == null) {
            throw new NhanVienNotFoundException("Không tìm thấy nhân viên với mã " + maNhanVien);
        }

        this.nhanvienRepo.checkSoCMNDExists(nhanVienUpdateDTO.getSoCMND());
        this.nhanvienRepo.checkSoDienThoaiExists(nhanVienUpdateDTO.getSoDienThoai());
        this.nhanvienRepo.checkEmailExists(nhanVienUpdateDTO.getEmail());

        nhanVien.setSoCMND(nhanVienUpdateDTO.getSoCMND());
        nhanVien.setSoDienThoai(nhanVienUpdateDTO.getSoDienThoai());
        nhanVien.setEmail(nhanVienUpdateDTO.getEmail());
        nhanVien.setDiaChi(nhanVienUpdateDTO.getDiaChi());
        nhanVien.setNguoiNhapThongTin(nhanVienUpdateDTO.getNguoiNhapThongTin());
        nhanVien.setGhiChu(nhanVienUpdateDTO.getGhiChu());

        if(nhanVienUpdateDTO.getMaChucVu() != null) {
            checkChucVuExists(nhanVienUpdateDTO.getMaChucVu());
        }

        return this.nhanvienRepo.update(nhanVien);

    }

    @Override
    @Transactional
    public NhanVien update(NhanVien nhanVien) {
        return this.nhanvienRepo.update(nhanVien);
    }

    @Override
    public List<NhanVien> findAll() {
        return this.nhanvienRepo.findAll();
    }

    @Override
    public List<NhanVien> findAll(int pageNumber, int pageSize) {
        return this.nhanvienRepo.findAll(pageNumber, pageSize);
    }

    @Override
    public List<NhanVien> findByTenNhanVien(String tenNhanVien) {
        return this.nhanvienRepo.findByTenNhanVien(tenNhanVien);
    }

    @Override
    public NhanVien findById(String maNhanVien) {
        return this.nhanvienRepo.findById(maNhanVien);
    }

    @Override
    @Transactional
    public void delete(String maNhanVien) {
        this.nhanvienRepo.delete(maNhanVien);
    }

    private void checkChucVuExists(String maChucVu) {
        ChucVu chucVu = this.chucVuRepo.findById(maChucVu);
        if(chucVu == null) {
            throw new ChucVuNotFoundException("Không tìm thấy chức vụ với mã " + maChucVu);
        }
    }

}
