package com.datn.dto.request;

import java.time.LocalDate;

public class LienHeUpdateDTO {

    private String maKhach; // dùng để xác định bản ghi cần cập nhật

    private String hoTen;
    private String email;
    private String soDienThoai;
    private String yKien;
    private LocalDate ngayLienHe;

    // Getters and Setters
    public String getMaKhach() {
        return maKhach;
    }

    public void setMaKhach(String maKhach) {
        this.maKhach = maKhach;
    }

    public String getHoTen() {
        return hoTen;
    }

    public void setHoTen(String hoTen) {
        this.hoTen = hoTen;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSoDienThoai() {
        return soDienThoai;
    }

    public void setSoDienThoai(String soDienThoai) {
        this.soDienThoai = soDienThoai;
    }

    public String getYKien() {
        return yKien;
    }

    public void setYKien(String yKien) {
        this.yKien = yKien;
    }

    public LocalDate getNgayLienHe() {
        return ngayLienHe;
    }

    public void setNgayLienHe(LocalDate ngayLienHe) {
        this.ngayLienHe = ngayLienHe;
    }
}
