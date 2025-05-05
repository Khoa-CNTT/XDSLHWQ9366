package com.datn.entity;/*
 * @project team30
 * @author Huy
 */

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "PHIEUCHIS")
@Getter
@Setter
public class PhieuChi {
    @Id
    private String maPhieuChi;

    @Lob
    private String noiDung;

    private BigDecimal soTien;

    private LocalDate ngayChi;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "MAKETOANVIEN")
    private NhanVienKeToan nhanVienKeToan;

    private String nguoiNhan;
    private String diaChi;

    @Lob
    private String ghiChu;

}
