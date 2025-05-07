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

    public String getMaPhongHoc() {
        return maPhongHoc;
    }

    public void setMaPhongHoc(String maPhongHoc) {
        this.maPhongHoc = maPhongHoc;
    }

    public String getTenPhongHoc() {
        return tenPhongHoc;
    }

    public void setTenPhongHoc(String tenPhongHoc) {
        this.tenPhongHoc = tenPhongHoc;
    }

    public int getSoChoNgoi() {
        return soChoNgoi;
    }

    public void setSoChoNgoi(int soChoNgoi) {
        this.soChoNgoi = soChoNgoi;
    }

    public String getGhiChu() {
        return ghiChu;
    }

    public void setGhiChu(String ghiChu) {
        this.ghiChu = ghiChu;
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