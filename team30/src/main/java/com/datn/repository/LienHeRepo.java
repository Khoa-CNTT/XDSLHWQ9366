package com.datn.repository;/*
 * @project team30
 * @author Huy
 */

import com.datn.dto.request.LienHeUpdateDTO;
import com.datn.entity.LienHe;

import java.util.List;

public interface LienHeRepo {

    LienHe update(String id, LienHeUpdateDTO lienHe);

    LienHe save(LienHe lienHe);

    LienHe findById(String id);
    List<LienHe> findAll();
    void deleteById(String id);

}
