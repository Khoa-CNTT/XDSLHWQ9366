package com.datn.service.impl;

import com.datn.dto.request.ThiSinhDuThiAddDTO;
import com.datn.dto.request.ThiSinhDuThiUpdateDTO;
import com.datn.dto.response.PaginationResponse;
import com.datn.entity.ThiSinhDuThi;
import com.datn.repository.ThiSinhDuThiRepo;
import com.datn.service.ThiSinhDuThiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThiSinhDuThiServiceImpl implements ThiSinhDuThiService {

    private final ThiSinhDuThiRepo thiSinhDuThiRepo;

    // ĐỂ LÀM TIẾP CẦN LichThiRepo và PhongThiRepo

    @Autowired
    public ThiSinhDuThiServiceImpl(ThiSinhDuThiRepo thiSinhDuThiRepo) {
        this.thiSinhDuThiRepo = thiSinhDuThiRepo;
    }

    @Override
    public ThiSinhDuThi add(ThiSinhDuThiAddDTO thiSinhDuThiAddDTO) {
        return null;
    }

    @Override
    public ThiSinhDuThi update(String maThiSinhDuThi, ThiSinhDuThiUpdateDTO thiSinhDuThiUpdateDTO) {
        return null;
    }

    @Override
    public void delete(String maThiSinhDuThi) {

    }

    @Override
    public PaginationResponse<ThiSinhDuThi> pagination(int pageNumber, int pageSize) {
        return null;
    }

    @Override
    public List<ThiSinhDuThi> findByTenThiSinhDuThi(String tenThiSinhDuThi) {
        return List.of();
    }

    @Override
    public ThiSinhDuThi findById(String maThiSinhDuThi) {
        return null;
    }

}
