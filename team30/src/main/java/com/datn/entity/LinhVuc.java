package com.datn.entity;/*
 * @project team30
 * @author Huy
 */

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "LINHVUCS")
@Getter
@Setter
public class LinhVuc {
    @Id
    @Column(name = "MALINHVUC")
    private String maLinhVuc;

    @Column(name = "TENLINHVUC", columnDefinition = "VARCHAR(255)")
    private String tenLinhVuc;

    @OneToMany(mappedBy = "linhVuc", cascade = CascadeType.ALL)
    private List<LichThi> danhSachLichThi;
}