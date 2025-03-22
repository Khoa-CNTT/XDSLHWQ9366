package com.datn.controller.admin;

import com.datn.dto.request.LopHocAddDTO;
import com.datn.dto.response.ApiResponse;
import com.datn.entity.LopHoc;
import com.datn.service.LopHocService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
