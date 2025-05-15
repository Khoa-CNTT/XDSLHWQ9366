package com.datn.entity;/*
 * @project team30
 * @author Huy
 */

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "GIANGVIENS")
public class GiangVien {
    @Id
    @Column(name = "MAGIANGVIEN")
    private String maGiangVien;

    @Column(name = "TENGIANGVIEN", columnDefinition = "VARCHAR(255)")
    private String tenGiangVien;

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

    @Column(name = "COQUANCONGTAC", columnDefinition = "VARCHAR(255)")
    private String coQuanCongTac;

    @Column(name = "TINHTRANGCONGTAC", columnDefinition = "VARCHAR(255)")
    private String tinhTrangCongTac; // Đang giảng dạy, Đã nghỉ

    @Lob
    @Column(name = "GHICHU")
    private String ghiChu;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "MALINHVUC")
    private LinhVuc linhVuc;

    @Column(name = "URLHINHDAIDIEN", length = 255)
    private String urlHinhDaiDien;

    public GiangVien() {

    }

    public String getMaGiangVien() {
        return maGiangVien;
    }

    public void setMaGiangVien(String maGiangVien) {
        this.maGiangVien = maGiangVien;
    }

    public String getTenGiangVien() {
        return tenGiangVien;
    }

    public void setTenGiangVien(String tenGiangVien) {
        this.tenGiangVien = tenGiangVien;
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

    public String getCoQuanCongTac() {
        return coQuanCongTac;
    }

    public void setCoQuanCongTac(String coQuanCongTac) {
        this.coQuanCongTac = coQuanCongTac;
    }

    public String getTinhTrangCongTac() {
        return tinhTrangCongTac;
    }

    public void setTinhTrangCongTac(String tinhTrangCongTac) {
        this.tinhTrangCongTac = tinhTrangCongTac;
    }

    public String getGhiChu() {
        return ghiChu;
    }

    public void setGhiChu(String ghiChu) {
        this.ghiChu = ghiChu;
    }

    public LinhVuc getLinhVuc() {
        return linhVuc;
    }

    public void setLinhVuc(LinhVuc linhVuc) {
        this.linhVuc = linhVuc;
    }

    public String getUrlHinhDaiDien() {
        return urlHinhDaiDien;
    }

    public void setUrlHinhDaiDien(String urlHinhDaiDien) {
        this.urlHinhDaiDien = urlHinhDaiDien;
    }

}
