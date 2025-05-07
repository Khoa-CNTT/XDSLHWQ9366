package com.datn.entity;/*
 * @project team30
 * @author Huy
 */

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "THISINHDUTHIS")
public class ThiSinhDuThi {
    @Id
    @Column(name = "MATHISINHDUTHI", columnDefinition = "VARCHAR(255)")
    private String maThiSinhDuThi;

    @Column(name = "TENTHISINHDUTHI", columnDefinition = "VARCHAR(255)")
    private String tenThiSinhDuThi;

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

    @Column(name = "DIENDANGKY", columnDefinition = "VARCHAR(255)")
    private String dienDangKy; // diện đăng ký - "ONLINE" , "TRUCTIEP"

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "MALICHTHI")
    private LichThi lichThi;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "MAPHONGTHI")
    private PhongHoc phongThi;


    @Column(name = "DIEM", columnDefinition = "DOUBLE")
    private double diem;

    @Column(name = "XEPLOAI", columnDefinition = "VARCHAR(255)")
    private String xepLoai;


    @Column(name = "NGAYCAPCHUNGCHI", columnDefinition = "DATE")
    private LocalDate ngayCapChungChi;

    @Column(name = "GHICHU", columnDefinition = "TEXT")
    private String ghiChu;

    @Column(name = "URLHINHDAIDIEN", columnDefinition = "VARCHAR(255)")
    private String urlHinhDaiDien;

    public  ThiSinhDuThi() {

    }

    public String getMaThiSinhDuThi() {
        return maThiSinhDuThi;
    }

    public void setMaThiSinhDuThi(String maThiSinhDuThi) {
        this.maThiSinhDuThi = maThiSinhDuThi;
    }

    public String getTenThiSinhDuThi() {
        return tenThiSinhDuThi;
    }

    public void setTenThiSinhDuThi(String tenThiSinhDuThi) {
        this.tenThiSinhDuThi = tenThiSinhDuThi;
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

    public String getDienDangKy() {
        return dienDangKy;
    }

    public void setDienDangKy(String dienDangKy) {
        this.dienDangKy = dienDangKy;
    }

    public LichThi getLichThi() {
        return lichThi;
    }

    public void setLichThi(LichThi lichThi) {
        this.lichThi = lichThi;
    }

    public PhongHoc getPhongThi() {
        return phongThi;
    }

    public void setPhongThi(PhongHoc phongThi) {
        this.phongThi = phongThi;
    }

    public double getDiem() {
        return diem;
    }

    public void setDiem(double diem) {
        this.diem = diem;
    }

    public String getXepLoai() {
        return xepLoai;
    }

    public void setXepLoai(String xepLoai) {
        this.xepLoai = xepLoai;
    }

    public LocalDate getNgayCapChungChi() {
        return ngayCapChungChi;
    }

    public void setNgayCapChungChi(LocalDate ngayCapChungChi) {
        this.ngayCapChungChi = ngayCapChungChi;
    }

    public String getGhiChu() {
        return ghiChu;
    }

    public void setGhiChu(String ghiChu) {
        this.ghiChu = ghiChu;
    }

    public String getUrlHinhDaiDien() {
        return urlHinhDaiDien;
    }

    public void setUrlHinhDaiDien(String urlHinhDaiDien) {
        this.urlHinhDaiDien = urlHinhDaiDien;
    }
}
