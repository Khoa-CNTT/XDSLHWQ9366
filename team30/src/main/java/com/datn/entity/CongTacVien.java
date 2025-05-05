package com.datn.entity;/*
 * @project team30
 * @author Huy
 */

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "CONGTACVIENS")
@Getter
@Setter
public class CongTacVien {
    @Id
    private String maNhanVien;

}
