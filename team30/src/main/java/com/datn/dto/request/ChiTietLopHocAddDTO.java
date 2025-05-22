package com.datn.dto.request;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public class ChiTietLopHocAddDTO {

    @NotNull(message = "Học viên không được để trống")
    private String maHocVien;

    @NotNull(message = "Lớp học không được để trống")
    private String maLopHoc;

    @DecimalMin(value = "0.0", message = "Học phí phải lớn hơn hoặc bằng 0")
    private double hocPhi;

    @DecimalMin(value = "0.0", message = "Miễn giảm học phí phải lớn hơn hoặc bằng 0")
    private double mienGiamHocPhi;

//    @NotNull(message = "Trạng thái đã thu học phí không được để trống")
    private boolean daThuHocPhi;

    @DecimalMin(value = "0.0", message = "Số tiền thu phải lớn hơn hoặc bằng 0")
    private double soTienThu;

//    @DecimalMin(value = "0.0", message = "Điểm phải lớn hơn hoặc bằng 0")
//    @DecimalMax(value = "10.0", message = "Điểm phải nhỏ hơn hoặc bằng 10")
    private double diem;

//    @NotNull(message = "Ngày cấp chứng chỉ không được để trống")
    private LocalDate ngayCapChungChi;

//    @Size(max = 255, message = "Xếp loại không được vượt quá 255 ký tự")
    private String xepLoai;

//    @Size(max = 255, message = "Điểm danh không được vượt quá 255 ký tự")
    private String diemDanh;

    @Size(max = 255, message = "Ghi chú không được vượt quá 255 ký tự")
    private String ghiChu;

    public ChiTietLopHocAddDTO() {

    }

    public String getMaHocVien() {
        return maHocVien;
    }

    public void setMaHocVien(String maHocVien) {
        this.maHocVien = maHocVien;
    }

    public String getMaLopHoc() {
        return maLopHoc;
    }

    public void setMaLopHoc(String maLopHoc) {
        this.maLopHoc = maLopHoc;
    }

    public double getHocPhi() {
        return hocPhi;
    }

    public void setHocPhi(double hocPhi) {
        this.hocPhi = hocPhi;
    }

    public double getMienGiamHocPhi() {
        return mienGiamHocPhi;
    }

    public void setMienGiamHocPhi(double mienGiamHocPhi) {
        this.mienGiamHocPhi = mienGiamHocPhi;
    }

    public boolean isDaThuHocPhi() {
        return daThuHocPhi;
    }

    public void setDaThuHocPhi(boolean daThuHocPhi) {
        this.daThuHocPhi = daThuHocPhi;
    }

    public double getSoTienThu() {
        return soTienThu;
    }

    public void setSoTienThu(double soTienThu) {
        this.soTienThu = soTienThu;
    }

    public double getDiem() {
        return diem;
    }

    public void setDiem(double diem) {
        this.diem = diem;
    }

    public LocalDate getNgayCapChungChi() {
        return ngayCapChungChi;
    }

    public void setNgayCapChungChi(LocalDate ngayCapChungChi) {
        this.ngayCapChungChi = ngayCapChungChi;
    }

    public String getXepLoai() {
        return xepLoai;
    }

    public void setXepLoai(String xepLoai) {
        this.xepLoai = xepLoai;
    }

    public String getDiemDanh() {
        return diemDanh;
    }

    public void setDiemDanh(String diemDanh) {
        this.diemDanh = diemDanh;
    }

    public String getGhiChu() {
        return ghiChu;
    }

    public void setGhiChu(String ghiChu) {
        this.ghiChu = ghiChu;
    }

}
