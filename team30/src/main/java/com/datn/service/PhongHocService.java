package com.datn.service;

import com.datn.dto.request.PhongHocAddDTO;
import com.datn.dto.request.PhongHocUpdateDTO;
import com.datn.entity.PhongHoc;

public interface PhongHocService {

    PhongHoc add(PhongHocAddDTO phongHocAddDTO);

    PhongHoc update(String maPhongHoc, PhongHocUpdateDTO phongHocUpdateDTO);

}
