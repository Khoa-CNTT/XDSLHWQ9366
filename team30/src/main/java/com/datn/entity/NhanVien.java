package com.datn.entity;/*
 * @project team30
 * @author Huy
 */

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "NHANVIENS")
public class NhanVien {
    @Id
    @Column(name = "MANHANVIEN", length = 255, nullable = false, updatable = false)
    @JdbcTypeCode(SqlTypes.VARCHAR)
    @JsonIgnore
    private String maNhanVien;

    @Column(name = "TENNHANVIEN", length = 255)
    private String tenNhanVien;

    @Column(name = "NGAYSINH")
    private LocalDate ngaySinh;

    @Column(name = "GIOITINH")
    private boolean gioiTinh;

    @Column(name = "SOCMND", length = 255)
    private String soCMND;

    @Column(name = "SODIENTHOAI", length = 255)
    private String soDienThoai;

    @Column(name = "EMAIL", length = 255)
    private String email;

    @Column(name = "DIACHI")
    private String diaChi;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "MACHUCVU")
    private ChucVu chucVu;

    @Column(name = "NGUOINHAPTHONGTIN", length = 255)
    private String nguoiNhapThongTin;

    @Lob
    @Column(name = "GHICHU")
    private String ghiChu;

    @Column(name = "URIHINHDAIDIEN", length = 255)
    private String uriHinhDaiDien;

    @OneToMany(mappedBy = "nhanVien", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<BaiViet> baiViets;

    public NhanVien() {

    }

    public NhanVien(String maNhanVien, String tenNhanVien, LocalDate ngaySinh, boolean gioiTinh, String soCMND, String soDienThoai, String email, String diaChi, ChucVu chucVu, String nguoiNhapThongTin, String ghiChu, String uriHinhDaiDien) {
        this.maNhanVien = maNhanVien;
        this.tenNhanVien = tenNhanVien;
        this.ngaySinh = ngaySinh;
        this.gioiTinh = gioiTinh;
        this.soCMND = soCMND;
        this.soDienThoai = soDienThoai;
        this.email = email;
        this.diaChi = diaChi;
        this.chucVu = chucVu;
        this.nguoiNhapThongTin = nguoiNhapThongTin;
        this.ghiChu = ghiChu;
        this.uriHinhDaiDien = uriHinhDaiDien;
    }

    public String getMaNhanVien() {
        return maNhanVien;
    }

    public void setMaNhanVien(String maNhanVien) {
        this.maNhanVien = maNhanVien;
    }

    public String getTenNhanVien() {
        return tenNhanVien;
    }

    public void setTenNhanVien(String tenNhanVien) {
        this.tenNhanVien = tenNhanVien;
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

    public ChucVu getChucVu() {
        return chucVu;
    }

    public void setChucVu(ChucVu chucVu) {
        this.chucVu = chucVu;
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
}
