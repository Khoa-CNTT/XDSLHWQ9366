package com.datn.entity;/*
 * @project team30
 * @author Huy
 */

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "THISINHDUTHIS")
@Getter
@Setter
public class ThiSinhDuThi {
    @Id
    @Column(name = "MATHISINHDUTHI", columnDefinition = "VARCHAR(255)")
    private String maThiSinhDuThi;

    @Column(name = "TENTHISINHDUTHI", columnDefinition = "VARCHAR(255)")
    private String tenThiSinhDuThi;

    @Column(name = "NGAYSINH", columnDefinition = "DATE")
    private LocalDate ngaySinh;

    @Column(name = "GIOITINH", columnDefinition = "TINYINT")
    private boolean gioiTinh;

    @Column(name = "SOCMND", columnDefinition = "VARCHAR(255)")
    private String soCMND;

    @Column(name = "SODIENTHOAI", columnDefinition = "VARCHAR(255)")
    private String soDienThoai;

    @Column(name = "EMAIL", columnDefinition = "VARCHAR(255)")
    private String email;

    @Column(name = "DIACHI", columnDefinition = "VARCHAR(255)")
    private String diaChi;

    @Column(name = "DIENDANGKY", columnDefinition = "VARCHAR(255)")
    private String dienDangKy;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "MALICHTHI")
    private LichThi lichThi;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "MAPHONGTHI")
    private PhongHoc phongThi;

    @Column(name = "DIEM", columnDefinition = "DOUBLE")
    private double diem;

    @Column(name = "XEPLOAI", columnDefinition = "VARCHAR(255)")
    private String xepLoai;

    @Column(name = "NGAYCAPCHUNGCHI", columnDefinition = "DATE")
    private LocalDate ngayCapChungChi;

    @Lob
    @Column(name = "GHICHU", columnDefinition = "TEXT")
    private String ghiChu;

    @Column(name = "URLHINHDAIDIEN", columnDefinition = "VARCHAR(255)")
    private String urlHinhDaiDien;

}
