package com.datn.dto.request;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public class NhanVienAddDTO {

    @NotBlank(message = "Tên nhân viên không được để trống")
    @Size(min = 5, max = 255, message = "Tên nhân viên phải có độ dài từ 5 đến 255 ký tự")
    private String tenNhanVien;

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

    private String diaChi;

    @NotBlank(message = "Mã chức vụ không được để trống")
    private String maChucVu; // truyền string rồi get object sau
    private String nguoiNhapThongTin;
    private String ghiChu;
    private String uriHinhDaiDien;

    public NhanVienAddDTO() {

    }

    public NhanVienAddDTO(String tenNhanVien, LocalDate ngaySinh, boolean gioiTinh,
                          String soCMND, String soDienThoai, String email, String diaChi,
                          String maChucVu, String nguoiNhapThongTin, String ghiChu,
                          String uriHinhDaiDien) {
        this.tenNhanVien = tenNhanVien;
        this.ngaySinh = ngaySinh;
        this.gioiTinh = gioiTinh;
        this.soCMND = soCMND;
        this.soDienThoai = soDienThoai;
        this.email = email;
        this.diaChi = diaChi;
        this.maChucVu = maChucVu;
        this.nguoiNhapThongTin = nguoiNhapThongTin;
        this.ghiChu = ghiChu;
        this.uriHinhDaiDien = uriHinhDaiDien;
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

    public String getMaChucVu() {
        return maChucVu;
    }

    public void setMaChucVu(String maChucVu) {
        this.maChucVu = maChucVu;
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
