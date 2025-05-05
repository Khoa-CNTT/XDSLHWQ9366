package com.datn.repository;



import com.datn.entity.ThiSinhDuThi;

import java.util.List;

public interface ThiSinhDuThiRepo {

    List<ThiSinhDuThi> findAll();

    List<ThiSinhDuThi> pagination(int pageNumber, int pageSize);

    ThiSinhDuThi findById(String maThiSinhDuThi);

    List<ThiSinhDuThi> findByTenThiSinhDuThi(String tenThiSinhDuThi);

    ThiSinhDuThi add(ThiSinhDuThi thiSinhDuThi);

    ThiSinhDuThi update(ThiSinhDuThi thiSinhDuThi);

    void delete(String maThiSinhDuThi);

}
