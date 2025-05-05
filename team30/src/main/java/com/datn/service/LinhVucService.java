package com.datn.service;

import com.datn.dto.request.LinhVucMergeDTO;
import com.datn.entity.LinhVuc;

import java.util.List;

public interface LinhVucService {

    List<LinhVuc> findAll();

    LinhVuc findById(String maLinhVuc);

    LinhVuc add(LinhVucMergeDTO linhVuc);

    LinhVuc update(String maLinhVuc, LinhVucMergeDTO dto);

    void delete(String maLinhVuc);


}
