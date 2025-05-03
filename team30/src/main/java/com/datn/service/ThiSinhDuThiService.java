package com.datn.service;

import com.datn.dto.response.PaginationResponse;
import com.datn.entity.ThiSinhDuThi;

import java.util.List;

public interface ThiSinhDuThiService {

    ThiSinhDuThi add(ThiSinhDuThi thiSinhDuThi);

    ThiSinhDuThi update(String maThiSinhDuThi, ThiSinhDuThi thiSinhDuThi);

    void delete(String maThiSinhDuThi);

    PaginationResponse<ThiSinhDuThi> pagination(int pageNumber, int pageSize);

    List<ThiSinhDuThi> findByTenThiSinhDuThi(String tenThiSinhDuThi);

    ThiSinhDuThi findById(String maThiSinhDuThi);

}
