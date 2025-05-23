package com.datn.repository;/*
 * @project team30
 * @author Huy
 */

import com.datn.entity.NhanVien;
import com.datn.entity.NhanVienKeToan;
import com.datn.repository.impl.NhanVienRepoImpl;

import java.util.List;
import java.util.Optional;

public interface NhanVienRepo {

    boolean add(NhanVien nhanVien);

    List<NhanVien> findAll();

    List<NhanVien> findAll(int pageNumber, int pageSize);

    NhanVien findById(String maNhanVien);

    NhanVienKeToan findByIdKT(String maNhanVien);

    List<NhanVien> findByTenNhanVien(String tenNhanVien);

    NhanVien update(NhanVien nhanVien);

    void delete(String maNhanVien);

    void checkSoCMNDExists(String soCMND);

    void checkSoDienThoaiExists(String soDienThoai);

    void checkEmailExists(String email);

}
