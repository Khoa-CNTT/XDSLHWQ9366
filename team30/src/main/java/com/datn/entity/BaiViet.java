package com.datn.entity;/*
 * @project team30
 * @author Huy
 */

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "BAIVIETS")
@Getter
@Setter
public class BaiViet {
    @Id
    private String maBaiViet;

    private String tieuDe;
    private String uriHinhAnhMinhHoa;

    @Lob
    private String noiDungTomTat;

    @Lob
    private String noiDung;

    private LocalDate ngayDang;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "NGUOIVIETBAI")
    private NhanVien nhanVien;

    private LocalDate lanCapNhatCuoiCung;
    private int soLuongTruyCap;
    private String menu;
    private boolean trangThai;

}
