package com.datn.exception;

import com.datn.dto.response.ApiResponse;
import com.datn.exception.base.NotFoundException;
import com.datn.exception.chucvu.ChucVuNotFoundException;
import com.datn.exception.chucvu.DuplicateChucVuException;
import com.datn.exception.chucvu.LinhVucNotFoundException;
import com.datn.exception.giangvien.DuplicateGiangVienException;
import com.datn.exception.giangvien.GiangVienNotFoundException;
import com.datn.exception.hocvien.DuplicateHocVienException;
import com.datn.exception.hocvien.HocVienNotFoundException;
import com.datn.exception.khoahoc.KhoaHocNotFoundException;
import com.datn.exception.linhvuc.DuplicateLinhVucException;
import com.datn.exception.lophoc.DuplicateLopHocException;
import com.datn.exception.lophoc.InvalidLopHocException;
import com.datn.exception.lophoc.LopHocNotFoundException;
import com.datn.exception.nhanvien.DuplicateNhanVienException;
import com.datn.exception.nhanvien.NhanVienNotFoundException;
import com.datn.exception.phonghoc.DuplicatePhongHocException;
import com.datn.exception.phonghoc.PhongHocNotFoundException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class HighPriorityExceptionHandler {

    @ExceptionHandler({DuplicateNhanVienException.class, DuplicateGiangVienException.class,
            DuplicatePhongHocException.class, InvalidLopHocException.class,
            DuplicateLopHocException.class, DuplicateHocVienException.class,
            DuplicateLinhVucException.class, DuplicateChucVuException.class})
    public ResponseEntity<ApiResponse<Void>> handleDuplicateNhanVienException(RuntimeException ex) {
        ApiResponse<Void> response = new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), ex.getMessage(), null);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler({NhanVienNotFoundException.class, ChucVuNotFoundException.class,
            LinhVucNotFoundException.class, PhongHocNotFoundException.class,
            KhoaHocNotFoundException.class, com.datn.exception.linhvuc.LinhVucNotFoundException.class,
            GiangVienNotFoundException.class, LopHocNotFoundException.class,
            HocVienNotFoundException.class, ChucVuNotFoundException.class,
            NotFoundException.class}
    )
    public ResponseEntity<ApiResponse<Void>> handleNotFoundException(RuntimeException ex) {
        ApiResponse<Void> response = new ApiResponse<>(HttpStatus.NOT_FOUND.value(), ex.getMessage(), null);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

}
