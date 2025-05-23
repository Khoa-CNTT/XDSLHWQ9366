package com.datn.controller.admin;

/*
 * @project team30
 * @author Huy
 */

import com.datn.dto.request.PhieuThuAddDTO;
import com.datn.dto.request.PhieuThuUpdateDTO;
import com.datn.dto.response.ApiResponse;
import com.datn.entity.PhieuThu;
import com.datn.service.PhieuThuService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/phieuthu")
public class PhieuThuController {

    private final PhieuThuService phieuThuService;

    public PhieuThuController(PhieuThuService phieuThuService) {
        this.phieuThuService = phieuThuService;
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<PhieuThu>> add(@Valid @RequestBody PhieuThuAddDTO dto) {
        try {
            PhieuThu added = phieuThuService.createPhieuThu(dto);
            return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Thêm phiếu thu thành công", added));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), "Lỗi: " + e.getMessage(), null));
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse<PhieuThu>> update(@PathVariable String id, @Valid @RequestBody PhieuThuUpdateDTO dto) {
        try {
            PhieuThu updated = phieuThuService.updatePhieuThu(id, dto);
            return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Cập nhật phiếu thu thành công", updated));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), "Lỗi: " + e.getMessage(), null));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String id) {
        try {
            phieuThuService.deletePhieuThu(id);
            return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Xóa phiếu thu thành công", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), "Lỗi: " + e.getMessage(), null));
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<ApiResponse<List<PhieuThu>>> getAll() {
        try {
            List<PhieuThu> list = phieuThuService.getAllPhieuThu();
            return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Lấy danh sách phiếu thu thành công", list));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), "Lỗi: " + e.getMessage(), null));
        }
    }

}
