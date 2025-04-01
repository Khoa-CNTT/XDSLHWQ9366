package com.datn.service.impl;/*
 * @project team30
 * @author Huy
 */

import com.datn.dto.request.LichThiAddDTO;
import com.datn.dto.request.LichThiUpdateDTO;
import com.datn.entity.LichThi;
import com.datn.repository.LichThiRepo;
import com.datn.service.LichThiService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class LichThiServiceImpl implements LichThiService {

    private final LichThiRepo lichThiRepo;

    public LichThiServiceImpl(LichThiRepo lichThiRepo) {
        this.lichThiRepo = lichThiRepo;
    }

    @Override
    public LichThi add(LichThiAddDTO lichThiDTO) {
        return lichThiRepo.add(lichThiDTO);
    }

    @Override
    public LichThi update(String id, LichThiUpdateDTO lichThi) {
        return lichThiRepo.update(id, lichThi);
    }

    @Override
    public void delete(String id) {
        lichThiRepo.delete(id);
    }

    @Override
    public List<LichThi> search(String maLichThi, String tenChungChi) {
        return lichThiRepo.search(maLichThi, tenChungChi);
    }
}
