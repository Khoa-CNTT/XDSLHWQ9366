package com.datn.dto.request;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public class GiangVienAddDTO {

    @NotBlank(message = "Tên giảng viên không được để trống")
    @Size(min = 5, max = 255, message = "Tên giảng viên phải có độ dài từ 5 đến 255 ký tự")
    private String tenGiangVien;

    @NotNull(message = "Ngày sinh không được để trống")
    @Past(message = "Ngày sinh phải nhỏ hơn ngày hiện tại")
    private LocalDate ngaySinh;

    private boolean gioiTinh;

    @NotBlank(message = "Số CMND không được để trống")
    @Size(min = 9, max = 9, message = "Số CMND phải có đúng 9 ký tự")
    private String soCMND;

    @NotBlank(message = "Số điện thoại không được để trống")
    @Pattern(regexp = "\\d{10}", message = "Số điện thoại phải có đúng 10 chữ số")
    private String soDienThoai;

    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không đúng định dạng")
    private String email;

    @Size(min = 5, max = 255, message = "Địa chỉ phải có độ dài từ 5 đến 255 ký tự")
    private String diaChi;

    @Size(min = 5, max = 255, message = "Cơ quan công tác phải có độ dài từ 5 đến 255 ký tự")
    private String coQuanCongTac;

    @Size(min = 5, max = 255, message = "Ghi chú phải có độ dài từ 5 đến 255 ký tự")
    private String ghiChu;

    @NotBlank(message = "Mã lĩnh vực không được để trống")
    private String maLinhVuc;

    private String urlHinhDaiDien;

    @Pattern(regexp = "Đang giảng dạy|Đã nghỉ", message = "Trạng thái phải là 'Đang giảng dạy' hoặc 'Đã nghỉ'")
    private String tinhTrangCongTac;

    public GiangVienAddDTO() {

    }

    public GiangVienAddDTO(String tenGiangVien, LocalDate ngaySinh, boolean gioiTinh, String soCMND, String soDienThoai, String email, String diaChi, String coQuanCongTac, String ghiChu, String maLinhVuc, String urlHinhDaiDien, String tinhTrangCongTac) {
        this.tenGiangVien = tenGiangVien;
        this.ngaySinh = ngaySinh;
        this.gioiTinh = gioiTinh;
        this.soCMND = soCMND;
        this.soDienThoai = soDienThoai;
        this.email = email;
        this.diaChi = diaChi;
        this.coQuanCongTac = coQuanCongTac;
        this.ghiChu = ghiChu;
        this.maLinhVuc = maLinhVuc;
        this.urlHinhDaiDien = urlHinhDaiDien;
        this.tinhTrangCongTac = tinhTrangCongTac;
    }

    public String getTenGiangVien() {
        return tenGiangVien;
    }

    public void setTenGiangVien(String tenGiangVien) {
        this.tenGiangVien = tenGiangVien;
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

    public String getCoQuanCongTac() {
        return coQuanCongTac;
    }

    public void setCoQuanCongTac(String coQuanCongTac) {
        this.coQuanCongTac = coQuanCongTac;
    }

    public String getGhiChu() {
        return ghiChu;
    }

    public void setGhiChu(String ghiChu) {
        this.ghiChu = ghiChu;
    }

    public String getMaLinhVuc() {
        return maLinhVuc;
    }

    public void setMaLinhVuc(String maLinhVuc) {
        this.maLinhVuc = maLinhVuc;
    }

    public String getUrlHinhDaiDien() {
        return urlHinhDaiDien;
    }

    public void setUrlHinhDaiDien(String urlHinhDaiDien) {
        this.urlHinhDaiDien = urlHinhDaiDien;
    }

    public String getTinhTrangCongTac() {
        return tinhTrangCongTac;
    }

    public void setTinhTrangCongTac(String tinhTrangCongTac) {
        this.tinhTrangCongTac = tinhTrangCongTac;
    }

}
