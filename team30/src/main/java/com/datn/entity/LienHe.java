package com.datn.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "LIENHES")
public class LienHe {

    @Id
    @Column(name = "MAKHACH", length = 255)
    private String maKhach;

    @Column(name = "HOTEN", length = 255)
    private String hoTen;

    @Column(name = "EMAIL", length = 255)
    private String email;

    @Column(name = "SODIENTHOAI", length = 255)
    private String soDienThoai;

    @Lob
    @Column(name = "YKIEN", columnDefinition = "TEXT")
    private String yKien;

    @Column(name = "NGAYLIENHE")
    private LocalDate ngayLienHe;

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
