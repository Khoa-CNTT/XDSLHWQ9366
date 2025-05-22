package com.datn.controller.payment;

import com.datn.dto.request.ThanhToanDTO;
import com.datn.dto.response.ApiResponse;
import com.datn.entity.ThanhToan;
import com.datn.service.ThanhToanService;
import com.datn.utils.TrangThaiThanhToan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/thanhtoan")
public class ThanhToanController {

    @Autowired
    private ThanhToanService thanhToanService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<ThanhToan>> createThanhToan(@RequestBody ThanhToanDTO thanhToan) {
        ThanhToan created = thanhToanService.createThanhToan(thanhToan);
        return ResponseEntity.ok(
                new ApiResponse<>(HttpStatus.OK.value(), "Tạo thanh toán thành công", created)
        );
    }

    @GetMapping("/list")
    public ResponseEntity<ApiResponse<List<ThanhToan>>> getAllThanhToans() {
        List<ThanhToan> list = thanhToanService.getAllThanhToans();
        return ResponseEntity.ok(
                new ApiResponse<>(HttpStatus.OK.value(), "Lấy danh sách thanh toán thành công", list)
        );
    }

}
