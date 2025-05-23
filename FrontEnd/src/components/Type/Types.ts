export interface GiangVien {
  maGiangVien: string;
  tenGiangVien: string;
  ngaySinh: string;
  gioiTinh: boolean;
  soCMND: string;
  soDienThoai: string;
  email: string;
  diaChi: string;
  coQuanCongTac: string;
  tinhTrangCongTac: string;
  maLinhVuc: string;
  ghiChu: string;
  urlHinhDaiDien: string | null;
}

export interface LinhVuc {
  maLinhVuc: string;
  tenLinhVuc: string;
}

export interface KhoaHoc {
  maKhoaHoc: string;
  tenKhoaHoc: string;
  noiDung: string;
  hocPhi: number;
  maLinhVuc: string;
  soBuoi: number;
}

export interface NhanVien {
  maNhanVien: string;
  tenNhanVien: string;
  ngaySinh: string;
  gioiTinh: boolean;
  soCMND: string;
  soDienThoai: string;
  email: string;
  diaChi: string;
  chucVu: string;
  nguoiNhapThongTin: string;
  ghiChu: string;
}

export interface HocVien {
  maHocVien: string;
  tenHocVien: string;
  ngaySinh: string;
  gioiTinh: string;
  soCMND: string;
  soDienThoai: string;
  email: string;
  diaChi: string;
  coQuanCongTac: string;
  tinhTrangHocTap: string;
  nguoiNhapThongTin: string;
  ghiChu: string;
  urlHinhDaiDien: string | null;
  ngayCapNhatGanNhat: string;
}

export interface LopHoc {
  maLopHoc: string;
  tenLopHoc: string;
  lichHoc: string; // VD: "Thứ 2, 4, 6 - 18:00 đến 20:00"
  tinhTrang: string; // "Đang mở đăng ký", "Đã đầy", "Đã kết thúc"
  ngayBatDau: string;
  ngayKetThuc: string;
  thuLao: number;
  daThanhToan: string;
  maKhoaHoc: string;
  maPhongHoc: string;
  maGiangVien: string;
  maNhanVien: string;
  ghiChu: string;
}

export interface PhongHoc {
  maPhongHoc: string;
  tenPhongHoc: string;
  soChoNgoi: number;
  ghiChu: string;
}

export interface LichThi {
  maLichThi: string;
  maLinhVuc: string;
  tenChungChi: string;
  ngayThi: string;
  thongTinChiTiet: string;
  lePhiThi: number;
}

export interface ThiSinh {
  maThiSinhDuThi: string;
  tenThiSinhDuThi: string;
  ngaySinh: string;
  gioiTinh: string;
  soCMND: string;
  soDienThoai: string;
  email: string;
  diaChi: string;
  dienDangKy: string; //Diện đăng ký chỉ được là ONLINE hoặc TRUCTIEP"
  maLichThi: string; //  Đang học, Nghỉ học, Đã tốt nghiệp
  maPhongThi: string;
  diem: string;
  xepLoai: string;
  ngayCapChungChi: string;
  ghiChu: string;
  urlHinhDaiDien: string | null;
}

export interface ChucVu {
  maChucVu: string;
  tenChucVu: string;
  trangThai: string;
}

export interface PhieuThu {
  maPhieuThu: string;
  noiDung: string;
  maNhanVien: string;
  nguoiNop: string;
  soTien: string;
  ngayThu: string;
  diaChi: string;
}

export interface PhieuChi {
  maPhieuChi: string;
  noiDung: string;
  maNhanVien: string;
  nguoiNhan: string;
  soTien: string;
  ngayChi: string;
  diaChi: string;
}

export interface LienHe {
  maKhach: string;
  hoTen: string;
  soDienThoai: string;
  email: string;
  yKien: string;
  ngayLienHe: string;
}

export interface BaiViet {
  maBaiViet: string;
  tieuDe: string;
  uriHinhAnhMinhHoa: string;
  noiDungTomTat: string;
  noiDung: string;
  luongTruyCap: string;
  trangThai: string;
  ngayDang: string;
  menu: string;
  nhanVienId: string;
}

export interface TaiKhoan {
  maTaiKhoan: string;
  tenDangNhap: string;
  tenNguoiDung: string;
  matKhau: string;
  quyen: string;
  trangThai: string;
}

export interface ChiTietLopHoc {
  maCtlh: string;
  maHocVien: string;
  maLopHoc: string;
  hocPhi: string;
  mienGiamHocPhi: string;
  soTienThu: string;
  diem: string;
  ngayCapChungChi: string;
  xepLoai: string;
  diemDanh: string;
  ghiChu: string;
}
