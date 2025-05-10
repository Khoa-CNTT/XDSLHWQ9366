package com.datn.repository;/*
 * @project team30
 * @author Huy
 */

import com.datn.dto.request.BaiVietAddDTO;
import com.datn.dto.request.BaiVietUpdateDTO;
import com.datn.entity.BaiViet;

import java.util.List;

public interface BaiVietRepo {

     List<BaiViet> getAllBaiViet();
     BaiViet getBaiVietById(String id);
     BaiViet createBaiViet(BaiVietAddDTO baiViet);
     BaiViet updateBaiViet(String id, BaiVietUpdateDTO baiViet);
     void deleteBaiViet(String id);
}
