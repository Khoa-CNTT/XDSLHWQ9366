package com.datn.dto.request;/*
 * @project team30
 * @author Huy
 */

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public class BaiVietUpdateDTO {

    @NotBlank(message = "Mã bài viết không được để trống")
    private String maBaiViet;

    @NotBlank(message = "Tiêu đề không được để trống")
    @Size(max = 255, message = "Tiêu đề không được vượt quá 255 ký tự")
    private String tieuDe;

    @NotBlank(message = "URI hình ảnh minh họa không được để trống")
    @Size(max = 255, message = "URI hình ảnh minh họa không được vượt quá 255 ký tự")
    private String uriHinhAnhMinhHoa;

    @NotBlank(message = "Nội dung tóm tắt không được để trống")
    private String noiDungTomTat;

    @NotBlank(message = "Nội dung không được để trống")
    private String noiDung;

    @NotNull(message = "Ngày đăng không được để trống")
    @FutureOrPresent(message = "Ngày đăng phải là ngày hiện tại hoặc trong tương lai")
    private LocalDate ngayDang;

    @NotNull(message = "Mã nhân viên viết bài không được để trống")
    private String nhanVienId; // ID của nhân viên viết bài

    @NotNull(message = "Lần cập nhật cuối cùng không được để trống")
    @FutureOrPresent(message = "Lần cập nhật cuối cùng phải là ngày hiện tại hoặc trong tương lai")
    private LocalDate lanCapNhatCuoiCung;

    @Min(value = 0, message = "Số lượng truy cập phải lớn hơn hoặc bằng 0")
    private int soLuongTruyCap;

    @NotBlank(message = "Menu không được để trống")
    @Size(max = 255, message = "Menu không được vượt quá 255 ký tự")
    private String menu;

    @NotNull(message = "Trạng thái không được để trống")
    private Boolean trangThai;

    // Default constructor
    public BaiVietUpdateDTO() {}

    // Full constructor
    public BaiVietUpdateDTO(String maBaiViet, String tieuDe, String uriHinhAnhMinhHoa, String noiDungTomTat, String noiDung,
                            LocalDate ngayDang, String nhanVienId, LocalDate lanCapNhatCuoiCung, int soLuongTruyCap, String menu,
                            Boolean trangThai) {
        this.maBaiViet = maBaiViet;
        this.tieuDe = tieuDe;
        this.uriHinhAnhMinhHoa = uriHinhAnhMinhHoa;
        this.noiDungTomTat = noiDungTomTat;
        this.noiDung = noiDung;
        this.ngayDang = ngayDang;
        this.nhanVienId = nhanVienId;
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

    public String getNhanVienId() {
        return nhanVienId;
    }

    public void setNhanVienId(String nhanVienId) {
        this.nhanVienId = nhanVienId;
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

    public Boolean getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(Boolean trangThai) {
        this.trangThai = trangThai;
    }
}
