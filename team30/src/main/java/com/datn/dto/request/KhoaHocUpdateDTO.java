package com.datn.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class KhoaHocUpdateDTO {

    @NotNull(message = "Số buổi không được để trống")
    @Min(value = 1, message = "Số buổi phải lớn hơn 0")
    private Integer soBuoi;

    @NotNull(message = "Học phí không được để trống")
    @Min(value = 1, message = "Học phí phải lớn hơn 0")
    private Double hocPhi;

    @Size(min = 5, max = 255, message = "Nội dung tóm tắt khóa học phải có độ dài từ 5 đến 255 ký tự")
    private String noiDungTomTatKhoaHoc;

    @Size(min = 5, max = 255, message = "Nội dung khóa học phải có độ dài từ 5 đến 255 ký tự")
    private String noiDungKhoaHoc;

    @Size(min = 5, max = 255, message = "Ghi chú phải có độ dài từ 5 đến 255 ký tự")
    private String ghiChu;

    public KhoaHocUpdateDTO() {

    }

    public Integer getSoBuoi() {
        return soBuoi;
    }

    public void setSoBuoi(Integer soBuoi) {
        this.soBuoi = soBuoi;
    }

    public Double getHocPhi() {
        return hocPhi;
    }

    public void setHocPhi(Double hocPhi) {
        this.hocPhi = hocPhi;
    }

    public String getNoiDungTomTatKhoaHoc() {
        return noiDungTomTatKhoaHoc;
    }

    public void setNoiDungTomTatKhoaHoc(String noiDungTomTatKhoaHoc) {
        this.noiDungTomTatKhoaHoc = noiDungTomTatKhoaHoc;
    }

    public String getNoiDungKhoaHoc() {
        return noiDungKhoaHoc;
    }

    public void setNoiDungKhoaHoc(String noiDungKhoaHoc) {
        this.noiDungKhoaHoc = noiDungKhoaHoc;
    }

    public String getGhiChu() {
        return ghiChu;
    }

    public void setGhiChu(String ghiChu) {
        this.ghiChu = ghiChu;
    }

}