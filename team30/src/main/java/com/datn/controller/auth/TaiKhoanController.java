package com.datn.controller.auth;/*
 * @project team30
 * @author Huy
 */
import org.springframework.http.HttpStatus;
import com.datn.dto.request.TaiKhoanDTO;
import com.datn.dto.response.ApiResponse;
import com.datn.entity.TaiKhoan;
import com.datn.security.JwtUtil;
import com.datn.service.TaiKhoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/taikhoan")
public class TaiKhoanController {

    @Autowired
    private TaiKhoanService taiKhoanService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<TaiKhoan>> register(@RequestBody TaiKhoanDTO dto) {
        TaiKhoan taiKhoan = taiKhoanService.register(dto);
        return ResponseEntity.ok(
                new ApiResponse<>(HttpStatus.OK.value(), "Đăng ký tài khoản thành công", taiKhoan)
        );
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse<TaiKhoan>> updateTaiKhoan(@PathVariable String id, @RequestBody TaiKhoanDTO dto) {
        if (id == null || id.trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), "ID không được để trống", null)
            );
        }

        Optional<TaiKhoan> updatedTaiKhoan = taiKhoanService.update(id, dto);
        return updatedTaiKhoan.map(tk -> ResponseEntity.ok(
                new ApiResponse<>(HttpStatus.OK.value(), "Cập nhật tài khoản thành công", tk)
        )).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ApiResponse<>(HttpStatus.NOT_FOUND.value(), "Không tìm thấy tài khoản", null)
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<String>> login(@RequestBody TaiKhoanDTO dto) {
        Optional<TaiKhoan> taiKhoan = taiKhoanService.findByUsername(dto.getTenTaiKhoan());
        if (taiKhoan.isPresent() && passwordEncoder.matches(dto.getMatKhau(), taiKhoan.get().getMatKhau())) {
            String token = jwtUtil.generateToken(dto.getTenTaiKhoan());
            return ResponseEntity.ok(
                    new ApiResponse<>(HttpStatus.OK.value(), "Đăng nhập thành công", token)
            );
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                new ApiResponse<>(HttpStatus.UNAUTHORIZED.value(), "Sai tài khoản hoặc mật khẩu", null)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TaiKhoan>> getTaiKhoan(@PathVariable String id) {
        if (id == null || id.trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), "ID không được để trống", null)
            );
        }

        Optional<TaiKhoan> taiKhoan = taiKhoanService.findById(id);
        return taiKhoan.map(tk -> ResponseEntity.ok(
                new ApiResponse<>(HttpStatus.OK.value(), "Lấy tài khoản thành công", tk)
        )).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ApiResponse<>(HttpStatus.NOT_FOUND.value(), "Không tìm thấy tài khoản", null)
        ));
    }

    @DeleteMapping("/delete/{id}")
    @Transactional
    public ResponseEntity<ApiResponse<Void>> deleteTaiKhoan(@PathVariable String id) {
        if (id == null || id.trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), "ID không được để trống", null)
            );
        }

        Optional<TaiKhoan> taiKhoan = taiKhoanService.findById(id);
        if (taiKhoan.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ApiResponse<>(HttpStatus.NOT_FOUND.value(), "Không tìm thấy tài khoản", null)
            );
        }

        taiKhoanService.deleteById(id);
        return ResponseEntity.ok(
                new ApiResponse<>(HttpStatus.OK.value(), "Xóa tài khoản thành công", null)
        );
    }
}

