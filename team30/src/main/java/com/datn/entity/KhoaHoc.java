package com.datn.entity;/*
 * @project team30
 * @author Huy
 */

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;


@Entity
@Table(name = "KHOAHOCS")
@Getter
@Setter
public class KhoaHoc {
    @Id
    private String maKhoaHoc;

    private String tenKhoaHoc;
    private String maLinHVuc;
    private Integer soBuoi;
    private BigDecimal hocPhi;

    @Lob
    private String noiDungTomTatKhoaHoc;

    @Lob
    private String noiDungKhoaHoc;

    @Lob
    private String ghiChu;

}
