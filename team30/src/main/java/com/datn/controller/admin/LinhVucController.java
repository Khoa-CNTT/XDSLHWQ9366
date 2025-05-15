package com.datn.controller.admin;

import com.datn.dto.request.LinhVucMergeDTO;
import com.datn.dto.response.ApiResponse;
import com.datn.dto.response.PaginationResponse;
import com.datn.entity.LinhVuc;
import com.datn.service.LinhVucService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/linhvuc")
public class LinhVucController {

    private final LinhVucService linhVucService;

    @Autowired
    public LinhVucController(LinhVucService linhVucService) {
        this.linhVucService = linhVucService;
    }

    @GetMapping("/linhvucs")
    public ResponseEntity<ApiResponse<List<LinhVuc>>> get() {
        List<LinhVuc> linhVucs = this.linhVucService.findAll();
        ApiResponse<List<LinhVuc>> response = new ApiResponse<>(HttpStatus.OK.value(), "Danh sách các lĩnh vực", linhVucs);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/getById/{maLinhVuc}")
    public ResponseEntity<ApiResponse<LinhVuc>> getById
            (@PathVariable(name = "maLinhVuc") String maLinhVuc) {
        LinhVuc linhVuc = this.linhVucService.findById(maLinhVuc);
        ApiResponse<LinhVuc> apiResponse = new ApiResponse<>
                (HttpStatus.OK.value(), "Lấy chi tiết lĩnh vực thành công", linhVuc);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<LinhVuc>> add(@Valid @RequestBody LinhVucMergeDTO dto) {
        LinhVuc linhVuc = this.linhVucService.add(dto);

        ApiResponse<LinhVuc> apiResponse = new ApiResponse<>
                (HttpStatus.CREATED.value(), "Thêm lĩnh vực thành công", linhVuc);

        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @PutMapping("/update/{maLinhVuc}")
    public ResponseEntity<ApiResponse<LinhVuc>> update(
            @PathVariable String maLinhVuc,
            @Valid @RequestBody LinhVucMergeDTO dto
    ) {
        LinhVuc linhVuc = this.linhVucService.update(maLinhVuc, dto);

        ApiResponse<LinhVuc> apiResponse =
                new ApiResponse<>(HttpStatus.OK.value(), "Cập nhật lĩnh vực thành công", linhVuc);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @DeleteMapping("/delete/{maLinhVuc}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String maLinhVuc) {
        this.linhVucService.delete(maLinhVuc);

        ApiResponse<Void> apiResponse =
                new ApiResponse<>(HttpStatus.OK.value(), "Xóa lĩnh vực thành công", null);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/pagination")
    public ResponseEntity<ApiResponse<PaginationResponse<LinhVuc>>> pagination
            (@RequestParam(defaultValue = "1") int page,
             @RequestParam(defaultValue = "2") int size) {
        PaginationResponse<LinhVuc> paginationResponse = this.linhVucService.pagination(page, size);

        ApiResponse<PaginationResponse<LinhVuc>> apiResponse = new ApiResponse<>
                (HttpStatus.OK.value(), "Danh sách các lĩnh vực", paginationResponse);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

}
