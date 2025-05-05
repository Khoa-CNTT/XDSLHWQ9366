package com.datn.dto.request;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public class LopHocAddDTO {

    @NotBlank(message = "Tên lớp học không được để trống")
    @Size(min = 5, max = 255, message = "Tên lớp học phải có độ dài từ 5 đến 255 ký tự")
    private String tenLopHoc;

    @NotBlank(message = "Lịch học không được để trống")
    @Size(min = 5, max = 255, message = "Lịch học phải có độ dài từ 5 đến 255 ký tự")
    private String lichHoc; // VD: "Thứ 2, 4, 6 - 18:00 đến 20:00"

    @Pattern(regexp = "Đang mở đăng ký|Đã đầy|Đã kết thúc",
            message = "Tình trạng phải là 'Đang mở đăng ký', 'Đã đầy' hoặc 'Đã kết thúc'")
    private String tinhTrang;

    @Future(message = "Ngày bắt đầu phải lớn hơn ngày hiện tại")
    private LocalDate ngayBatDau;

    @Future(message = "Ngày kết thúc phải lớn hơn ngày hiện tại")
    private LocalDate ngayKetThuc;

    @Min(value = 1, message = "Số tiền thù lao dành cho giảng viên phải lớn hơn 0")
    private double thuLao; // Số tiền thù lao dành cho giảng viên.

    @Min(value = 0, message = "Số tiền đã thanh toán cho giảng viên không được âm")
    private double daThanhToan; // Số tiền đã thanh toán cho giảng viên.

    @NotNull(message = "Mã khóa học không được để trống")
    private String maKhoaHoc;

    @NotNull(message = "Mã phòng học không được để trống")
    private String maPhongHoc;

    @NotNull(message = "Mã giảng viên không được để trống")
    private String maGiangVien;

    @Size(min = 5, max = 255, message = "Ghi chú phải có độ dài từ 5 đến 255 ký tự")
    private String ghiChu;

    public LopHocAddDTO() {

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

    public String getMaKhoaHoc() {
        return maKhoaHoc;
    }

    public void setMaKhoaHoc(String maKhoaHoc) {
        this.maKhoaHoc = maKhoaHoc;
    }

    public String getMaPhongHoc() {
        return maPhongHoc;
    }

    public void setMaPhongHoc(String maPhongHoc) {
        this.maPhongHoc = maPhongHoc;
    }

    public String getMaGiangVien() {
        return maGiangVien;
    }

    public void setMaGiangVien(String maGiangVien) {
        this.maGiangVien = maGiangVien;
    }

    public String getGhiChu() {
        return ghiChu;
    }

    public void setGhiChu(String ghiChu) {
        this.ghiChu = ghiChu;
    }

}
