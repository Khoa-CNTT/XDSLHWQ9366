package com.datn.entity;/*
 * @project team30
 * @author Huy
 */

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "LOPHOCS")
public class LopHoc {
    @Id
    @Column(name = "MALOPHOC", columnDefinition = "VARCHAR(255)")
    private String maLopHoc;

    @Column(name = "TENLOPHOC", columnDefinition = "VARCHAR(255)")
    private String tenLopHoc;

    @Column(name = "LICHHOC", columnDefinition = "VARCHAR(255)")
    private String lichHoc; // VD: "Thứ 2, 4, 6 - 18:00 đến 20:00"

    @Column(name = "TINHTRANG", columnDefinition = "VARCHAR(255)")
    private String tinhTrang; // "Đang mở đăng ký", "Đã đầy", "Đã kết thúc"

    @Column(name = "NGAYBATDAU", columnDefinition = "DATE")
    private LocalDate ngayBatDau;

    @Column(name = "NGAYKETTHUC", columnDefinition = "DATE")
    private LocalDate ngayKetThuc;

    @Column(name = "THULAO", columnDefinition = "DOUBLE")
    private double thuLao;

    @Column(name = "DATHANHTOAN", columnDefinition = "DOUBLE")
    private double daThanhToan;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MAKHOAHOC")
    private KhoaHoc khoaHoc;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MAPHONGHOC")
    private PhongHoc phongHoc;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MAGIANGVIEN")
    private GiangVien giangVien;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MANHANVIEN")
    private NhanVien nhanVien;

    @Column(name = "GHICHU", columnDefinition = "TEXT")
    private String ghiChu;

    public  LopHoc() {

    }

    public String getMaLopHoc() {
        return maLopHoc;
    }

    public void setMaLopHoc(String maLopHoc) {
        this.maLopHoc = maLopHoc;
    }

    public String getTenLopHoc() {
        return tenLopHoc;
    }

    public void setTenLopHoc(String tenLopHoc) {
        this.tenLopHoc = tenLopHoc;
    }

    public String getLichHoc() {
        return lichHoc;
    }

    public void setLichHoc(String lichHoc) {
        this.lichHoc = lichHoc;
    }

    public String getTinhTrang() {
        return tinhTrang;
    }

    public void setTinhTrang(String tinhTrang) {
        this.tinhTrang = tinhTrang;
    }

    public LocalDate getNgayBatDau() {
        return ngayBatDau;
    }

    public void setNgayBatDau(LocalDate ngayBatDau) {
        this.ngayBatDau = ngayBatDau;
    }

    public LocalDate getNgayKetThuc() {
        return ngayKetThuc;
    }

    public void setNgayKetThuc(LocalDate ngayKetThuc) {
        this.ngayKetThuc = ngayKetThuc;
    }

    public double getThuLao() {
        return thuLao;
    }

    public void setThuLao(double thuLao) {
        this.thuLao = thuLao;
    }

    public double getDaThanhToan() {
        return daThanhToan;
    }

    public void setDaThanhToan(double daThanhToan) {
        this.daThanhToan = daThanhToan;
    }

    public KhoaHoc getKhoaHoc() {
        return khoaHoc;
    }

    public void setKhoaHoc(KhoaHoc khoaHoc) {
        this.khoaHoc = khoaHoc;
    }

    public PhongHoc getPhongHoc() {
        return phongHoc;
    }

    public void setPhongHoc(PhongHoc phongHoc) {
        this.phongHoc = phongHoc;
    }

    public GiangVien getGiangVien() {
        return giangVien;
    }

    public void setGiangVien(GiangVien giangVien) {
        this.giangVien = giangVien;
    }

    public NhanVien getNhanVien() {
        return nhanVien;
    }

    public void setNhanVien(NhanVien nhanVien) {
        this.nhanVien = nhanVien;
    }

    public String getGhiChu() {
        return ghiChu;
    }

    public void setGhiChu(String ghiChu) {
        this.ghiChu = ghiChu;
    }

    @Override
    public String toString() {
        return "LopHoc{" +
                "maLopHoc='" + maLopHoc + '\'' +
                ", tenLopHoc='" + tenLopHoc + '\'' +
                ", lichHoc='" + lichHoc + '\'' +
                ", tinhTrang='" + tinhTrang + '\'' +
                ", ngayBatDau=" + ngayBatDau +
                ", ngayKetThuc=" + ngayKetThuc +
                ", thuLao=" + thuLao +
                ", daThanhToan=" + daThanhToan +
                ", khoaHoc=" + khoaHoc +
                ", phongHoc=" + phongHoc +
                ", giangVien=" + giangVien +
                ", ghiChu='" + ghiChu + '\'' +
                '}';
    }

}
