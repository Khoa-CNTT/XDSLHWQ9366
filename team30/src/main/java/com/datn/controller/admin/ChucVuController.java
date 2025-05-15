package com.datn.controller.admin;

import com.datn.dto.request.ChucVuMergeDTO;
import com.datn.dto.request.LinhVucMergeDTO;
import com.datn.dto.response.ApiResponse;
import com.datn.dto.response.PaginationResponse;
import com.datn.entity.ChucVu;
import com.datn.entity.LinhVuc;
import com.datn.service.ChucVuService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chucvu")
public class ChucVuController {

    private final ChucVuService chucVuService;

    @Autowired
    public ChucVuController(ChucVuService chucVuService) {
        this.chucVuService = chucVuService;
    }

    @GetMapping("/chucvus")
    public ResponseEntity<ApiResponse<List<ChucVu>>> get() {
        List<ChucVu> chucVus = this.chucVuService.findAll();
        ApiResponse<List<ChucVu>> apiResponse = new ApiResponse<>(HttpStatus.OK.value(), "Danh sách các chức vụ", chucVus);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/getById/{maChucVu}")
    public ResponseEntity<ApiResponse<ChucVu>> getById
            (@PathVariable(name = "maChucVu") String maChucVu) {
        ChucVu chucVu = this.chucVuService.findById(maChucVu);
        ApiResponse<ChucVu> apiResponse = new ApiResponse<>
                (HttpStatus.OK.value(), "Lấy chi tiết chức vụ thành công", chucVu);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<ChucVu>> add(@Valid @RequestBody ChucVuMergeDTO dto) {
        ChucVu chucVu = this.chucVuService.add(dto);

        ApiResponse<ChucVu> apiResponse = new ApiResponse<>
                (HttpStatus.CREATED.value(), "Thêm chức vụ thành công", chucVu);

        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @PutMapping("/update/{maChucVu}")
    public ResponseEntity<ApiResponse<ChucVu>> update(
            @PathVariable String maChucVu,
            @Valid @RequestBody ChucVuMergeDTO dto
    ) {
        ChucVu chucVu = this.chucVuService.update(maChucVu, dto);

        ApiResponse<ChucVu> apiResponse =
                new ApiResponse<>(HttpStatus.OK.value(), "Cập nhật chức vụ thành công", chucVu);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @DeleteMapping("/delete/{maChucVu}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String maChucVu) {
        this.chucVuService.delete(maChucVu);

        ApiResponse<Void> apiResponse =
                new ApiResponse<>(HttpStatus.OK.value(), "Xóa chức vụ thành công", null);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/pagination")
    public ResponseEntity<ApiResponse<PaginationResponse<ChucVu>>> pagination
            (@RequestParam(defaultValue = "1") int page,
             @RequestParam(defaultValue = "2") int size) {
        PaginationResponse<ChucVu> paginationResponse = this.chucVuService.pagination(page, size);

        ApiResponse<PaginationResponse<ChucVu>> apiResponse = new ApiResponse<>
                (HttpStatus.OK.value(), "Danh sách các chức vụ", paginationResponse);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

}
