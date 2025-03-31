package com.datn.dto.request;/*
 * @project team30
 * @author Huy
 */

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public class LichThiAddDTO {

    @NotBlank(message = "Mã lịch thi không được để trống")
    private String maLichThi;

    @NotBlank(message = "Tên chứng chỉ không được để trống")
    @Size(max = 255, message = "Tên chứng chỉ không được vượt quá 255 ký tự")
    private String tenChungChi;

    @NotNull(message = "Ngày thi không được để trống")
    @FutureOrPresent(message = "Ngày thi phải là ngày hiện tại hoặc trong tương lai")
    private LocalDate ngayThi;

    @Positive(message = "Lệ phí thi phải lớn hơn 0")
    private double lePhiThi;

    @NotBlank(message = "Thông tin chi tiết không được để trống")
    private String thongTinChiTiet;

    @NotBlank(message = "Mã lĩnh vực không được để trống")
    private String maLinhVuc;

    public LichThiAddDTO(String maLichThi, String tenChungChi, LocalDate ngayThi, double lePhiThi, String thongTinChiTiet, String maLinhVuc) {
        this.maLichThi = maLichThi;
        this.tenChungChi = tenChungChi;
        this.ngayThi = ngayThi;
        this.lePhiThi = lePhiThi;
        this.thongTinChiTiet = thongTinChiTiet;
        this.maLinhVuc = maLinhVuc;
    }

    // Getters & Setters
    public String getMaLichThi() {
        return maLichThi;
    }

    public void setMaLichThi(String maLichThi) {
        this.maLichThi = maLichThi;
    }

    public String getTenChungChi() {
        return tenChungChi;
    }

    public void setTenChungChi(String tenChungChi) {
        this.tenChungChi = tenChungChi;
    }

    public LocalDate getNgayThi() {
        return ngayThi;
    }

    public void setNgayThi(LocalDate ngayThi) {
        this.ngayThi = ngayThi;
    }

    public double getLePhiThi() {
        return lePhiThi;
    }

    public void setLePhiThi(double lePhiThi) {
        this.lePhiThi = lePhiThi;
    }

    public String getThongTinChiTiet() {
        return thongTinChiTiet;
    }

    public void setThongTinChiTiet(String thongTinChiTiet) {
        this.thongTinChiTiet = thongTinChiTiet;
    }

    public String getMaLinhVuc() {
        return maLinhVuc;
    }

    public void setMaLinhVuc(String maLinhVuc) {
        this.maLinhVuc = maLinhVuc;
    }
}

