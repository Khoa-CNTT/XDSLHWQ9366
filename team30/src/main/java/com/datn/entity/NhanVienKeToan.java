package com.datn.entity;/*
 * @project team30
 * @author Huy
 */

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "NHANVIENKETOANS")
@Getter
@Setter
public class NhanVienKeToan {
    @Id
    private String maNhanVien;

}
