package com.datn.entity;/*
 * @project team30
 * @author Huy
 */

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "TAIKHOANS")
public class TaiKhoan {
    @Id
    @Column(name = "MATAIKHOAN")
    private String maTaiKhoan;

    @NotNull
    @Size(min = 3, max = 50)
    @Column(name = "TENTAIKHOAN")
    private String tenTaiKhoan;

    @NotNull
    @Size(min = 8)
    @Column(name = "MATKHAU")
    private String matKhau;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "MANHANVIEN")
    private NhanVien nhanVien;

    @Column(name = "QUYENTRUYCAP")
    private String quyenTruyCap;

    @Lob
    @Column(name = "GHICHU")
    private String ghiChu;

    public TaiKhoan() {
    }

    public TaiKhoan(String maTaiKhoan, String tenTaiKhoan, String matKhau, NhanVien nhanVien, String quyenTruyCap, String ghiChu) {
        this.maTaiKhoan = maTaiKhoan;
        this.tenTaiKhoan = tenTaiKhoan;
        this.matKhau = matKhau;
        this.nhanVien = nhanVien;
        this.quyenTruyCap = quyenTruyCap;
        this.ghiChu = ghiChu;
    }

    public String getMaTaiKhoan() {
        return maTaiKhoan;
    }

    public void setMaTaiKhoan(String maTaiKhoan) {
        this.maTaiKhoan = maTaiKhoan;
    }

    public String getTenTaiKhoan() {
        return tenTaiKhoan;
    }

    public void setTenTaiKhoan(String tenTaiKhoan) {
        this.tenTaiKhoan = tenTaiKhoan;
    }

    public String getMatKhau() {
        return matKhau;
    }

    public void setMatKhau(String matKhau) {
        this.matKhau = matKhau;
    }

    public NhanVien getNhanVien() {
        return nhanVien;
    }

    public void setNhanVien(NhanVien nhanVien) {
        this.nhanVien = nhanVien;
    }

    public String getQuyenTruyCap() {
        return quyenTruyCap;
    }

    public void setQuyenTruyCap(String quyenTruyCap) {
        this.quyenTruyCap = quyenTruyCap;
    }

    public String getGhiChu() {
        return ghiChu;
    }

    public void setGhiChu(String ghiChu) {
        this.ghiChu = ghiChu;
    }

    @Override
    public String toString() {
        return "TaiKhoan{" +
                "maTaiKhoan='" + maTaiKhoan + '\'' +
                ", tenTaiKhoan='" + tenTaiKhoan + '\'' +
                ", matKhau='" + matKhau + '\'' +
                ", nhanVien=" + nhanVien +
                ", quyenTruyCap='" + quyenTruyCap + '\'' +
                ", ghiChu='" + ghiChu + '\'' +
                '}';
    }
}