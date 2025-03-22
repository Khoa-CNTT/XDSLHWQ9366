package com.datn.entity;/*
 * @project team30
 * @author Huy
 */

import jakarta.persistence.*;

@Entity
@Table(name = "PHONGHOCS")
public class PhongHoc {
    @Id
    @Column(name = "MAPHONGHOC")
    private String maPhongHoc;

    @Column(name = "TENPHONGHOC", columnDefinition = "VARCHAR(255)")
    private String tenPhongHoc;

    @Column(name = "SOCHONGOI", columnDefinition = "INT")
    private int soChoNgoi;

    @Column(name = "GHICHU", columnDefinition = "TEXT")
    private String ghiChu;

    public PhongHoc() {

    }

    public String maPhongHoc() {
        return maPhongHoc;
    }

    public PhongHoc setMaPhongHoc(String maPhongHoc) {
        this.maPhongHoc = maPhongHoc;
        return this;
    }

    public String tenPhongHoc() {
        return tenPhongHoc;
    }

    public PhongHoc setTenPhongHoc(String tenPhongHoc) {
        this.tenPhongHoc = tenPhongHoc;
        return this;
    }

    public int soChoNgoi() {
        return soChoNgoi;
    }

    public PhongHoc setSoChoNgoi(int soChoNgoi) {
        this.soChoNgoi = soChoNgoi;
        return this;
    }

    public String ghiChu() {
        return ghiChu;
    }

    public PhongHoc setGhiChu(String ghiChu) {
        this.ghiChu = ghiChu;
        return this;
    }

    @Override
    public String toString() {
        return "PhongHoc{" +
                "maPhongHoc='" + maPhongHoc + '\'' +
                ", tenPhongHoc='" + tenPhongHoc + '\'' +
                ", soChoNgoi=" + soChoNgoi +
                ", ghiChu='" + ghiChu + '\'' +
                '}';
    }

}