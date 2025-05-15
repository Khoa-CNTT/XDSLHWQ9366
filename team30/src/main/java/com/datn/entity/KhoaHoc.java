package com.datn.entity;/*
 * @project team30
 * @author Huy
 */

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;


@Entity
@Table(name = "KHOAHOCS")
public class KhoaHoc {
    @Id
    @Column(name = "MAKHOAHOC", columnDefinition = "VARCHAR(255)")
    @JsonIgnore
    private String maKhoaHoc;

    @Column(name = "TENKHOAHOC", columnDefinition = "VARCHAR(255)")
    private String tenKhoaHoc;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "MALINHVUC", nullable = true, foreignKey = @ForeignKey(name = "FK_KHOAHOCS_LINHVUCS"))
    public LinhVuc linhVuc;

    @Column(name = "SOBUOI", columnDefinition = "INT")
    private Integer soBuoi;

    @Column(name = "HOCPHI", columnDefinition = "DOUBLE")
    private Double hocPhi;

    @Column(name = "NOIDUNGTOMTATKHOAHOC", columnDefinition = "TEXT")
    private String noiDungTomTatKhoaHoc;

    @Column(name = "NOIDUNGKHOAHOC", columnDefinition = "TEXT")
    private String noiDungKhoaHoc;

    @Column(name = "GHICHU", columnDefinition = "TEXT")
    private String ghiChu;

    public KhoaHoc() {

    }

    public String getMaKhoaHoc() {
        return maKhoaHoc;
    }

    public void setMaKhoaHoc(String maKhoaHoc) {
        this.maKhoaHoc = maKhoaHoc;
    }

    public String getTenKhoaHoc() {
        return tenKhoaHoc;
    }

    public void setTenKhoaHoc(String tenKhoaHoc) {
        this.tenKhoaHoc = tenKhoaHoc;
    }

    public LinhVuc getLinhVuc() {
        return linhVuc;
    }

    public void setLinhVuc(LinhVuc linhVuc) {
        this.linhVuc = linhVuc;
    }

    public Integer getSoBuoi() {
        return soBuoi;
    }

    public void setSoBuoi(Integer soBuoi) {
        this.soBuoi = soBuoi;
    }

    public Double getHocPhi() {
        return hocPhi;
    }

    public void setHocPhi(Double hocPhi) {
        this.hocPhi = hocPhi;
    }

    public String getNoiDungTomTatKhoaHoc() {
        return noiDungTomTatKhoaHoc;
    }

    public void setNoiDungTomTatKhoaHoc(String noiDungTomTatKhoaHoc) {
        this.noiDungTomTatKhoaHoc = noiDungTomTatKhoaHoc;
    }

    public String getNoiDungKhoaHoc() {
        return noiDungKhoaHoc;
    }

    public void setNoiDungKhoaHoc(String noiDungKhoaHoc) {
        this.noiDungKhoaHoc = noiDungKhoaHoc;
    }

    public String getGhiChu() {
        return ghiChu;
    }

    public void setGhiChu(String ghiChu) {
        this.ghiChu = ghiChu;
    }

    @Override
    public String toString() {
        return "KhoaHoc{" +
                "maKhoaHoc='" + maKhoaHoc + '\'' +
                ", tenKhoaHoc='" + tenKhoaHoc + '\'' +
                ", linhVuc=" + linhVuc +
                ", soBuoi=" + soBuoi +
                ", hocPhi=" + hocPhi +
                ", noiDungTomTatKhoaHoc='" + noiDungTomTatKhoaHoc + '\'' +
                ", noiDungKhoaHoc='" + noiDungKhoaHoc + '\'' +
                ", ghiChu='" + ghiChu + '\'' +
                '}';
    }

}
