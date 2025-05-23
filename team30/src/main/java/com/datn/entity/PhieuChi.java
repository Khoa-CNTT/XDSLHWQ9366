package com.datn.entity;

/*
 * @project team30
 * @author Huy
 */

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "PHIEUCHIS")
public class PhieuChi {

    @Id
    @Column(name = "MAPHIEUCHI", length = 255)
    private String maPhieuChi;

    @Lob
    @Column(name = "NOIDUNG", columnDefinition = "TEXT")
    private String noiDung;

    @Column(name = "SOTIEN")
    private BigDecimal soTien;

    @Column(name = "NGAYCHI")
    private LocalDate ngayChi;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MAKETOANVIEN")
    private NhanVienKeToan nhanVienKeToan;

    @Column(name = "NGUOINHAN", length = 255)
    private String nguoiNhan;

    @Column(name = "DIACHI", length = 255)
    private String diaChi;

    @Lob
    @Column(name = "GHICHU", columnDefinition = "TEXT")
    private String ghiChu;

    public String getMaPhieuChi() {
        return maPhieuChi;
    }

    public void setMaPhieuChi(String maPhieuChi) {
        this.maPhieuChi = maPhieuChi;
    }

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

    public LocalDate getNgayChi() {
        return ngayChi;
    }

    public void setNgayChi(LocalDate ngayChi) {
        this.ngayChi = ngayChi;
    }

    public NhanVienKeToan getNhanVienKeToan() {
        return nhanVienKeToan;
    }

    public void setNhanVienKeToan(NhanVienKeToan nhanVienKeToan) {
        this.nhanVienKeToan = nhanVienKeToan;
    }

    public String getNguoiNhan() {
        return nguoiNhan;
    }

    public void setNguoiNhan(String nguoiNhan) {
        this.nguoiNhan = nguoiNhan;
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
