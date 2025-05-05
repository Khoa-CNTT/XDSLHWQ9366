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
@Table(name = "PHIEUTHUS")
@Getter
@Setter
public class PhieuThu {
    @Id
    private String maPhieuThu;

    @Lob
    private String noiDung;

    private BigDecimal soTien;

    private LocalDate ngayThu;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "MAKETOANVIEN")
    private NhanVienKeToan nhanVienKeToan;

    private String nguoiNop;
    private String diaChi;

    @Lob
    private String ghiChu;

}
