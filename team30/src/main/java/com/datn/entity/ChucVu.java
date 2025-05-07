package com.datn.entity;/*
 * @project team30
 * @author Huy
 */

import jakarta.persistence.*;

@Entity
@Table(name = "CHUCVUS")
public class ChucVu {
    @Id
    @Column(name = "MACHUCVU")
    private String maChucVu;

    @Column(name = "TENCHUCVU")
    private String tenChucVu;

    @Column(name = "TRANGTHAI")
    private boolean trangThai;

    public ChucVu() {

    }

    public String getMaChucVu() {
        return maChucVu;
    }

    public void setMaChucVu(String maChucVu) {
        this.maChucVu = maChucVu;
    }

    public String getTenChucVu() {
        return tenChucVu;
    }

    public void setTenChucVu(String tenChucVu) {
        this.tenChucVu = tenChucVu;
    }

    public boolean isTrangThai() {
        return trangThai;
    }

    public void setTrangThai(boolean trangThai) {
        this.trangThai = trangThai;
    }

}