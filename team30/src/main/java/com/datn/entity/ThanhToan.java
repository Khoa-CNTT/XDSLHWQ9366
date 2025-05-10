package com.datn.entity;/*
 * @project team30
 * @author Huy
 */

import com.datn.utils.LoaiGiaoDich;
import com.datn.utils.PhuongThucThanhToan;
import com.datn.utils.TrangThaiThanhToan;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;


@Entity
@Table(name = "THANHTOANS")
public class ThanhToan {

    @Id
    @Column(name = "MAGIAODICH")
    private String maGiaoDich;

    @Enumerated(EnumType.STRING)
    @Column(name = "LOAIGIAODICH")
    private LoaiGiaoDich loaiGiaoDich;

    @Column(name = "SOTIEN")
    private Double soTien;

    @Column(name = "NGAYTHUCHIEN")
    private LocalDate ngayThucHien;

    // ===== Quan hệ với HOCVIENS (MAHOCVIEN -> MATAIKHOAN)
    @ManyToOne
    @JoinColumn(name = "MAHOCVIEN")
    @JsonIgnore
    private HocVien hocVien;

    // ===== Quan hệ với KHOAHOCS (MAKHOAHOC)
    @ManyToOne
    @JoinColumn(name = "MAKHOAHOC")
    @JsonIgnore
    private KhoaHoc khoaHoc;

    @Enumerated(EnumType.STRING)
    @Column(name = "PHUONGTHUCTHANHTOAN")
    private PhuongThucThanhToan phuongThucThanhToan;

    @Enumerated(EnumType.STRING)
    @Column(name = "TRANGTHAI")
    private TrangThaiThanhToan trangThai = TrangThaiThanhToan.CHO_XU_LY;

    @Column(name = "MOTA")
    private String moTa;

    // ===== Quan hệ với NHANVIENS (NGUOITAO -> MANHANVIEN)
    @ManyToOne
    @JoinColumn(name = "NGUOITAO")
    @JsonIgnore
    private NhanVien nguoiTao;

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

    public HocVien getHocVien() {
        return hocVien;
    }

    public void setHocVien(HocVien hocVien) {
        this.hocVien = hocVien;
    }

    public KhoaHoc getKhoaHoc() {
        return khoaHoc;
    }

    public void setKhoaHoc(KhoaHoc khoaHoc) {
        this.khoaHoc = khoaHoc;
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

    public NhanVien getNguoiTao() {
        return nguoiTao;
    }

    public void setNguoiTao(NhanVien nguoiTao) {
        this.nguoiTao = nguoiTao;
    }
}


