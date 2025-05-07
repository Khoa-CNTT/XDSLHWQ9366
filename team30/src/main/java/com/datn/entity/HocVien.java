package com.datn.entity;/*
 * @project team30
 * @author Huy
 */

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "HOCVIENS")
public class HocVien {
    @Id
    @Column(name = "MAHOCVIEN", columnDefinition = "VARCHAR(255)")
    private String maHocVien;

    @Column(name = "TENHOCVIEN", columnDefinition = "VARCHAR(255)")
    private String tenHocVien;

    @Column(name = "NGAYSINH", columnDefinition = "DATE")
    private LocalDate ngaySinh;

    @Column(name = "GIOITINH", columnDefinition = "BOOLEAN")
    private boolean gioiTinh;

    @Column(name = "SOCMND", columnDefinition = "VARCHAR(255)")
    private String soCMND;

    @Column(name = "SODIENTHOAI", columnDefinition = "VARCHAR(255)")
    private String soDienThoai;

    @Column(name = "EMAIL", columnDefinition = "VARCHAR(255)")
    private String email;

    @Column(name = "DIACHI", columnDefinition = "VARCHAR(255)")
    private String diaChi;

    @Column(name = "TINHTRANGHOCTAP", columnDefinition = "VARCHAR(255)")
    private String tinhTrangHocTap; //  Đang học, Nghỉ học, Đã tốt nghiệp

    @Column(name = "NGUOINHAPTHONGTIN", columnDefinition = "VARCHAR(255)")
    private String nguoiNhapThongTin;

    @Column(name = "GHICHU", columnDefinition = "TEXT")
    private String ghiChu;

    @Column(name = "URIHINHDAIDIEN", columnDefinition = "VARCHAR(255)")
    private String uriHinhDaiDien;

    @Column(name = "NGAYCAPNHATGANNHAT", columnDefinition = "DATE")
    private LocalDate ngayCapNhatGanNhat = LocalDate.now();

    @Column(name = "MATAIKHOAN", columnDefinition = "VARCHAR(255)")
    private String maTaiKhoan;

    public HocVien() {

    }

    public String getMaHocVien() {
        return maHocVien;
    }

    public void setMaHocVien(String maHocVien) {
        this.maHocVien = maHocVien;
    }

    public String getTenHocVien() {
        return tenHocVien;
    }

    public void setTenHocVien(String tenHocVien) {
        this.tenHocVien = tenHocVien;
    }

    public LocalDate getNgaySinh() {
        return ngaySinh;
    }

    public void setNgaySinh(LocalDate ngaySinh) {
        this.ngaySinh = ngaySinh;
    }

    public boolean isGioiTinh() {
        return gioiTinh;
    }

    public void setGioiTinh(boolean gioiTinh) {
        this.gioiTinh = gioiTinh;
    }

    public String getSoCMND() {
        return soCMND;
    }

    public void setSoCMND(String soCMND) {
        this.soCMND = soCMND;
    }

    public String getSoDienThoai() {
        return soDienThoai;
    }

    public void setSoDienThoai(String soDienThoai) {
        this.soDienThoai = soDienThoai;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDiaChi() {
        return diaChi;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }

    public String getTinhTrangHocTap() {
        return tinhTrangHocTap;
    }

    public void setTinhTrangHocTap(String tinhTrangHocTap) {
        this.tinhTrangHocTap = tinhTrangHocTap;
    }

    public String getNguoiNhapThongTin() {
        return nguoiNhapThongTin;
    }

    public void setNguoiNhapThongTin(String nguoiNhapThongTin) {
        this.nguoiNhapThongTin = nguoiNhapThongTin;
    }

    public String getGhiChu() {
        return ghiChu;
    }

    public void setGhiChu(String ghiChu) {
        this.ghiChu = ghiChu;
    }

    public String getUriHinhDaiDien() {
        return uriHinhDaiDien;
    }

    public void setUriHinhDaiDien(String uriHinhDaiDien) {
        this.uriHinhDaiDien = uriHinhDaiDien;
    }

    public LocalDate getNgayCapNhatGanNhat() {
        return ngayCapNhatGanNhat;
    }

    public void setNgayCapNhatGanNhat(LocalDate ngayCapNhatGanNhat) {
        this.ngayCapNhatGanNhat = ngayCapNhatGanNhat;
    }

    public String getMaTaiKhoan() {
        return maTaiKhoan;
    }

    public void setMaTaiKhoan(String maTaiKhoan) {
        this.maTaiKhoan = maTaiKhoan;
    }
}