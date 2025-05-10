package com.datn.dto.request;

import com.datn.utils.LoaiGiaoDich;
import com.datn.utils.PhuongThucThanhToan;
import com.datn.utils.TrangThaiThanhToan;

import java.time.LocalDate;

public class ThanhToanDTO {
    private String maGiaoDich;
    private LoaiGiaoDich loaiGiaoDich;
    private Double soTien;
    private LocalDate ngayThucHien;
    private String maHocVien;
    private String maKhoaHoc;
    private PhuongThucThanhToan phuongThucThanhToan;
    private TrangThaiThanhToan trangThai;
    private String moTa;
    private String maNhanVien;

    public String getMaGiaoDich() {
        return maGiaoDich;
    }

    public void setMaGiaoDich(String maGiaoDich) {
        this.maGiaoDich = maGiaoDich;
    }

    public LoaiGiaoDich getLoaiGiaoDich() {
        return loaiGiaoDich;
    }

    public void setLoaiGiaoDich(LoaiGiaoDich loaiGiaoDich) {
        this.loaiGiaoDich = loaiGiaoDich;
    }

    public Double getSoTien() {
        return soTien;
    }

    public void setSoTien(Double soTien) {
        this.soTien = soTien;
    }

    public LocalDate getNgayThucHien() {
        return ngayThucHien;
    }

    public void setNgayThucHien(LocalDate ngayThucHien) {
        this.ngayThucHien = ngayThucHien;
    }

    public String getMaHocVien() {
        return maHocVien;
    }

    public void setMaHocVien(String maHocVien) {
        this.maHocVien = maHocVien;
    }

    public String getMaKhoaHoc() {
        return maKhoaHoc;
    }

    public void setMaKhoaHoc(String maKhoaHoc) {
        this.maKhoaHoc = maKhoaHoc;
    }

    public PhuongThucThanhToan getPhuongThucThanhToan() {
        return phuongThucThanhToan;
    }

    public void setPhuongThucThanhToan(PhuongThucThanhToan phuongThucThanhToan) {
        this.phuongThucThanhToan = phuongThucThanhToan;
    }

    public TrangThaiThanhToan getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(TrangThaiThanhToan trangThai) {
        this.trangThai = trangThai;
    }

    public String getMoTa() {
        return moTa;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }

    public String getMaNhanVien() {
        return maNhanVien;
    }

    public void setMaNhanVien(String maNhanVien) {
        this.maNhanVien = maNhanVien;
    }
}
