package com.datn.controller.admin;/*
 * @project team30
 * @author Huy
 */

import com.datn.dto.request.BaiVietAddDTO;
import com.datn.dto.request.BaiVietUpdateDTO;
import com.datn.dto.response.ApiResponse;
import com.datn.entity.BaiViet;
import com.datn.service.BaiVietService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/baiviet")
public class BaiVietController {

    private BaiVietService baiVietService;

    public BaiVietController(BaiVietService baiVietService) {
        this.baiVietService = baiVietService;
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<BaiViet>>> getAllBaiViet() {
        List<BaiViet> baiViets = baiVietService.getAllBaiViet();
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Lấy danh sách bài viết thành công", baiViets));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<BaiViet>> getBaiVietById(@PathVariable String id) {
        BaiViet baiViet = baiVietService.getBaiVietById(id);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Lấy bài viết thành công", baiViet));
    }
    @PostMapping("/add")
    public ResponseEntity<ApiResponse<BaiViet>> createBaiViet(@Valid @RequestBody BaiVietAddDTO baiViet) {
        BaiViet createdBaiViet = baiVietService.createBaiViet(baiViet);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Tạo bài viết thành công", createdBaiViet));
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse<BaiViet>> updateBaiViet(
            @PathVariable String id,
            @Valid @RequestBody BaiVietUpdateDTO baiViet) {
        BaiViet updatedBaiViet = baiVietService.updateBaiViet(id, baiViet);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Cập nhật bài viết thành công", updatedBaiViet));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteBaiViet(@PathVariable String id) {
        baiVietService.deleteBaiViet(id);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Xóa bài viết thành công", null));
    }

}
