package com.datn.entity;/*
 * @project team30
 * @author Huy
 */

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "CHITIETLOPHOCS")
@Getter
@Setter
public class ChiTietLopHoc {
    @Id
    private String maCtlh;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "MAHOCVIEN")
    private HocVien hocVien;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "MALOPHOC")
    private LopHoc lopHoc;

    private double hocPhi;
    private double mienGiamHocPhi;
    private boolean daThuHocPhi;
    private double soTienThu;
    private double diem;

    private LocalDate ngayCapChungChi;
    private String xepLoai;
    private String diemDanh;

    @Lob
    private String ghiChu;

}