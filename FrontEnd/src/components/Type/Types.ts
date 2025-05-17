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
  maLinhVuc: string;
  ghiChu: string;
  urlHinhDaiDien: string | null;
  };

  export interface LinhVuc {
    maLinhVuc: string;
    tenLinhVuc: string;
  };

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

  export interface LichThi{
    maLichThi: string;
    maLinhVuc: string;
    tenChungChi: string;
    ngayThi: string;
    thongTinChiTiet: string;
    lePhiThi: number;
  }

  export interface ThiSinh{
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

  export interface ChucVu  {
    maChucVu: string;
    tenChucVu: string;
    trangThai: string;
    };
    
  export interface PhieuThu  {
      maPhieuThu: string;
      noiDung: string;
      maNhanVien: string;
      nguoiNop: string;
      soTien: string;
      ngayThu: string;
      diaChi: string;
      };

  export interface PhieuChi  {
        maPhieuChi: string;
        noiDung: string;
        maNhanVien: string;
        nguoiNhan: string;
        soTien: string;
        ngayChi: string;
        diaChi: string;
        };

        export interface LienHe  {
          maKhach: string;
          hoTen: string;
          soDienThoai: string;
          email: string;
          yKien: string;
          ngayLienHe: string;
          };
  
  export interface BaiViet  {
          maBaiViet: string;
          tieuDe: string;
          luongTruyCap: string;
          trangThai: string;
          ngayDang: string;
          };

interface Window {
  showSaveFilePicker?: () => Promise<any>;
}
  export type SimpleCourse = Pick<Course, "maKhoaHoc" | "tenKhoaHoc">;
  export type SimpleRoom = Pick<Room, "maPhongHoc" | "tenPhongHoc">;
  export type SimpleLecturer = Pick<Lecturer, "maGiangVien" | "tenGiangVien">;
  export type SimpleEmployee = Pick<Employee, "maNhanVien" | "tenNhanVien">;
  
  