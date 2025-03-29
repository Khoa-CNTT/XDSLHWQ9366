package com.datn.controller.admin;

import com.datn.dto.request.GiangVienAddDTO;
import com.datn.dto.request.GiangVienUpdateDTO;
import com.datn.dto.response.ApiResponse;
import com.datn.dto.response.PaginationResponse;
import com.datn.entity.GiangVien;
import com.datn.entity.LinhVuc;
import com.datn.exception.chucvu.LinhVucNotFoundException;
import com.datn.exception.giangvien.GiangVienNotFoundException;
import com.datn.service.GiangVienService;
import com.datn.service.LinhVucService;
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
@RequestMapping("/giangvien")
public class GiangVienController {

    private static final String PATH_UPLOADS =
            "D:/DATN/Demo_DATN_2025/team30/src/main/java/com/datn/uploads";

    private final GiangVienService giangVienService;
    private final LinhVucService linhVucService;

    private final ExcelExportService excelExportService;

    @Autowired
    public GiangVienController(GiangVienService giangVienService, LinhVucService linhVucService,
                               ExcelExportService excelExportService) {
        this.giangVienService = giangVienService;
        this.linhVucService = linhVucService;
        this.excelExportService = excelExportService;
    }

    @GetMapping("/getById/{maGiangVien}")
    public ResponseEntity<ApiResponse<GiangVien>> getById
            (@PathVariable(name = "maGiangVien")String maGiangVien) {
        GiangVien giangVien = this.giangVienService.findById(maGiangVien);
        ApiResponse<GiangVien> apiResponse = new ApiResponse<>
                (HttpStatus.OK.value(), "Lấy thông tin giảng viên thành công", giangVien);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<GiangVien>> add(@Valid @RequestBody GiangVienAddDTO giangVienAddDTO) {
        GiangVien giangVien = new GiangVien();
        giangVien.setTenGiangVien(giangVienAddDTO.getTenGiangVien());
        giangVien.setNgaySinh(giangVienAddDTO.getNgaySinh());
        giangVien.setGioiTinh(giangVienAddDTO.isGioiTinh());
        giangVien.setSoCMND(giangVienAddDTO.getSoCMND());
        giangVien.setSoDienThoai(giangVienAddDTO.getSoDienThoai());
        giangVien.setEmail(giangVienAddDTO.getEmail());
        giangVien.setDiaChi(giangVienAddDTO.getDiaChi());
        giangVien.setCoQuanCongTac(giangVienAddDTO.getCoQuanCongTac());
        giangVien.setTinhTrangCongTac(giangVienAddDTO.getTinhTrangCongTac());
        giangVien.setGhiChu(giangVienAddDTO.getGhiChu());
        giangVien.setUrlHinhDaiDien(giangVienAddDTO.getUrlHinhDaiDien());

        LinhVuc linhVuc = this.linhVucService.findById(giangVienAddDTO.getMaLinhVuc());
        if (linhVuc == null) {
            throw new LinhVucNotFoundException("Không tìm thấy lĩnh vực với mã " + giangVienAddDTO.getMaLinhVuc());
        }

        giangVien.setLinhVuc(linhVuc);

        GiangVien gvResponse = this.giangVienService.add(giangVien);
        ApiResponse<GiangVien> response = new ApiResponse<>(HttpStatus.CREATED.value(),
                "Thêm giảng viên thành công", gvResponse);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/update/{maGiangVien}")
    public ResponseEntity<ApiResponse<GiangVien>> update
            (@PathVariable(name = "maGiangVien") String maGiangVien,
             @Valid @RequestBody GiangVienUpdateDTO giangVienUpdateDTO) {
        GiangVien giangVien = this.giangVienService.findById(maGiangVien);
        giangVien.setTenGiangVien(giangVienUpdateDTO.getTenGiangVien());
        giangVien.setNgaySinh(giangVienUpdateDTO.getNgaySinh());
        giangVien.setGioiTinh(giangVienUpdateDTO.isGioiTinh());
        giangVien.setSoCMND(giangVienUpdateDTO.getSoCMND());
        giangVien.setSoDienThoai(giangVienUpdateDTO.getSoDienThoai());
        giangVien.setEmail(giangVienUpdateDTO.getEmail());
        giangVien.setDiaChi(giangVienUpdateDTO.getDiaChi());
        giangVien.setCoQuanCongTac(giangVienUpdateDTO.getCoQuanCongTac());
        giangVien.setTinhTrangCongTac(giangVienUpdateDTO.getTinhTrangCongTac());
        giangVien.setGhiChu(giangVienUpdateDTO.getGhiChu());

        LinhVuc linhVuc = this.linhVucService.findById(giangVienUpdateDTO.getMaLinhVuc());
        if (linhVuc == null) {
            throw new LinhVucNotFoundException("Không tìm thấy lĩnh vực với mã " +
                    giangVienUpdateDTO.getMaLinhVuc());
        }

        giangVien.setLinhVuc(linhVuc);

        GiangVien gvResponse = this.giangVienService.update(giangVien);
        ApiResponse<GiangVien> response = new ApiResponse<>(HttpStatus.OK.value(),
                "Cập nhật giảng viên thành công", gvResponse);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/delete/{maGiangVien}")
    public ResponseEntity<ApiResponse<Void>> delete
            (@PathVariable(name = "maGiangVien")String maGiangVien) {
        GiangVien giangVien = this.giangVienService.findById(maGiangVien);
        if (giangVien == null) {
            throw new GiangVienNotFoundException("Không tìm thấy giảng viên với mã - " + maGiangVien);
        }

        String filePath = giangVien.getUrlHinhDaiDien();
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
        this.giangVienService.delete(maGiangVien);
        ApiResponse<Void> apiResponse = new ApiResponse<>
                (HttpStatus.OK.value(), "Xóa giảng viên thành công", null);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/pagination")
    public ResponseEntity<ApiResponse<PaginationResponse<GiangVien>>> pagination
            (@RequestParam(defaultValue = "1") int page,
             @RequestParam(defaultValue = "2") int size) {
        PaginationResponse<GiangVien> paginationResponse = this.giangVienService.pagination(page, size);

        ApiResponse<PaginationResponse<GiangVien>> apiResponse = new ApiResponse<>
                (HttpStatus.OK.value(), "Danh sách các giảng viên", paginationResponse);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/search/{tenGiangVien}")
    public ResponseEntity<ApiResponse<List<GiangVien>>> search
            (@PathVariable(name = "tenGiangVien")String tenGiangVien) {
        List<GiangVien> giangViens = this.giangVienService.findByTenGiangVien(tenGiangVien);

        ApiResponse<List<GiangVien>> apiResponse = new ApiResponse<>
                (HttpStatus.OK.value(), "Danh sách các giảng viên", giangViens);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/export")
    public ResponseEntity<byte[]> export() {
        List<GiangVien> giangViens = this.giangVienService.findAll();
        ByteArrayInputStream in = this.excelExportService.exportGiangViensToExcel(giangViens);

        byte[] bytes = in.readAllBytes();
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=giangviens.xlsx");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(bytes);
    }

    @PostMapping("/upload-avatar/{maGiangVien}")
    public ResponseEntity<ApiResponse<String>> uploadAvatar(
            @PathVariable String maGiangVien, @RequestParam("file") MultipartFile file) {
        GiangVien giangVien = this.giangVienService.findById(maGiangVien);
        if (giangVien == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(HttpStatus.NOT_FOUND.value(), "Không tìm thấy giảng viên", null));
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

            String oldUrl = giangVien.getUrlHinhDaiDien();
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
            giangVien.setUrlHinhDaiDien(urlHinhDaiDien);
            this.giangVienService.update(giangVien);

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

    @GetMapping("/get-avatar/{maGiangVien}")
    public ResponseEntity<Resource> getAvatar(@PathVariable String maGiangVien) {
        GiangVien giangVien = this.giangVienService.findById(maGiangVien);
        if (giangVien == null) {
            throw new GiangVienNotFoundException("Không tìm thấy giảng viên với mã - " + maGiangVien);
        }

        String uploadDir = PATH_UPLOADS;
        String filePath = giangVien.getUrlHinhDaiDien();

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
