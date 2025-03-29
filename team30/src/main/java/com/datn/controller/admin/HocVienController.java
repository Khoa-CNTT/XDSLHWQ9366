package com.datn.controller.admin;

import com.datn.dto.request.HocVienAddDTO;
import com.datn.dto.response.ApiResponse;
import com.datn.entity.HocVien;
import com.datn.exception.hocvien.HocVienNotFoundException;
import com.datn.service.HocVienService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/hocvien")
public class HocVienController {

    private static final String PATH_UPLOADS =
            "D:/DATN/Demo_DATN_2025/team30/src/main/java/com/datn/uploads";

    private final HocVienService hocVienService;

    @Autowired
    public HocVienController(HocVienService hocVienService) {
        this.hocVienService = hocVienService;
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<HocVien>> add
            (@Valid @RequestBody HocVienAddDTO hocVienAddDTO) {
        HocVien hocVien = this.hocVienService.add(hocVienAddDTO);

        ApiResponse<HocVien> apiResponse = new ApiResponse<>
                (HttpStatus.CREATED.value(), "Thêm học viên thành công", hocVien);

        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @GetMapping("/getById/{maHocVien}")
    public ResponseEntity<ApiResponse<HocVien>> getById
            (@PathVariable(name = "maHocVien")String maHocVien) {
        HocVien hocVien = this.hocVienService.findById(maHocVien);

        ApiResponse<HocVien> apiResponse = new ApiResponse<>
                (HttpStatus.OK.value(), "Lấy thông tin học viên thành công", hocVien);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PostMapping("/upload-avatar/{maHocVien}")
    public ResponseEntity<ApiResponse<String>> uploadAvatar(
            @PathVariable String maHocVien, @RequestParam("file") MultipartFile file) {
        HocVien hocVien = this.hocVienService.findById(maHocVien);
        if (hocVien == null) {
            throw new HocVienNotFoundException("Không tìm thấy giảng viên với mã - " + maHocVien);
        }

        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), "File không hợp lệ", null));
        }

        try {
            String uploadDir = PATH_UPLOADS;

            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            String oldUrl = hocVien.getUriHinhDaiDien();
            if (oldUrl != null && !oldUrl.isEmpty()) {
                String oldFileName = oldUrl.replace("/uploads/", "");
                File oldFile = new File(uploadDir, oldFileName);
                if (oldFile.exists() && oldFile.delete()) {
                    System.out.println("Xóa ảnh cũ thành công: " + oldFile.getAbsolutePath());
                } else {
                    System.out.println("Không thể xóa ảnh cũ: " + oldFile.getAbsolutePath());
                }
            }

            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, fileName);

            file.transferTo(filePath.toFile());

            String urlHinhDaiDien = "/uploads/" + fileName;
            hocVien.setUriHinhDaiDien(urlHinhDaiDien);
            this.hocVienService.update(hocVien);

            return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(),
                    "Upload ảnh thành công", urlHinhDaiDien));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(),
                            "Lỗi khi lưu ảnh", null));
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/get-avatar/{maHocVien}")
    public ResponseEntity<Resource> getAvatar(@PathVariable String maHocVien) {
        HocVien hocVien = this.hocVienService.findById(maHocVien);
        if (hocVien == null) {
            throw new HocVienNotFoundException("Không tìm thấy giảng viên với mã - " + maHocVien);
        }

        String uploadDir = PATH_UPLOADS;
        String filePath = hocVien.getUriHinhDaiDien();

        if (filePath == null || filePath.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        File file = new File(uploadDir, filePath.replace("/uploads/", ""));
        if (!file.exists()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        try {
            Resource resource = new UrlResource(file.toURI());
            String contentType = null;
            try {
                contentType = Files.probeContentType(file.toPath());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(resource);
        } catch (MalformedURLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

}
