package com.datn.service;

import com.datn.dto.request.PhongHocAddDTO;
import com.datn.dto.request.PhongHocUpdateDTO;
import com.datn.dto.response.PaginationResponse;
import com.datn.entity.PhongHoc;

import java.util.List;

public interface PhongHocService {

    PhongHoc add(PhongHocAddDTO phongHocAddDTO);

    PhongHoc update(String maPhongHoc, PhongHocUpdateDTO phongHocUpdateDTO);

    void delete(String maPhongHoc);

    PaginationResponse<PhongHoc> pagination(int pageNumber, int pageSize);

}
