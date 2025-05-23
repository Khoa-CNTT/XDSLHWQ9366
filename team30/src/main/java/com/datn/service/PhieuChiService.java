package com.datn.service;/*
 * @project team30
 * @author Huy
 */

import com.datn.dto.request.PhieuChiAddDTO;
import com.datn.dto.request.PhieuChiUpdateDTO;
import com.datn.entity.PhieuChi;

import java.util.List;

public interface PhieuChiService {

    List<PhieuChi> getAllPhieuChi();
    PhieuChi createPhieuChi(PhieuChiAddDTO phieuChi);
    PhieuChi updatePhieuChi(String id, PhieuChiUpdateDTO phieuChi);
    void deletePhieuChi(String id);

}
