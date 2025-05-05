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
        Optional<TaiKhoan> taiKhoan = taiKhoanService.findByUsername(id);
        if (taiKhoan.isPresent()) {
            return ResponseEntity.ok(
                    new ApiResponse<>(HttpStatus.OK.value(), "Lấy tài khoản thành công", taiKhoan.get())
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ApiResponse<>(HttpStatus.NOT_FOUND.value(), "Không tìm thấy tài khoản", null)
        );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTaiKhoan(@PathVariable String id) {
        taiKhoanService.deleteById(id);
        return ResponseEntity.ok(
                new ApiResponse<>(HttpStatus.OK.value(), "Xóa tài khoản thành công", null)
        );
    }
}

