package com.datn.entity;/*
 * @project team30
 * @author Huy
 */

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "LIENHES")
@Getter
@Setter
public class LienHe {
    @Id
    private String maKhach;

    private String hoTen;
    private String email;
    private String soDienThoai;

    @Lob
    private String yKien;

    private LocalDate ngayLienHe;

}