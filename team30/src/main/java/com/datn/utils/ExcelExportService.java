package com.datn.utils;

import com.datn.entity.GiangVien;
import com.datn.entity.NhanVien;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class ExcelExportService {

    public ByteArrayInputStream exportNhanViensToExcel(List<NhanVien> nhanViens) {
        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Nhân Viên");

            // Tạo header row
            Row headerRow = sheet.createRow(0);
            String[] columns = {"Mã NV", "Tên", "Ngày Sinh", "Giới Tính", "Số CMND", "SĐT", "Email", "Địa Chỉ", "Chức Vụ"};
            for (int i = 0; i < columns.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(columns[i]);
            }

            // Ghi dữ liệu vào sheet
            int rowIdx = 1;
            for (NhanVien nv : nhanViens) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(nv.getMaNhanVien());
                row.createCell(1).setCellValue(nv.getTenNhanVien());
                row.createCell(2).setCellValue(nv.getNgaySinh() != null ? nv.getNgaySinh().toString() : "");
                row.createCell(3).setCellValue(nv.isGioiTinh() ? "Nam" : "Nữ");
                row.createCell(4).setCellValue(nv.getSoCMND());
                row.createCell(5).setCellValue(nv.getSoDienThoai());
                row.createCell(6).setCellValue(nv.getEmail());
                row.createCell(7).setCellValue(nv.getDiaChi());
                row.createCell(8).setCellValue(nv.getChucVu() != null ? nv.getChucVu().getTenChucVu() : "");
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("Lỗi khi xuất Excel", e);
        }
    }

    public ByteArrayInputStream exportGiangViensToExcel(List<GiangVien> giangViens) {
        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Giảng Viên");

            // Tạo header row
            Row headerRow = sheet.createRow(0);
            String[] columns = {"Mã GV", "Tên", "Ngày Sinh", "Giới Tính", "Số CMND", "SĐT", "Email", "Địa Chỉ", "Cơ Quan", "Tình Trạng", "Ghi Chú", "Lĩnh Vực", "URL Hình"};
            for (int i = 0; i < columns.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(columns[i]);
            }

            // Ghi dữ liệu vào sheet
            int rowIdx = 1;
            for (GiangVien gv : giangViens) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(gv.getMaGiangVien());
                row.createCell(1).setCellValue(gv.getTenGiangVien());
                row.createCell(2).setCellValue(gv.getNgaySinh() != null ? gv.getNgaySinh().toString() : "");
                row.createCell(3).setCellValue(gv.isGioiTinh() ? "Nam" : "Nữ");
                row.createCell(4).setCellValue(gv.getSoCMND());
                row.createCell(5).setCellValue(gv.getSoDienThoai());
                row.createCell(6).setCellValue(gv.getEmail());
                row.createCell(7).setCellValue(gv.getDiaChi());
                row.createCell(8).setCellValue(gv.getCoQuanCongTac());
                row.createCell(9).setCellValue(gv.getTinhTrangCongTac());
                row.createCell(10).setCellValue(gv.getGhiChu());
                row.createCell(11).setCellValue(gv.getLinhVuc() != null ? gv.getLinhVuc().getTenLinhVuc() : "");
                row.createCell(12).setCellValue(gv.getUrlHinhDaiDien());
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("Lỗi khi xuất Excel", e);
        }
    }


}
