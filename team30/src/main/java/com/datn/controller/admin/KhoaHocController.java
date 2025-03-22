package com.datn.controller.admin;

import com.datn.dto.request.KhoaHocAddDTO;
import com.datn.dto.request.KhoaHocUpdateDTO;
import com.datn.dto.response.ApiResponse;
import com.datn.entity.KhoaHoc;
import com.datn.service.KhoaHocService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/khoahoc")
public class KhoaHocController {

    private final KhoaHocService khoaHocService;

    public KhoaHocController(KhoaHocService khoaHocService) {
        this.khoaHocService = khoaHocService;
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<KhoaHoc>> add(@Valid @RequestBody KhoaHocAddDTO khoaHocAddDTO) {
        KhoaHoc khoaHoc = this.khoaHocService.add(khoaHocAddDTO);

        ApiResponse<KhoaHoc> apiResponse = new ApiResponse<>
                (HttpStatus.CREATED.value(), "Thêm khóa học thành công", khoaHoc);

        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @PutMapping("/update/{maKhoaHoc}")
    public ResponseEntity<ApiResponse<KhoaHoc>> update(
            @PathVariable String maKhoaHoc,
            @Valid @RequestBody KhoaHocUpdateDTO khoaHocUpdateDTO
    ) {
        KhoaHoc khoaHoc = this.khoaHocService.update(maKhoaHoc, khoaHocUpdateDTO);

        ApiResponse<KhoaHoc> apiResponse =
                new ApiResponse<>(HttpStatus.OK.value(), "Cập nhật khóa học thành công", khoaHoc);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

}
