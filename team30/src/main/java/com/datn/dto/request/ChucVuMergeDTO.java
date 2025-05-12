package com.datn.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ChucVuMergeDTO {

    @NotBlank(message = "Tên chức vụ không được để trống")
    @Size(min = 5, max = 255, message = "Tên chức vụ phải có độ dài từ 5 đến 255 ký tự")
    private String tenChucVu;

    public ChucVuMergeDTO() {

    }

    public String getTenChucVu() {
        return tenChucVu;
    }

    public void setTenChucVu(String tenChucVu) {
        this.tenChucVu = tenChucVu;
    }
}
