package com.datn.service.impl;

import com.datn.dto.request.LienHeAddDTO;
import com.datn.dto.request.LienHeUpdateDTO;
import com.datn.entity.LienHe;
import com.datn.repository.LienHeRepo;
import com.datn.service.LienHeService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LienHeServiceImpl implements LienHeService {

    @Autowired
    private LienHeRepo lienHeRepo;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<LienHe> getAllContacts() {
        return lienHeRepo.findAll();
    }

    @Override
    public LienHe getContactById(String maKhach) {
        return lienHeRepo.findById(maKhach);
    }

    @Override
    @Transactional
    public LienHe createContact(LienHeAddDTO lienHeAddDTO) {
        LienHe lienHe = new LienHe();
        String generatedMaKhach = (String) entityManager.createNativeQuery(
                "SELECT CONCAT('KH', LPAD(IFNULL(MAX(CAST(SUBSTRING(MAKHACH, 3, 3) AS UNSIGNED)), 0) + 1, 3, '0')) FROM LIENHES;"
        ).getSingleResult();

        lienHe.setMaKhach(generatedMaKhach);
        lienHe.setHoTen(lienHeAddDTO.getHoTen());
        lienHe.setEmail(lienHeAddDTO.getEmail());
        lienHe.setSoDienThoai(lienHeAddDTO.getSoDienThoai());
        lienHe.setyKien(lienHeAddDTO.getYKien());
        lienHe.setNgayLienHe(lienHeAddDTO.getNgayLienHe());
        return lienHeRepo.save(lienHe);
    }

    @Override
    @Transactional
    public LienHe updateContact(String maKhach, LienHeUpdateDTO lienHeUpdateDTO) {
        LienHe lienHe = lienHeRepo.findById(maKhach);
        if (lienHe != null) {
            lienHe.setHoTen(lienHeUpdateDTO.getHoTen());
            lienHe.setEmail(lienHeUpdateDTO.getEmail());
            lienHe.setSoDienThoai(lienHeUpdateDTO.getSoDienThoai());
            lienHe.setyKien(lienHeUpdateDTO.getYKien());
            lienHe.setNgayLienHe(lienHeUpdateDTO.getNgayLienHe());
            return lienHeRepo.save(lienHe);
        }
        return null;
    }

    @Override
    @Transactional
    public void deleteContact(String maKhach) {
        lienHeRepo.deleteById(maKhach);
    }

    @Override
    @Transactional
    public LienHe saveContact(LienHe lienHe) {
        return lienHeRepo.save(lienHe);
    }
}
