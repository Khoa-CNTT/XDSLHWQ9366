package com.datn.entity;/*
 * @project team30
 * @author Huy
 */

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "LICHTHIS")
public class LichThi {
    @Id
    @Column(name = "MALICHTHI")
    private String maLichThi;

    @ManyToOne(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinColumn(name = "MALINHVUC") // foreign key
    @JsonManagedReference
    private LinhVuc linhVuc;

    @Column(name = "TENCHUNGCHI")
    private String tenChungChi;

    @Column(name = "NGAYTHI")
    private LocalDate ngayThi;

    @Lob
    @Column(name = "THONGTINCHITIET")
    private String thongTinChiTiet;

    @Column(name = "LEPHITHI")
    private double lePhiThi;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "lichThi")
    private List<ThiSinhDuThi> thiSinhDuThi;


    public String getMaLichThi() {
        return maLichThi;
    }

    public void setMaLichThi(String maLichThi) {
        this.maLichThi = maLichThi;
    }

    public LinhVuc getLinhVuc() {
        return linhVuc;
    }

    public void setLinhVuc(LinhVuc linhVuc) {
        this.linhVuc = linhVuc;
    }

    public String getTenChungChi() {
        return tenChungChi;
    }

    public void setTenChungChi(String tenChungChi) {
        this.tenChungChi = tenChungChi;
    }

    public LocalDate getNgayThi() {
        return ngayThi;
    }

    public void setNgayThi(LocalDate ngayThi) {
        this.ngayThi = ngayThi;
    }

    public String getThongTinChiTiet() {
        return thongTinChiTiet;
    }

    public void setThongTinChiTiet(String thongTinChiTiet) {
        this.thongTinChiTiet = thongTinChiTiet;
    }

    public double getLePhiThi() {
        return lePhiThi;
    }

    public void setLePhiThi(double lePhiThi) {
        this.lePhiThi = lePhiThi;
    }

    public List<ThiSinhDuThi> getThiSinhDuThi() {
        return thiSinhDuThi;
    }

    public void setThiSinhDuThi(List<ThiSinhDuThi> thiSinhDuThi) {
        this.thiSinhDuThi = thiSinhDuThi;
    }
}
