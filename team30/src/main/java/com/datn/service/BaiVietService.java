package com.datn.service;/*
 * @project team30
 * @author Huy
 */

import com.datn.entity.BaiViet;

import java.util.List;

public interface BaiVietService {
    List<BaiViet> getAllBaiViet();
    BaiViet getBaiVietById(String id);
    BaiViet createBaiViet(BaiVietAddDTO baiViet);
    BaiViet updateBaiViet(String id, BaiVietUpdateDTO baiViet);
    void deleteBaiViet(String id);
}
