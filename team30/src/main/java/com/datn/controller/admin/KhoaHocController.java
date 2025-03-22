package com.datn.controller.admin;

import com.datn.dto.request.KhoaHocAddDTO;
import com.datn.dto.response.ApiResponse;
import com.datn.entity.KhoaHoc;
import com.datn.service.KhoaHocService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
