package com.datn.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

@Entity
@Table(name = "BAIVIETS")
public class BaiViet {

    @Id
    @Column(name = "MABAIVIET", length = 255, nullable = false)
    @NotBlank(message = "Mã bài viết không được để trống")
    private String maBaiViet;

    @Column(name = "TIEUDE", length = 255, nullable = false)
    @NotBlank(message = "Tiêu đề không được để trống")
    @Size(max = 255, message = "Tiêu đề không được vượt quá 255 ký tự")
    private String tieuDe;

    @Column(name = "URIHINHANHMINHHOA", length = 255, nullable = false)
    @NotBlank(message = "URI hình ảnh minh họa không được để trống")
    @Size(max = 255, message = "URI hình ảnh minh họa không được vượt quá 255 ký tự")
    private String uriHinhAnhMinhHoa;

    @Lob
    @Column(name = "NOIDUNGTOMTAT", nullable = false)
    @NotBlank(message = "Nội dung tóm tắt không được để trống")
    private String noiDungTomTat;

    @Lob
    @Column(name = "NOIDUNG", nullable = false)
    @NotBlank(message = "Nội dung không được để trống")
    private String noiDung;

    @Column(name = "NGAYDANG", nullable = false)
    @NotNull(message = "Ngày đăng không được để trống")
    @FutureOrPresent(message = "Ngày đăng phải là ngày hiện tại hoặc trong tương lai")
    private LocalDate ngayDang;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "NGUOIVIETBAI", nullable = false)
    @NotNull(message = "Nhân viên viết bài không được để trống")
    private NhanVien nhanVien;

    @Column(name = "LANCAPNHATCUOICUNG")
    private LocalDate lanCapNhatCuoiCung;

    @Column(name = "SOLUONGTRUYCAP", nullable = false)
    @Min(value = 0, message = "Số lượng truy cập phải lớn hơn hoặc bằng 0")
    private int soLuongTruyCap;

    @Column(name = "MENU", length = 255, nullable = false)
    @NotBlank(message = "Menu không được để trống")
    @Size(max = 255, message = "Menu không được vượt quá 255 ký tự")
    private String menu;

    @Column(name = "TRANGTHAI", nullable = false)
    @NotNull(message = "Trạng thái không được để trống")
    private boolean trangThai;

    // Default constructor
    public BaiViet() {}

    // Full constructor
    public BaiViet(String maBaiViet, String tieuDe, String uriHinhAnhMinhHoa, String noiDungTomTat, String noiDung,
                   LocalDate ngayDang, NhanVien nhanVien, LocalDate lanCapNhatCuoiCung, int soLuongTruyCap, String menu,
                   boolean trangThai) {
        this.maBaiViet = maBaiViet;
        this.tieuDe = tieuDe;
        this.uriHinhAnhMinhHoa = uriHinhAnhMinhHoa;
        this.noiDungTomTat = noiDungTomTat;
        this.noiDung = noiDung;
        this.ngayDang = ngayDang;
        this.nhanVien = nhanVien;
        this.lanCapNhatCuoiCung = lanCapNhatCuoiCung;
        this.soLuongTruyCap = soLuongTruyCap;
        this.menu = menu;
        this.trangThai = trangThai;
    }

    public String getMaBaiViet() {
        return maBaiViet;
    }

    public void setMaBaiViet(String maBaiViet) {
        this.maBaiViet = maBaiViet;
    }

    public String getTieuDe() {
        return tieuDe;
    }

    public void setTieuDe(String tieuDe) {
        this.tieuDe = tieuDe;
    }

    public String getUriHinhAnhMinhHoa() {
        return uriHinhAnhMinhHoa;
    }

    public void setUriHinhAnhMinhHoa(String uriHinhAnhMinhHoa) {
        this.uriHinhAnhMinhHoa = uriHinhAnhMinhHoa;
    }

    public String getNoiDungTomTat() {
        return noiDungTomTat;
    }

    public void setNoiDungTomTat(String noiDungTomTat) {
        this.noiDungTomTat = noiDungTomTat;
    }

    public String getNoiDung() {
        return noiDung;
    }

    public void setNoiDung(String noiDung) {
        this.noiDung = noiDung;
    }

    public LocalDate getNgayDang() {
        return ngayDang;
    }

    public void setNgayDang(LocalDate ngayDang) {
        this.ngayDang = ngayDang;
    }

    public NhanVien getNhanVien() {
        return nhanVien;
    }

    public void setNhanVien(NhanVien nhanVien) {
        this.nhanVien = nhanVien;
    }

    public LocalDate getLanCapNhatCuoiCung() {
        return lanCapNhatCuoiCung;
    }

    public void setLanCapNhatCuoiCung(LocalDate lanCapNhatCuoiCung) {
        this.lanCapNhatCuoiCung = lanCapNhatCuoiCung;
    }

    public int getSoLuongTruyCap() {
        return soLuongTruyCap;
    }

    public void setSoLuongTruyCap(int soLuongTruyCap) {
        this.soLuongTruyCap = soLuongTruyCap;
    }

    public String getMenu() {
        return menu;
    }

    public void setMenu(String menu) {
        this.menu = menu;
    }

    public boolean isTrangThai() {
        return trangThai;
    }

    public void setTrangThai(boolean trangThai) {
        this.trangThai = trangThai;
    }
}