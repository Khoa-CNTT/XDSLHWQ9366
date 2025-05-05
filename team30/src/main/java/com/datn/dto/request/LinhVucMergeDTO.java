package com.datn.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class LinhVucMergeDTO {

    @NotBlank(message = "Tên lĩnh vực không được để trống")
    @Size(min = 5, max = 255, message = "Tên học viên phải có độ dài từ 5 đến 255 ký tự")
    private String tenLinhVuc;

    public LinhVucMergeDTO() {

    }

    public String getTenLinhVuc() {
        return tenLinhVuc;
    }

    public void setTenLinhVuc(String tenLinhVuc) {
        this.tenLinhVuc = tenLinhVuc;
    }
}
