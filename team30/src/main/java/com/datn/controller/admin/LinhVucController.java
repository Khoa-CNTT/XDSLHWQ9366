package com.datn.controller.admin;

import com.datn.dto.response.ApiResponse;
import com.datn.entity.LinhVuc;
import com.datn.service.LinhVucService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
