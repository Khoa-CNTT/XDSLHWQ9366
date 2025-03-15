package com.datn.exception;

import com.datn.dto.response.ApiResponse;
import com.datn.exception.chucvu.ChucVuNotFoundException;
import com.datn.exception.nhanvien.DuplicateNhanVienException;
import com.datn.exception.nhanvien.NhanVienNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DuplicateNhanVienException.class)
    public ResponseEntity<ApiResponse<Void>> handleDuplicateNhanVienException(DuplicateNhanVienException ex) {
        ApiResponse<Void> response = new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), ex.getMessage(), null);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler({NhanVienNotFoundException.class, ChucVuNotFoundException.class})
    public ResponseEntity<ApiResponse<Void>> handleNotFoundException(RuntimeException ex) {
        ApiResponse<Void> response = new ApiResponse<>(HttpStatus.NOT_FOUND.value(), ex.getMessage(), null);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleValidationException(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));

        ApiResponse<Map<String, String>> response = new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), "Dữ liệu không hợp lệ", errors);
        return ResponseEntity.badRequest().body(response);
    }

}
