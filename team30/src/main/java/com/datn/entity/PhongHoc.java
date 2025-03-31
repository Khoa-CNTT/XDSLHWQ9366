package com.datn.entity;/*
 * @project team30
 * @author Huy
 */

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "PHONGHOCS")
@Getter
@Setter
public class PhongHoc {
    @Id
    @Column(name = "MAPHONGHOC")
    private String maPhongHoc;

    @Column(name = "TENPHONGHOC", columnDefinition = "VARCHAR(255)")
    private String tenPhongHoc;

    @Column(name = "SOCHONGOI")
    private int soChoNgoi;

    @Lob
    @Column(name = "GHICHU")
    private String ghiChu;

}