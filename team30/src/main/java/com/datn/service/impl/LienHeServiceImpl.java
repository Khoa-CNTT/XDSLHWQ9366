package com.datn.service.impl;/*
 * @project team30
 * @author Huy
 */

import com.datn.dto.request.LienHeAddDTO;
import com.datn.dto.request.LienHeUpdateDTO;
import com.datn.entity.LienHe;
import com.datn.repository.LienHeRepo;
import com.datn.service.LienHeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LienHeServiceImpl implements LienHeService {

    @Autowired
    private final LienHeRepo lienHeRepo;

    public LienHeServiceImpl(LienHeRepo lienHeRepo) {
        this.lienHeRepo = lienHeRepo;
    }

    @Override
    public List<LienHe> getAllContacts() {
        return lienHeRepo.findAll();
    }

    @Override
    public LienHe getContactById(String maKhach) {
        return lienHeRepo.findById(maKhach);
    }

    @Override
    public LienHe createContact(LienHeAddDTO lienHe) {
        return lienHeRepo.save(lienHe);
    }

    @Override
    public LienHe updateContact(String maKhach, LienHeUpdateDTO lienHe) {
        return lienHeRepo.update(maKhach, lienHe);
    }

    @Override
    public void deleteContact(String maKhach) {
        lienHeRepo.deleteById(maKhach);
    }

    @Override
    public LienHe saveContact(LienHe lienHe) {
        return lienHeRepo.save(lienHe);
    }

}
