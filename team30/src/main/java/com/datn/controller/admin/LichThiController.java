package com.datn.controller.admin;/*
 * @project team30
 * @author Huy
 */

import com.datn.dto.request.LichThiAddDTO;
import com.datn.dto.response.ApiResponse;
import com.datn.entity.LichThi;
import com.datn.service.LichThiService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}

