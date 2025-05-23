package com.datn.dto.request;

/*
 * @project team30
 * @author Huy
 */

import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;

public class PhieuThuAddDTO {

    private String noiDung;
    private BigDecimal soTien;
    private LocalDate ngayThu;
    private String maKeToanVien;
    private String nguoiNop;
    private String diaChi;
    private String ghiChu;

    public String getNoiDung() {
        return noiDung;
    }

    public void setNoiDung(String noiDung) {
        this.noiDung = noiDung;
    }

    public BigDecimal getSoTien() {
        return soTien;
    }

    public void setSoTien(BigDecimal soTien) {
        this.soTien = soTien;
    }

    public LocalDate getNgayThu() {
        return ngayThu;
    }

    public void setNgayThu(LocalDate ngayThu) {
        this.ngayThu = ngayThu;
    }

    public String getMaKeToanVien() {
        return maKeToanVien;
    }

    public void setMaKeToanVien(String maKeToanVien) {
        this.maKeToanVien = maKeToanVien;
    }

    public String getNguoiNop() {
        return nguoiNop;
    }

    public void setNguoiNop(String nguoiNop) {
        this.nguoiNop = nguoiNop;
    }

    public String getDiaChi() {
        return diaChi;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }

    public String getGhiChu() {
        return ghiChu;
    }

    public void setGhiChu(String ghiChu) {
        this.ghiChu = ghiChu;
    }
}
