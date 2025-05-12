package com.datn.service.impl;

import com.datn.dto.request.ChucVuMergeDTO;
import com.datn.dto.response.PaginationResponse;
import com.datn.entity.ChucVu;
import com.datn.exception.chucvu.ChucVuNotFoundException;
import com.datn.repository.ChucVuRepo;
import com.datn.service.ChucVuService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class ChucVuServiceImpl implements ChucVuService {

    private final ChucVuRepo chucVuRepo;

    @Autowired
    public ChucVuServiceImpl(ChucVuRepo chucVuRepo) {
        this.chucVuRepo = chucVuRepo;
    }

    @Override
    public ChucVu findById(String maChucVu) {
        return this.chucVuRepo.findById(maChucVu);
    }

    @Override
    public ChucVu add(ChucVuMergeDTO dto) {
        this.chucVuRepo.checkChucVuExists(dto.getTenChucVu());

        ChucVu chucVu = new ChucVu();
        chucVu.setTenChucVu(dto.getTenChucVu());

        return this.chucVuRepo.add(chucVu);
    }

    @Override
    public ChucVu update(String maChucVu, ChucVuMergeDTO dto) {
        ChucVu chucVu = this.findById(maChucVu);
        if(chucVu == null) {
            throw new ChucVuNotFoundException("Không tìm thấy chức vụ với mã " + chucVu.getMaChucVu());
        }
        this.chucVuRepo.checkChucVuExists(dto.getTenChucVu());

        chucVu.setTenChucVu(dto.getTenChucVu());

        return this.chucVuRepo.update(chucVu);
    }

    @Override
    public void delete(String maChucVu) {
        this.chucVuRepo.delete(maChucVu);
    }

    @Override
    public PaginationResponse<ChucVu> pagination(int pageNumber, int pageSize) {
        if (pageNumber < 1 || pageSize < 1) {
            throw new IllegalArgumentException("Số trang và kích thước trang phải lớn hơn 0");
        }
        long totalElements = this.chucVuRepo.findAll().size();
        List<ChucVu> chucVus = this.chucVuRepo.pagination(pageNumber, pageSize);

        return new PaginationResponse<>(pageNumber, pageSize, totalElements, chucVus);
    }

    @Override
    public List<ChucVu> findAll() {
        return this.chucVuRepo.findAll();
    }

}
