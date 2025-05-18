package com.datn.controller.admin;

import com.datn.dto.request.ChiTietLopHocAddDTO;
import com.datn.dto.response.ApiResponse;
import com.datn.dto.response.PaginationResponse;
import com.datn.entity.ChiTietLopHoc;
import com.datn.entity.LichThi;
import com.datn.service.ChiTietLopHocService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ctlh")
public class ChiTietLopHocController {

    private final ChiTietLopHocService chiTietLopHocService;

    public ChiTietLopHocController(ChiTietLopHocService chiTietLopHocService) {
        this.chiTietLopHocService = chiTietLopHocService;
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<ChiTietLopHoc>> add
            (@Valid @RequestBody ChiTietLopHocAddDTO dto) {
        ChiTietLopHoc chiTietLopHoc = this.chiTietLopHocService.add(dto);

        ApiResponse<ChiTietLopHoc> apiResponse = new ApiResponse<>
                (HttpStatus.CREATED.value(), "Thêm chi tiết lớp học thành công", chiTietLopHoc);

        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @GetMapping("/getById/{maCTLH}")
    public ResponseEntity<ApiResponse<ChiTietLopHoc>> getById
            (@PathVariable(name = "maCTLH")String maCTLH) {
        ChiTietLopHoc chiTietLopHoc = this.chiTietLopHocService.findById(maCTLH);

        ApiResponse<ChiTietLopHoc> apiResponse = new ApiResponse<>
                (HttpStatus.OK.value(), "Lấy thông tin chi tiết lớp học thành công", chiTietLopHoc);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/pagination")
    public ResponseEntity<ApiResponse<PaginationResponse<ChiTietLopHoc>>> pagination
            (@RequestParam(defaultValue = "1") int page,
             @RequestParam(defaultValue = "2") int size) {
        PaginationResponse<ChiTietLopHoc> paginationResponse = this.chiTietLopHocService.pagination(page, size);

        ApiResponse<PaginationResponse<ChiTietLopHoc>> apiResponse = new ApiResponse<>
                (HttpStatus.OK.value(), "Danh sách các chi tiết lớp học", paginationResponse);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/getAll")
    public ResponseEntity<ApiResponse<List<ChiTietLopHoc>>> getAll() {
        try {
            List<ChiTietLopHoc> chiTietLopHocList = chiTietLopHocService.getAllChiTietLopHoc();
            return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Lấy danh sách chi tiết lớp học thành công", chiTietLopHocList));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), "Lỗi: " + e.getMessage(), null));
        }
    }


}
