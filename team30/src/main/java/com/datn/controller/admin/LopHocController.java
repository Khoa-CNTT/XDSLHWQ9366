package com.datn.controller.admin;

import com.datn.dto.request.LopHocAddDTO;
import com.datn.dto.request.LopHocUpdateDTO;
import com.datn.dto.response.ApiResponse;
import com.datn.dto.response.PaginationResponse;
import com.datn.entity.LopHoc;
import com.datn.service.LopHocService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lophoc")
public class LopHocController {

    private final LopHocService lopHocService;

    @Autowired
    public LopHocController(LopHocService lopHocService) {
        this.lopHocService = lopHocService;
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<LopHoc>> add
            (@Valid @RequestBody LopHocAddDTO lopHocAddDTO)
    {
        LopHoc lopHoc = this.lopHocService.add(lopHocAddDTO);

        ApiResponse<LopHoc> apiResponse = new ApiResponse<>
                (HttpStatus.CREATED.value(), "Thêm lớp học thành công", lopHoc);

        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @PutMapping("/update/{maLopHoc}")
    public ResponseEntity<ApiResponse<LopHoc>> update(
            @PathVariable String maLopHoc,
            @Valid @RequestBody LopHocUpdateDTO lopHocUpdateDTO
    ) {
        LopHoc lopHoc = this.lopHocService.update(maLopHoc, lopHocUpdateDTO);

        ApiResponse<LopHoc> apiResponse = new ApiResponse<>
                (HttpStatus.OK.value(), "Cập nhật lớp học thành công", lopHoc);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @DeleteMapping("/delete/{maLopHoc}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String maLopHoc) {
        this.lopHocService.delete(maLopHoc);

        ApiResponse<Void> apiResponse = new ApiResponse<>
                (HttpStatus.OK.value(), "Xóa lớp học thành công", null);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/pagination")
    public ResponseEntity<ApiResponse<PaginationResponse<LopHoc>>> pagination
            (@RequestParam(defaultValue = "1") int page,
             @RequestParam(defaultValue = "2") int size) {
        PaginationResponse<LopHoc> lopHocs = this.lopHocService.pagination(page,size);

        ApiResponse<PaginationResponse<LopHoc>> apiResponse = new ApiResponse<>
                (HttpStatus.OK.value(), "Danh sách các lớp học", lopHocs);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/search/{tenLopHoc}")
    public ResponseEntity<ApiResponse<List<LopHoc>>> search(@PathVariable String tenLopHoc) {
        List<LopHoc> lopHocs = this.lopHocService.findByTenLopHoc(tenLopHoc);

        ApiResponse<List<LopHoc>> apiResponse = new ApiResponse<>
                (HttpStatus.OK.value(), "Danh sách các lớp học", lopHocs);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

}
