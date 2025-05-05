package com.datn.service.impl;

import com.datn.dto.request.LinhVucMergeDTO;
import com.datn.dto.response.PaginationResponse;
import com.datn.entity.LinhVuc;
import com.datn.exception.linhvuc.LinhVucNotFoundException;
import com.datn.repository.LinhVucRepo;
import com.datn.service.LinhVucService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class LinhVucServiceImpl implements LinhVucService {

    private final LinhVucRepo linhVucRepo;

    @Autowired
    public LinhVucServiceImpl(LinhVucRepo linhVucRepo) {
        this.linhVucRepo = linhVucRepo;
    }

    @Override
    public List<LinhVuc> findAll() {
        return this.linhVucRepo.findAll();
    }

    @Override
    public LinhVuc findById(String maLinhVuc) {
        LinhVuc linhVuc = this.findById(maLinhVuc);

        return linhVuc;
    }

    @Override
    public LinhVuc add(LinhVucMergeDTO dto) {
        this.linhVucRepo.checkLinhVucExists(dto.getTenLinhVuc());

        LinhVuc linhVuc = new LinhVuc();
        linhVuc.setTenLinhVuc(dto.getTenLinhVuc());

        return this.linhVucRepo.add(linhVuc);
    }

    @Override
    public LinhVuc update(String maLinhVuc, LinhVucMergeDTO dto) {
        LinhVuc linhVuc = this.findById(maLinhVuc);
        if(linhVuc == null) {
            throw new LinhVucNotFoundException("Không tìm thấy lĩnh vực với mã " + linhVuc.getMaLinhVuc());
        }
        this.linhVucRepo.checkLinhVucExists(dto.getTenLinhVuc());

        linhVuc.setTenLinhVuc(dto.getTenLinhVuc());

        return this.linhVucRepo.update(linhVuc);
    }

    @Override
    public void delete(String maLinhVuc) {
        this.linhVucRepo.delete(maLinhVuc);
    }

    @Override
    public PaginationResponse<LinhVuc> pagination(int pageNumber, int pageSize) {
        if (pageNumber < 1 || pageSize < 1) {
            throw new IllegalArgumentException("Số trang và kích thước trang phải lớn hơn 0");
        }
        long totalElements = this.linhVucRepo.findAll().size();
        List<LinhVuc> linhVucs = this.linhVucRepo.pagination(pageNumber, pageSize);

        return new PaginationResponse<>(pageNumber, pageSize, totalElements, linhVucs);
    }

}
