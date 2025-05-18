package com.datn.controller.admin;/*
 * @project team30
 */

import com.datn.dto.request.LienHeAddDTO;
import com.datn.dto.request.LienHeUpdateDTO;
import com.datn.dto.response.ApiResponse;
import com.datn.entity.LienHe;
import com.datn.service.LienHeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lienhe")
public class LienHeController {

    private final LienHeService lienHeService;

    public LienHeController(LienHeService lienHeService) {
        this.lienHeService = lienHeService;
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<LienHe>> add(@Valid @RequestBody LienHeAddDTO lienHe) {
        try {
            LienHe addedLienHe = lienHeService.createContact(lienHe);
            return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Thêm liên hệ thành công", addedLienHe));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), "Lỗi: " + e.getMessage(), null));
        }
    }

    @PutMapping("/update/{maKhach}")
    public ResponseEntity<ApiResponse<LienHe>> update(
            @PathVariable String maKhach,
            @Valid @RequestBody LienHeUpdateDTO lienHeDetails) {
        try {
            LienHe updatedLienHe = lienHeService.updateContact(maKhach, lienHeDetails);
            return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Cập nhật liên hệ thành công", updatedLienHe));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), "Lỗi: " + e.getMessage(), null));
        }
    }

    @DeleteMapping("/delete/{maKhach}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String maKhach) {
        try {
            lienHeService.deleteContact(maKhach);
            return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Xóa liên hệ thành công", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), "Lỗi: " + e.getMessage(), null));
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<ApiResponse<List<LienHe>>> getAll() {
        try {
            List<LienHe> lienHeList = lienHeService.getAllContacts();
            return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Lấy danh sách liên hệ thành công", lienHeList));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), "Lỗi: " + e.getMessage(), null));
        }
    }

    @GetMapping("/getById/{maKhach}")
    public ResponseEntity<ApiResponse<LienHe>> getById(@PathVariable String maKhach) {
        try {
            LienHe lienHe = lienHeService.getContactById(maKhach);
            return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Lấy liên hệ thành công", lienHe));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), "Lỗi: " + e.getMessage(), null));
        }
    }
}