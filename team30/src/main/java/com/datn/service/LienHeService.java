package com.datn.service;/*
 * @project team30
 * @author Huy
 */

import com.datn.dto.request.LienHeAddDTO;
import com.datn.dto.request.LienHeUpdateDTO;
import com.datn.entity.LienHe;

import java.util.List;

public interface LienHeService {

    List<LienHe> getAllContacts();
    LienHe getContactById(String maKhach);
    LienHe createContact(LienHeAddDTO lienHe);
    LienHe updateContact(String maKhach, LienHeUpdateDTO lienHe);
    void deleteContact(String maKhach);

    LienHe saveContact(LienHe lienHe);
}

