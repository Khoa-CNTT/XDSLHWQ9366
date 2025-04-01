package com.datn.controller.admin;/*
 * @project team30
 * @author Huy
 */

import com.datn.dto.request.LichThiAddDTO;
import com.datn.dto.request.LichThiUpdateDTO;
import com.datn.dto.response.ApiResponse;
import com.datn.entity.LichThi;
import com.datn.service.LichThiService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lichthi")
public class LichThiController {

    private final LichThiService lichThiService;

    public LichThiController(LichThiService lichThiService) {
        this.lichThiService = lichThiService;
    }

    // 1. Thêm lịch thi
    @PostMapping("/add")
    public ResponseEntity<ApiResponse<LichThi>> add(@Valid @RequestBody LichThiAddDTO lichThi) {
        try {
            LichThi addedLichThi = lichThiService.add(lichThi);
            return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Thêm lịch thi thành công", addedLichThi));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), "Lỗi: " + e.getMessage(), null));
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse<LichThi>> update(
            @PathVariable String id,
            @Valid @RequestBody LichThiUpdateDTO lichThi) {
        try {
            LichThi updatedLichThi = lichThiService.update(id, lichThi);
            return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Cập nhật lịch thi thành công", updatedLichThi));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), "Lỗi: " + e.getMessage(), null));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String id) {
        try {
            lichThiService.delete(id);
            return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Xóa lịch thi thành công", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), "Lỗi: " + e.getMessage(), null));
        }
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<LichThi>>> search(
            @RequestParam(required = false) String maLichThi,
            @RequestParam(required = false) String tenChungChi) {
        try {
            List<LichThi> results = lichThiService.search(maLichThi, tenChungChi);
            return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Tìm kiếm thành công", results));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), "Lỗi: " + e.getMessage(), null));
        }
    }

}

