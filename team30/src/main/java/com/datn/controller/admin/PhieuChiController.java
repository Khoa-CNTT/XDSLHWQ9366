package com.datn.controller.admin;

/*
 * @project team30
 * @author Huy
 */

import com.datn.dto.request.PhieuChiAddDTO;
import com.datn.dto.request.PhieuChiUpdateDTO;
import com.datn.dto.response.ApiResponse;
import com.datn.entity.PhieuChi;
import com.datn.service.PhieuChiService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/phieuchi")
public class PhieuChiController {

    private final PhieuChiService phieuChiService;

    public PhieuChiController(PhieuChiService phieuChiService) {
        this.phieuChiService = phieuChiService;
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<PhieuChi>> add(@Valid @RequestBody PhieuChiAddDTO dto) {
        try {
            PhieuChi added = phieuChiService.createPhieuChi(dto);
            return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Thêm phiếu chi thành công", added));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), "Lỗi: " + e.getMessage(), null));
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse<PhieuChi>> update(@PathVariable String id, @Valid @RequestBody PhieuChiUpdateDTO dto) {
        try {
            PhieuChi updated = phieuChiService.updatePhieuChi(id, dto);
            return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Cập nhật phiếu chi thành công", updated));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), "Lỗi: " + e.getMessage(), null));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String id) {
        try {
            phieuChiService.deletePhieuChi(id);
            return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Xóa phiếu chi thành công", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), "Lỗi: " + e.getMessage(), null));
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<ApiResponse<List<PhieuChi>>> getAll() {
        try {
            List<PhieuChi> list = phieuChiService.getAllPhieuChi();
            return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Lấy danh sách phiếu chi thành công", list));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), "Lỗi: " + e.getMessage(), null));
        }
    }
}
