package com.datn.dto.request;

import java.time.LocalDate;

public class LichThiUpdateDTO {

    private String tenChungChi;
    private LocalDate ngayThi;
    private double lePhiThi;
    private String thongTinChiTiet;
    private String maLinhVuc;

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
