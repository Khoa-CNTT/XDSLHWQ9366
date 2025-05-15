package com.datn.controller.admin;/*
 * @project team30
 * @author Huy
 */

import com.datn.dto.request.LienHeAddDTO;
import com.datn.dto.request.LienHeUpdateDTO;
import com.datn.entity.LienHe;
import com.datn.service.LienHeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lienhe")
public class LienHeController {

    @Autowired
    private LienHeService lienHeService;

    @GetMapping
    public ResponseEntity<List<LienHe>> getAllContacts() {
        return ResponseEntity.ok(lienHeService.getAllContacts());
    }

    @GetMapping("/{maKhach}")
    public ResponseEntity<LienHe> getContactById(@PathVariable String maKhach) {
        LienHe lienHe = lienHeService.getContactById(maKhach);
        if (lienHe == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(lienHe);
    }

    @PostMapping
    public ResponseEntity<LienHe> createContact(@RequestBody LienHeAddDTO lienHe) {
        return ResponseEntity.ok(lienHeService.createContact(lienHe));
    }

    @PutMapping("/{maKhach}")
    public ResponseEntity<LienHe> updateContact(@PathVariable String maKhach, @RequestBody LienHeUpdateDTO lienHeDetails) {
        LienHe lienHe = lienHeService.getContactById(maKhach);
        if (lienHe == null) {
            return ResponseEntity.notFound().build();
        }

        lienHe.setHoTen(lienHeDetails.getHoTen());
        lienHe.setEmail(lienHeDetails.getEmail());
        lienHe.setSoDienThoai(lienHeDetails.getSoDienThoai());
        lienHe.setyKien(lienHeDetails.getYKien());
        lienHe.setNgayLienHe(lienHeDetails.getNgayLienHe());

        return ResponseEntity.ok(lienHeService.saveContact(lienHe));
    }

    @DeleteMapping("/{maKhach}")
    public ResponseEntity<Void> deleteContact(@PathVariable String maKhach) {
        lienHeService.deleteContact(maKhach);
        return ResponseEntity.noContent().build();
    }

}
