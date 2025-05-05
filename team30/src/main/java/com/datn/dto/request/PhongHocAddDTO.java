package com.datn.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class PhongHocAddDTO {

    @NotBlank(message = "Tên nhân viên không được để trống")
    @Size(min = 5, max = 255, message = "Tên nhân viên phải có độ dài từ 5 đến 255 ký tự")
    private String tenPhongHoc;

    @Min(value = 1, message = "Số chỗ ngồi phải lớn hơn 0")
    private int soChoNgoi;

    @Size(min = 5, max = 255, message = "Tên nhân viên phải có độ dài từ 5 đến 255 ký tự")
    private String ghiChu;

    public PhongHocAddDTO() {

    }

    public String tenPhongHoc() {
        return tenPhongHoc;
    }

    public PhongHocAddDTO setTenPhongHoc(String tenPhongHoc) {
        this.tenPhongHoc = tenPhongHoc;
        return this;
    }

    public int soChoNgoi() {
        return soChoNgoi;
    }

    public PhongHocAddDTO setSoChoNgoi(int soChoNgoi) {
        this.soChoNgoi = soChoNgoi;
        return this;
    }

    public String ghiChu() {
        return ghiChu;
    }

    public PhongHocAddDTO setGhiChu(String ghiChu) {
        this.ghiChu = ghiChu;
        return this;
    }

}
