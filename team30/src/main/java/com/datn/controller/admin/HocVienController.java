package com.datn.controller.admin;

import com.datn.dto.request.HocVienAddDTO;
import com.datn.dto.response.ApiResponse;
import com.datn.entity.HocVien;
import com.datn.service.HocVienService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/hocvien")
public class HocVienController {

    private final HocVienService hocVienService;

    @Autowired
    public HocVienController(HocVienService hocVienService) {
        this.hocVienService = hocVienService;
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<HocVien>> add
            (@Valid @RequestBody HocVienAddDTO hocVienAddDTO) {
        HocVien hocVien = this.hocVienService.add(hocVienAddDTO);

        ApiResponse<HocVien> apiResponse = new ApiResponse<>
                (HttpStatus.CREATED.value(), "Thêm học viên thành công", hocVien);

        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @GetMapping("/getById/{maHocVien}")
    public ResponseEntity<ApiResponse<HocVien>> getById
            (@PathVariable(name = "maHocVien")String maHocVien) {
        HocVien hocVien = this.hocVienService.findById(maHocVien);

        ApiResponse<HocVien> apiResponse = new ApiResponse<>
                (HttpStatus.OK.value(), "Lấy thông tin học viên thành công", hocVien);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

}
