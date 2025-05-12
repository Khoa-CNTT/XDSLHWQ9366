package com.datn.dto.request;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public class ThiSinhDuThiUpdateDTO {

    @Size(max = 255, min = 5, message = "Tên thí sinh phải có độ dài từ 5 đến 255 ký tự")
    private String tenThiSinhDuThi;

    @Past(message = "Ngày sinh phải là ngày trong quá khứ")
    private LocalDate ngaySinh;

    private Boolean gioiTinh;

    @NotBlank(message = "Số CMND không được để trống")
    @Size(min = 9, max = 9, message = "Số CMND phải có đúng 9 ký tự")
    private String soCMND;

    @NotBlank(message = "Số điện thoại không được để trống")
    @Pattern(regexp = "\\d{10}", message = "Số điện thoại phải có đúng 10 chữ số")
    private String soDienThoai;

    @Email(message = "Email không hợp lệ")
    private String email;

    @Size(min = 5, max = 255, message = "Địa chỉ phải có độ dài từ 5 đến 255 ký tự")
    private String diaChi;

    @Pattern(regexp = "ONLINE|TRUCTIEP", message = "Diện đăng ký chỉ được là ONLINE hoặc TRUCTIEP")
    private String dienDangKy;

    @NotBlank(message = "Mã lịch thi không được để trống")
    private String maLichThi;

    @NotBlank(message = "Mã phòng thi không được để trống")
    private String maPhongThi;

    @DecimalMin(value = "0.0", message = "Điểm phải lớn hơn hoặc bằng 0")
    @DecimalMax(value = "10.0", message = "Điểm phải nhỏ hơn hoặc bằng 10")
    private Double diem;

    @Size(max = 255, message = "Xếp loại không được vượt quá 255 ký tự")
    private String xepLoai;

    private LocalDate ngayCapChungChi;

    private String ghiChu;

//    @Size(max = 255, message = "URL hình đại diện không được vượt quá 255 ký tự")
//    private String urlHinhDaiDien;

    public ThiSinhDuThiUpdateDTO() {

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

    public Boolean getGioiTinh() {
        return gioiTinh;
    }

    public void setGioiTinh(Boolean gioiTinh) {
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

    public String getMaLichThi() {
        return maLichThi;
    }

    public void setMaLichThi(String maLichThi) {
        this.maLichThi = maLichThi;
    }

    public String getMaPhongThi() {
        return maPhongThi;
    }

    public void setMaPhongThi(String maPhongThi) {
        this.maPhongThi = maPhongThi;
    }

    public Double getDiem() {
        return diem;
    }

    public void setDiem(Double diem) {
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

//    public String getUrlHinhDaiDien() {
//        return urlHinhDaiDien;
//    }
//
//    public void setUrlHinhDaiDien(String urlHinhDaiDien) {
//        this.urlHinhDaiDien = urlHinhDaiDien;
//    }

}
