package com.datn.entity;/*
 * @project team30
 * @author Huy
 */

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "CHITIETLOPHOCS")
public class ChiTietLopHoc {

    @Id
    @Column(name = "MACTLH", columnDefinition = "VARCHAR(255)")
    private String maCtlh;

    @ManyToOne
    @JoinColumn(name = "MAHOCVIEN")
    private HocVien hocVien;

    @ManyToOne
    @JoinColumn(name = "MALOPHOC")
    private LopHoc lopHoc;

    @Column(name = "HOCPHI")
    private double hocPhi;

    @Column(name = "MIENGIAMHOCPHI")
    private double mienGiamHocPhi;

    @Column(name = "DATHUHOCPHI")
    private boolean daThuHocPhi;

    @Column(name = "SOTIENTHU")
    private double soTienThu;

    @Column(name = "DIEM")
    private double diem;

    @Column(name = "NGAYCAPCHUNGCHI")
    private LocalDate ngayCapChungChi;

    @Column(name = "XEPLOAI", columnDefinition = "VARCHAR(255)")
    private String xepLoai;

    @Column(name = "DIEMDANH", columnDefinition = "VARCHAR(255)")
    private String diemDanh;

    @Column(name = "GHICHU", columnDefinition = "TEXT")
    private String ghiChu;

    public  ChiTietLopHoc() {

    }

    public String getMaCtlh() {
        return maCtlh;
    }

    public void setMaCtlh(String maCtlh) {
        this.maCtlh = maCtlh;
    }

    public HocVien getHocVien() {
        return hocVien;
    }

    public void setHocVien(HocVien hocVien) {
        this.hocVien = hocVien;
    }

    public LopHoc getLopHoc() {
        return lopHoc;
    }

    public void setLopHoc(LopHoc lopHoc) {
        this.lopHoc = lopHoc;
    }

    public double getHocPhi() {
        return hocPhi;
    }

    public void setHocPhi(double hocPhi) {
        this.hocPhi = hocPhi;
    }

    public double getMienGiamHocPhi() {
        return mienGiamHocPhi;
    }

    public void setMienGiamHocPhi(double mienGiamHocPhi) {
        this.mienGiamHocPhi = mienGiamHocPhi;
    }

    public boolean isDaThuHocPhi() {
        return daThuHocPhi;
    }

    public void setDaThuHocPhi(boolean daThuHocPhi) {
        this.daThuHocPhi = daThuHocPhi;
    }

    public double getSoTienThu() {
        return soTienThu;
    }

    public void setSoTienThu(double soTienThu) {
        this.soTienThu = soTienThu;
    }

    public double getDiem() {
        return diem;
    }

    public void setDiem(double diem) {
        this.diem = diem;
    }

    public LocalDate getNgayCapChungChi() {
        return ngayCapChungChi;
    }

    public void setNgayCapChungChi(LocalDate ngayCapChungChi) {
        this.ngayCapChungChi = ngayCapChungChi;
    }

    public String getXepLoai() {
        return xepLoai;
    }

    public void setXepLoai(String xepLoai) {
        this.xepLoai = xepLoai;
    }

    public String getDiemDanh() {
        return diemDanh;
    }

    public void setDiemDanh(String diemDanh) {
        this.diemDanh = diemDanh;
    }

    public String getGhiChu() {
        return ghiChu;
    }

    public void setGhiChu(String ghiChu) {
        this.ghiChu = ghiChu;
    }
}