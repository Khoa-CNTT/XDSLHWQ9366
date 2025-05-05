package com.datn.entity;/*
 * @project team30
 * @author Huy
 */

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "TAIKHOANS")
@Getter
@Setter
public class TaiKhoan {
    @Id
    private String maTaiKhoan;

    private String tenTaiKhoan;
    private String matKhau;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "MANHANVIEN")
    private NhanVien nhanVien;

    private String quyenTruyCap;

    @Lob
    private String ghiChu;

}