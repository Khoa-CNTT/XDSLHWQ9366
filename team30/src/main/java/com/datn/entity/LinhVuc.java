package com.datn.entity;/*
 * @project team30
 * @author Huy
 */

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "LINHVUCS")
public class LinhVuc {
    @Id
    @Column(name = "MALINHVUC")
    private String maLinhVuc;

    @Column(name = "TENLINHVUC", columnDefinition = "VARCHAR(255)")
    private String tenLinhVuc;

    @OneToMany(mappedBy = "linhVuc", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<LichThi> danhSachLichThi;

    public String getMaLinhVuc() {
        return maLinhVuc;
    }

    public void setMaLinhVuc(String maLinhVuc) {
        this.maLinhVuc = maLinhVuc;
    }

    public String getTenLinhVuc() {
        return tenLinhVuc;
    }

    public void setTenLinhVuc(String tenLinhVuc) {
        this.tenLinhVuc = tenLinhVuc;
    }

    public List<LichThi> getDanhSachLichThi() {
        return danhSachLichThi;
    }

    public void setDanhSachLichThi(List<LichThi> danhSachLichThi) {
        this.danhSachLichThi = danhSachLichThi;
    }
}