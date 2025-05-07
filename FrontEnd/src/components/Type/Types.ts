export interface Lecturer  {
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
  linhVuc?: LinhVuc | null;
  ghiChu: string;
  urlHinhDaiDien: string | null;
  };
  export interface LinhVuc {
    id: string;
    name: string;
  }
export interface Course  {
  maKhoaHoc: string;
  tenKhoaHoc: string;
  noidung: string;
  fee: string;
  linhVuc: string;
  sobuoi: number;
};

export interface Employee {
  maNhanVien: string;
  tenNhanVien: string;
  dob: string;
  gioiTinh: string;
  CCCD: string;
  SDT: string;
  email: string;
  address: string;
  coQuan: string;
  tinhTrang: string;
  linhVuc: string;
  ghiChu: string;
};

export interface Student  {
  maHocVien: string;
  tenHocVien: string;
  ngaySinh: string;
  gioiTinh: string;
  soCMND: string;
  soDienThoai: string;
  email: string;
  diaChi: string;
  coQuanCongTac: string;
  tinhTrangHocTap: string; //  Đang học, Nghỉ học, Đã tốt nghiệp
  nguoiNhapThongTin: string;
  ghiChu: string;
  urlHinhDaiDien: string | null;
  ngayCapNhatGanNhat: string;
  };

  export interface Class {
    maLopHoc: string;
    tenLopHoc: string;
    lichHoc: string; // VD: "Thứ 2, 4, 6 - 18:00 đến 20:00"
    tinhTrang: string; // "Đang mở đăng ký", "Đã đầy", "Đã kết thúc"
    ngayBatDau: string;
    ngayKetThuc: string;
    thuLao: number;
    daThanhToan: string;
    khoaHoc: SimpleCourse[]; // Chỉ chứa id và name
    phongHoc: SimpleRoom[]; // Chỉ chứa id và name
    giangVien: SimpleLecturer[]; // Chỉ chứa id và name
    nhanVien: SimpleEmployee[]; // Chỉ chứa id và name
    ghiChu: string;
  }

export interface Room  {
  maPhongHoc: string;
  tenPhongHoc: string;
  soChoNgoi: number;
  ghiChu: string;
  };

  export type SimpleCourse = Pick<Course, "maKhoaHoc" | "tenKhoaHoc">;
  export type SimpleRoom = Pick<Room, "maPhongHoc" | "tenPhongHoc">;
  export type SimpleLecturer = Pick<Lecturer, "maGiangVien" | "tenGiangVien">;
  export type SimpleEmployee = Pick<Employee, "maNhanVien" | "tenNhanVien">;
  
  