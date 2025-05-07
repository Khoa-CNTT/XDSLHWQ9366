package com.datn.controller.admin;

import com.datn.dto.response.ApiResponse;
import com.datn.entity.ChucVu;
import com.datn.service.ChucVuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
