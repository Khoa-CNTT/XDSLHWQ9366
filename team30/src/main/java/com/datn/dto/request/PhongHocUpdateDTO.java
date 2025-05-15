package com.datn.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class PhongHocUpdateDTO {

    @NotBlank(message = "Tên nhân viên không được để trống")
    @Size(min = 5, max = 255, message = "Tên nhân viên phải có độ dài từ 5 đến 255 ký tự")
    private String tenPhongHoc;

    @Min(value = 1, message = "Số chỗ ngồi phải lớn hơn 0")
    private int soChoNgoi;

    @Size(min = 5, max = 255, message = "Tên nhân viên phải có độ dài từ 5 đến 255 ký tự")
    private String ghiChu;

    public PhongHocUpdateDTO() {

    }

    public String getTenPhongHoc() {
        return tenPhongHoc;
    }

    public void setTenPhongHoc(String tenPhongHoc) {
        this.tenPhongHoc = tenPhongHoc;
    }

    public int getSoChoNgoi() {
        return soChoNgoi;
    }

    public void setSoChoNgoi(int soChoNgoi) {
        this.soChoNgoi = soChoNgoi;
    }

    public String getGhiChu() {
        return ghiChu;
    }

    public void setGhiChu(String ghiChu) {
        this.ghiChu = ghiChu;
    }

}
