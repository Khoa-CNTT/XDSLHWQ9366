package com.datn.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.time.LocalDate;

public class LienHeAddDTO implements Serializable {
    private String hoTen;
    private String email;
    private String soDienThoai;

    @JsonProperty("yKien")
    private String yKien;
    private LocalDate ngayLienHe;

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
