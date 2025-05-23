package com.datn.service;/*
 * @project team30
 * @author Huy
 */

import com.datn.dto.request.PhieuThuAddDTO;
import com.datn.dto.request.PhieuThuUpdateDTO;
import com.datn.entity.PhieuThu;

import java.util.List;

public interface PhieuThuService {
     List<PhieuThu> getAllPhieuThu();
     PhieuThu createPhieuThu(PhieuThuAddDTO phieuThu);
     PhieuThu updatePhieuThu(String id, PhieuThuUpdateDTO phieuThu);
     void deletePhieuThu(String id);
}
