package com.datn.service.impl;/*
 * @project team30
 * @author Huy
 */

import com.datn.dto.request.BaiVietAddDTO;
import com.datn.dto.request.BaiVietUpdateDTO;
import com.datn.entity.BaiViet;
import com.datn.repository.BaiVietRepo;
import com.datn.service.BaiVietService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BaiVietServiceImpl implements BaiVietService {

    private final BaiVietRepo baiVietRepo;

    public BaiVietServiceImpl(BaiVietRepo baiVietRepo) {
        this.baiVietRepo = baiVietRepo;
    }

    @Override
    public List<BaiViet> getAllBaiViet() {
        return baiVietRepo.getAllBaiViet();
    }

    @Override
    public BaiViet getBaiVietById(String id) {
        return baiVietRepo.getBaiVietById(id);
    }

    @Override
    public BaiViet createBaiViet(BaiVietAddDTO baiViet) {
        return baiVietRepo.createBaiViet(baiViet);    }

    @Override
    public BaiViet updateBaiViet(String id, BaiVietUpdateDTO baiViet) {
        return baiVietRepo.updateBaiViet(id, baiViet);
    }

    @Override
    public void deleteBaiViet(String id) {
        baiVietRepo.deleteBaiViet(id);
    }
}
