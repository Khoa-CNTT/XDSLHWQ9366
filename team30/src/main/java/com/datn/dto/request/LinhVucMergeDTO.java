package com.datn.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class LinhVucMergeDTO {

    @NotBlank(message = "Tên lĩnh vực không được để trống")
    @Size(max = 255, message = "Tên thí sinh không được vượt quá 255 ký tự")
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
