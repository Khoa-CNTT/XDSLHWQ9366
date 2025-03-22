package com.datn.controller.admin;

import com.datn.dto.request.PhongHocAddDTO;
import com.datn.dto.request.PhongHocUpdateDTO;
import com.datn.dto.response.ApiResponse;
import com.datn.dto.response.PaginationResponse;
import com.datn.entity.PhongHoc;
import com.datn.service.PhongHocService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/phonghoc")
public class PhongHocController {

    private final PhongHocService phongHocService;

    @Autowired
    public PhongHocController(PhongHocService phongHocService) {
        this.phongHocService = phongHocService;
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<PhongHoc>> add(@Valid @RequestBody PhongHocAddDTO phongHocAddDTO) {
        PhongHoc phongHoc = this.phongHocService.add(phongHocAddDTO);

        System.out.println(phongHoc);

        ApiResponse<PhongHoc> apiResponse = new ApiResponse<>();

        apiResponse.setData(phongHoc);
        apiResponse.setMessage("Thêm phòng học thành công");
        apiResponse.setStatus(HttpStatus.CREATED.value());

        System.out.println(apiResponse);

        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @PutMapping("/update/{maPhongHoc}")
    public ResponseEntity<ApiResponse<PhongHoc>> update(
            @PathVariable String maPhongHoc,
            @Valid @RequestBody PhongHocUpdateDTO phongHocUpdateDTO
    ) {
        PhongHoc phongHoc = this.phongHocService.update(maPhongHoc, phongHocUpdateDTO);

        ApiResponse<PhongHoc> apiResponse = new ApiResponse<>
                (HttpStatus.OK.value(), "Cập nhật thành công", phongHoc);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @DeleteMapping("/delete/{maPhongHoc}")
    public ResponseEntity<ApiResponse<Void>> delete
            (@PathVariable String maPhongHoc) {
        this.phongHocService.delete(maPhongHoc);

        ApiResponse<Void> apiResponse = new ApiResponse<>(HttpStatus.OK.value(), "Xóa phòng học thành công", null);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/pagination")
    public ResponseEntity<ApiResponse<PaginationResponse<PhongHoc>>> pagination
            (@RequestParam(defaultValue = "1") int page,
             @RequestParam(defaultValue = "2") int size)
    {
        PaginationResponse<PhongHoc> paginationResponse = this.phongHocService.pagination(page, size);

        ApiResponse<PaginationResponse<PhongHoc>> apiResponse = new ApiResponse<>
                (HttpStatus.OK.value(), "Danh sách phòng học", paginationResponse);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

}
