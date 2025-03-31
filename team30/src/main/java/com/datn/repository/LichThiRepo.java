package com.datn.repository;/*
 * @project team30
 * @author Huy
 */


import com.datn.dto.request.LichThiAddDTO;
import com.datn.entity.LichThi;

import java.util.List;

public interface LichThiRepo {

    LichThi add(LichThiAddDTO lichThi);

    LichThi update(String id, LichThiAddDTO lichThi);

    void delete(String id);

    List<LichThi> search(String maLichThi, String tenChungChi);
}
