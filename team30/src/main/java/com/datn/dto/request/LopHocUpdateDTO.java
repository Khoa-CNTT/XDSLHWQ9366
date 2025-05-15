package com.datn.dto.request;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public class LopHocUpdateDTO {

    @NotBlank(message = "Tên lớp học không được để trống")
    @Size(min = 5, max = 255, message = "Tên lớp học phải có độ dài từ 5 đến 255 ký tự")
    private String tenLopHoc;

    @NotBlank(message = "Lịch học không được để trống")
    private String lichHoc;

    @NotBlank(message = "Tình trạng không được để trống")
    @Pattern(regexp = "Đang mở đăng ký|Đã đầy|Đã kết thúc", message = "Tình trạng phải là 'Đang mở đăng ký', 'Đã đầy' hoặc 'Đã kết thúc'")
    private String tinhTrang;

    @Future(message = "Ngày bắt đầu phải lớn hơn ngày hiện tại")
    private LocalDate ngayBatDau;

    @Future(message = "Ngày kết thúc phải sau ngày bắt đầu")
    private LocalDate ngayKetThuc;

    @Min(value = 0, message = "Thù lao không được âm")
    private Double thuLao;

    @Min(value = 0, message = "Số tiền đã thanh toán không được âm")
    private Double daThanhToan;

    private String ghiChu;

    @NotNull(message = "Mã phòng học không được để trống")
    private String maPhongHoc;

    @NotNull(message = "Mã giảng viên không được để trống")
    private String maGiangVien;

    public LopHocUpdateDTO() {

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

    public Double getThuLao() {
        return thuLao;
    }

    public void setThuLao(Double thuLao) {
        this.thuLao = thuLao;
    }

    public Double getDaThanhToan() {
        return daThanhToan;
    }

    public void setDaThanhToan(Double daThanhToan) {
        this.daThanhToan = daThanhToan;
    }

    public String getGhiChu() {
        return ghiChu;
    }

    public void setGhiChu(String ghiChu) {
        this.ghiChu = ghiChu;
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

}
