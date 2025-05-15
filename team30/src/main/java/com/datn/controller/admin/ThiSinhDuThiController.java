package com.datn.controller.admin;

import com.datn.dto.request.ThiSinhDuThiAddDTO;
import com.datn.dto.request.ThiSinhDuThiUpdateDTO;
import com.datn.dto.response.ApiResponse;
import com.datn.dto.response.PaginationResponse;
import com.datn.entity.ThiSinhDuThi;
import com.datn.exception.base.NotFoundException;
import com.datn.service.ThiSinhDuThiService;
import jakarta.validation.Valid;
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
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/thisinh")
public class ThiSinhDuThiController {

    private static final String PATH_UPLOADS =
            "D:/DATN/Demo_DATN_2025/team30/src/main/java/com/datn/uploads";

    private final ThiSinhDuThiService thiSinhDuThiService;

    public ThiSinhDuThiController(ThiSinhDuThiService thiSinhDuThiService) {
        this.thiSinhDuThiService = thiSinhDuThiService;
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<ThiSinhDuThi>> add
            (@Valid @RequestBody ThiSinhDuThiAddDTO dto) {
        ThiSinhDuThi thiSinhDuThi = this.thiSinhDuThiService.add(dto);

        ApiResponse<ThiSinhDuThi> apiResponse = new ApiResponse<>
                (HttpStatus.CREATED.value(), "Thêm thí sinh dự thi thành công", thiSinhDuThi);

        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @GetMapping("/getById/{maThiSinh}")
    public ResponseEntity<ApiResponse<ThiSinhDuThi>> getById
            (@PathVariable(name = "maThiSinh")String maThiSinh) {
        ThiSinhDuThi thiSinhDuThi = this.thiSinhDuThiService.findById(maThiSinh);

        ApiResponse<ThiSinhDuThi> apiResponse = new ApiResponse<>
                (HttpStatus.OK.value(), "Lấy thông tin thí sinh thành công", thiSinhDuThi);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PutMapping("/update/{maThiSinh}")
    public ResponseEntity<ApiResponse<ThiSinhDuThi>> update
            (@PathVariable(name = "maThiSinh") String maThiSinh,
             @Valid @RequestBody ThiSinhDuThiUpdateDTO dto)  {
        ThiSinhDuThi thiSinhDuThi = this.thiSinhDuThiService.findById(maThiSinh);

        ApiResponse<ThiSinhDuThi> apiResponse = new ApiResponse<>
                (HttpStatus.OK.value(), "Cập nhật thí sinh dự thi thành công", thiSinhDuThi);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @DeleteMapping("/delete/{maThiSinh}")
    public ResponseEntity<ApiResponse<Void>> delete
            (@PathVariable(name = "maThiSinh")String maThiSinh) {
        ThiSinhDuThi thiSinhDuThi = this.thiSinhDuThiService.findById(maThiSinh);
        if(thiSinhDuThi == null) {
            throw new NotFoundException("Không tìm thấy thí sinh với mã - " + thiSinhDuThi.getMaThiSinhDuThi());
        }

        String filePath = thiSinhDuThi.getUrlHinhDaiDien();
        if (filePath != null && !filePath.isEmpty()) {
            File file = new File(PATH_UPLOADS, filePath.replace("/uploads/", ""));
            if (file.exists()) {
                if (file.delete()) {
                    System.out.println("Xóa ảnh đại diện thành công: " + file.getAbsolutePath());
                } else {
                    System.out.println("Không thể xóa ảnh đại diện: " + file.getAbsolutePath());
                }
            }
        }

        this.thiSinhDuThiService.delete(maThiSinh);

        ApiResponse<Void> apiResponse = new ApiResponse<>(
                HttpStatus.OK.value(), "Xóa thí sinh dự thi thành công", null);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("pagination")
    public ResponseEntity<ApiResponse<PaginationResponse<ThiSinhDuThi>>> pagination
            (@RequestParam(defaultValue = "1") int page,
             @RequestParam(defaultValue = "2") int size) {
        PaginationResponse<ThiSinhDuThi> paginationResponse =
                this.thiSinhDuThiService.pagination(page, size);

        ApiResponse<PaginationResponse<ThiSinhDuThi>> apiResponse = new ApiResponse<>
                (HttpStatus.OK.value(), "Danh sách các thí sinh dự thi", paginationResponse);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/search/{tenThiSinh}")
    public ResponseEntity<ApiResponse<List<ThiSinhDuThi>>> search
            (@PathVariable(name = "tenThiSinh")String tenThiSinh) {
        List<ThiSinhDuThi> thiSinhDuThis =
                this.thiSinhDuThiService.findByTenThiSinhDuThi(tenThiSinh);

        ApiResponse<List<ThiSinhDuThi>> apiResponse = new ApiResponse<>
                (HttpStatus.OK.value(), "Danh sách các thí sinh dự thi", thiSinhDuThis);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PostMapping("/upload-avatar/{maThiSinh}")
    public ResponseEntity<ApiResponse<String>> uploadAvatar(
            @PathVariable String maThiSinh, @RequestParam("file") MultipartFile file) {
        ThiSinhDuThi thiSinhDuThi = this.thiSinhDuThiService.findById(maThiSinh);
        if(thiSinhDuThi == null) {
            throw new NotFoundException("Không tìm thấy thí sinh với mã - " + thiSinhDuThi.getMaThiSinhDuThi());
        }

        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(HttpStatus.BAD_REQUEST.value(),
                            "File không hợp lệ", null));
        }

        try {
            String uploadDir = PATH_UPLOADS;

            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            String oldUrl = thiSinhDuThi.getUrlHinhDaiDien();
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
            thiSinhDuThi.setUrlHinhDaiDien(urlHinhDaiDien);
            this.thiSinhDuThiService.update(thiSinhDuThi);

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

    @GetMapping("/get-avatar/{maThiSinh}")
    public ResponseEntity<Resource> getAvatar(@PathVariable String maThiSinh) {
        ThiSinhDuThi thiSinhDuThi = this.thiSinhDuThiService.findById(maThiSinh);
        if(thiSinhDuThi == null) {
            throw new NotFoundException("Không tìm thấy thí sinh với mã - " + thiSinhDuThi.getMaThiSinhDuThi());
        }

        String uploadDir = PATH_UPLOADS;
        String filePath = thiSinhDuThi.getUrlHinhDaiDien();

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
