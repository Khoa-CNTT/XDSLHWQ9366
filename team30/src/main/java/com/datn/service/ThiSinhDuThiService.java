package com.datn.service;

import com.datn.dto.request.ThiSinhDuThiAddDTO;
import com.datn.dto.request.ThiSinhDuThiUpdateDTO;
import com.datn.dto.response.PaginationResponse;
import com.datn.entity.ChiTietLopHoc;
import com.datn.entity.ThiSinhDuThi;

import java.util.List;

public interface ThiSinhDuThiService {

    ThiSinhDuThi add(ThiSinhDuThiAddDTO thiSinhDuThiAddDTO);

    ThiSinhDuThi update(String maThiSinhDuThi, ThiSinhDuThiUpdateDTO dto);

    ThiSinhDuThi update(ThiSinhDuThi thiSinhDuThi);

    void delete(String maThiSinhDuThi);

    PaginationResponse<ThiSinhDuThi> pagination(int pageNumber, int pageSize);

    List<ThiSinhDuThi> findByTenThiSinhDuThi(String tenThiSinhDuThi);

    ThiSinhDuThi findById(String maThiSinhDuThi);
    List<ThiSinhDuThi> getAllThiSinhDuThi();

}
