export type Lecturer = {
  maGiangVien: string;
  tenGiangVien: string;
  ngaySinh: string;
  gioiTinh: string;
  soCMND: string;
  soDienThoai: string;
  email: string;
  diaChi: string;
  coQuanCongTac: string;
  tinhTrangCongTac: string;
  linhVuc: linhVuc;
    ghiChu: string;
    urlHinhDaiDien: string | null;
  };
  export interface linhVuc {
    id: string;
    name: string;
  }
export type Course = {
  id: string;
  name: string;
  noidung: string;
  fee: string;
  linhVuc: string;
  sobuoi: number;
};

export type Employee = {
  id: string;
  name: string;
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