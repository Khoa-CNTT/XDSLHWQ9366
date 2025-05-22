package com.datn.controller.auth;/*
 * @project team30
 * @author Huy
 */
import com.datn.entity.LopHoc;
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

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
        if(taiKhoan.getQuyenTruyCap() == null){
            taiKhoan.setQuyenTruyCap("HOCVIEN");
        }
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
    public ResponseEntity<ApiResponse<Map<String, String>>> login(@RequestBody TaiKhoanDTO dto) {
        // Kiểm tra dữ liệu đầu vào
        if (dto == null || dto.getTenTaiKhoan() == null || dto.getTenTaiKhoan().trim().isEmpty() ||
                dto.getMatKhau() == null || dto.getMatKhau().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), "Tên tài khoản và mật khẩu không được để trống", null)
            );
        }

        // Tìm tài khoản theo tên người dùng
        Optional<TaiKhoan> taiKhoan = taiKhoanService.findByUsername(dto.getTenTaiKhoan());
        if (taiKhoan.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ApiResponse<>(HttpStatus.UNAUTHORIZED.value(), "Tài khoản không tồn tại", null)
            );
        }

        // So sánh mật khẩu
        if (!passwordEncoder.matches(dto.getMatKhau(), taiKhoan.get().getMatKhau())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ApiResponse<>(HttpStatus.UNAUTHORIZED.value(), "Mật khẩu không đúng", null)
            );
        }

        // Tạo token và trả về cả token và maTaiKhoan
        String token = jwtUtil.generateToken(dto.getTenTaiKhoan());
        String maTaiKhoan = taiKhoan.get().getMaTaiKhoan();
        Map<String, String> data = new HashMap<>();
        data.put("token", token);
        data.put("maTaiKhoan", maTaiKhoan);

        return ResponseEntity.ok(
                new ApiResponse<>(HttpStatus.OK.value(), "Đăng nhập thành công", data)
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

    @GetMapping("/getAll")
    public ResponseEntity<ApiResponse<List<TaiKhoan>>> getAll() {
        try {
            List<TaiKhoan> taiKhoanList = taiKhoanService.getAllTaiKhoan();
            return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Lấy danh sách tài khoản thành công", taiKhoanList));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), "Lỗi: " + e.getMessage(), null));
        }
    }

}