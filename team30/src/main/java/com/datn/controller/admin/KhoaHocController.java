package com.datn.controller.admin;

import com.datn.dto.request.KhoaHocAddDTO;
import com.datn.dto.request.KhoaHocUpdateDTO;
import com.datn.dto.response.ApiResponse;
import com.datn.dto.response.PaginationResponse;
import com.datn.entity.KhoaHoc;
import com.datn.service.KhoaHocService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/khoahoc")
public class KhoaHocController {

    private final KhoaHocService khoaHocService;

    public KhoaHocController(KhoaHocService khoaHocService) {
        this.khoaHocService = khoaHocService;
    }

    @GetMapping("/getById/{maKhoaHoc}")
    public ResponseEntity<ApiResponse<KhoaHoc>> getById
            (@PathVariable(name = "maKhoaHoc") String maKhoaHoc) {
        KhoaHoc khoaHoc = this.khoaHocService.findById(maKhoaHoc);
        ApiResponse<KhoaHoc> apiResponse = new ApiResponse<>
                (HttpStatus.OK.value(), "Lấy chi tiết khóa học thành công", khoaHoc);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
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

    @DeleteMapping("/delete/{maKhoaHoc}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String maKhoaHoc) {
        this.khoaHocService.delete(maKhoaHoc);

        ApiResponse<Void> apiResponse =
                new ApiResponse<>(HttpStatus.OK.value(), "Xóa khóa học thành công", null);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/pagination")
    public ResponseEntity<ApiResponse<PaginationResponse<KhoaHoc>>> pagination
            (@RequestParam(defaultValue = "1") int page,
             @RequestParam(defaultValue = "2") int size) {
        PaginationResponse<KhoaHoc> paginationResponse = this.khoaHocService.pagination(page, size);

        ApiResponse<PaginationResponse<KhoaHoc>> apiResponse = new ApiResponse<>
                (HttpStatus.OK.value(), "Danh sách các khóa học", paginationResponse);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/search/{tenKhoaHoc}")
    public ResponseEntity<ApiResponse<List<KhoaHoc>>> search(@PathVariable String tenKhoaHoc) {
        List<KhoaHoc> khoaHocs = this.khoaHocService.findByTenKhoaHoc(tenKhoaHoc);

        ApiResponse<List<KhoaHoc>> apiResponse = new ApiResponse<>
                (HttpStatus.OK.value(), "Danh sách các khóa học", khoaHocs);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/getByMaLinhVuc")
    public ResponseEntity<ApiResponse<PaginationResponse<KhoaHoc>>> getByMaLinhVuc
            (@RequestParam String maLinhVuc,
             @RequestParam(defaultValue = "1") int page,
             @RequestParam(defaultValue = "2") int size) {
        PaginationResponse<KhoaHoc> khoaHocs = this.khoaHocService.findByMaLinhVuc
                (maLinhVuc, page, size);

        ApiResponse<PaginationResponse<KhoaHoc>> apiResponse = new ApiResponse<>(
                HttpStatus.OK.value(),
                "Danh sách các khóa học lấy theo mã lĩnh vực",
                khoaHocs
        );

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

}