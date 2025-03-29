package com.datn.controller.admin;

import com.datn.dto.request.HocVienAddDTO;
import com.datn.dto.request.HocVienUpdateDTO;
import com.datn.dto.response.ApiResponse;
import com.datn.dto.response.PaginationResponse;
import com.datn.entity.HocVien;
import com.datn.exception.hocvien.HocVienNotFoundException;
import com.datn.service.HocVienService;
import com.datn.utils.ExcelExportService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/hocvien")
public class HocVienController {

    private static final String PATH_UPLOADS =
            "D:/DATN/Demo_DATN_2025/team30/src/main/java/com/datn/uploads";

    private final HocVienService hocVienService;

    private final ExcelExportService excelExportService;

    @Autowired
    public HocVienController(HocVienService hocVienService, ExcelExportService excelExportService) {
        this.hocVienService = hocVienService;
        this.excelExportService = excelExportService;
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

    @PutMapping("/update/{maHocVien}")
    public ResponseEntity<ApiResponse<HocVien>> update
            (@PathVariable(name = "maHocVien") String maHocVien,
             @Valid @RequestBody HocVienUpdateDTO hocVienUpdateDTO)  {
        HocVien hocVien = this.hocVienService.findById(maHocVien);
        if(hocVien == null) {
            throw new HocVienNotFoundException("Không tìm thấy giảng viên với mã - " + maHocVien);
        }
        hocVien.setTenHocVien(hocVienUpdateDTO.getTenHocVien());
        hocVien.setNgaySinh(hocVienUpdateDTO.getNgaySinh());
        hocVien.setGioiTinh(hocVienUpdateDTO.isGioiTinh());
        hocVien.setSoCMND(hocVienUpdateDTO.getSoCMND());
        hocVien.setSoDienThoai(hocVienUpdateDTO.getSoDienThoai());
        hocVien.setEmail(hocVienUpdateDTO.getEmail());
        hocVien.setDiaChi(hocVienUpdateDTO.getDiaChi());
        hocVien.setTinhTrangHocTap(hocVienUpdateDTO.getTinhTrangHocTap());
        hocVien.setNguoiNhapThongTin(hocVienUpdateDTO.getNguoiNhapThongTin());
        hocVien.setGhiChu(hocVienUpdateDTO.getGhiChu());

        HocVien updatedHocVien = this.hocVienService.update(hocVien);

        ApiResponse<HocVien> apiResponse = new ApiResponse<>
                (HttpStatus.OK.value(), "Cập nhật học viên thành công", updatedHocVien);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @DeleteMapping("/delete/{maHocVien}")
    public ResponseEntity<ApiResponse<Void>> delete
            (@PathVariable(name = "maHocVien")String maHocVien) {
        HocVien hocVien = this.hocVienService.findById(maHocVien);
        if (hocVien == null) {
            throw new HocVienNotFoundException("Không tìm thấy học viên với mã - " + maHocVien);
        }

        String filePath = hocVien.getUriHinhDaiDien();
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

        this.hocVienService.delete(maHocVien);

        ApiResponse<Void> apiResponse = new ApiResponse<>(
                HttpStatus.OK.value(), "Xóa học viên thành công", null);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("pagination")
    public ResponseEntity<ApiResponse<PaginationResponse<HocVien>>> pagination
            (@RequestParam(defaultValue = "1") int page,
             @RequestParam(defaultValue = "2") int size) {
        PaginationResponse<HocVien> paginationResponse = this.hocVienService.pagination(page, size);

        ApiResponse<PaginationResponse<HocVien>> apiResponse = new ApiResponse<>
                (HttpStatus.OK.value(), "Danh sách các học viên", paginationResponse);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/search/{tenHocVien}")
    public ResponseEntity<ApiResponse<List<HocVien>>> search
            (@PathVariable(name = "tenHocVien")String tenHocVien) {
        List<HocVien> hocViens = this.hocVienService.findByTenHocVien(tenHocVien);

        ApiResponse<List<HocVien>> apiResponse = new ApiResponse<>
                (HttpStatus.OK.value(), "Danh sách các học viên", hocViens);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/export")
    public ResponseEntity<byte[]> export() {
        List<HocVien> hocViens = this.hocVienService.findAll();
        ByteArrayInputStream in = this.excelExportService.exportHocViensToExcel(hocViens);

        byte[] bytes = in.readAllBytes();
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=giangviens.xlsx");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(bytes);
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
