import * as XLSX from "xlsx";
import { ThiSinh } from "../../components/Type/Types";
const isFilePickerSupported = "showSaveFilePicker" in window;

export async function exportThiSinhToExcel(thisinhs: ThiSinh[]) {
  const rows = thisinhs.map((item) => ({
    "Mã Thí Sinh": item.maThiSinhDuThi,
    "Tên Thí Sinh": item.tenThiSinhDuThi,
    "Ngày Sinh": item.ngaySinh,
    "Giới Tính": item.gioiTinh,
    "Số CMND": item.soCMND,
    "Số Điện Thoại": item.soDienThoai,
    "Email": item.email,
    "Địa Chỉ": item.diaChi,
    "Diện Đăng Ký": item.dienDangKy,
    "Mã Lịch Thi": item.maLichThi,
    "Mã Phòng Thi": item.maPhongThi,
    "Điểm": item.diem,
    "Xếp Loại": item.xepLoai,
    "Ngày Cấp Chứng Chỉ": item.ngayCapChungChi,
    "Ghi Chú": item.ghiChu,
  }));

  const worksheet = XLSX.utils.aoa_to_sheet([]);
  XLSX.utils.sheet_add_aoa(worksheet, [["DANH SÁCH THÍ SINH DỰ THI"]], { origin: "A1" });
  XLSX.utils.sheet_add_json(worksheet, rows, { origin: "A3", skipHeader: false });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "ThiSinh");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  if (isFilePickerSupported) {
    try {
      const handle = await (window as any).showSaveFilePicker({
        suggestedName: "DanhSachThiSinh.xlsx",
        types: [
          {
            description: "Excel file",
            accept: {
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
            },
          },
        ],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
    } catch (err) {
      console.error("Hủy lưu file hoặc bị lỗi", err);
    }
  } else {
    const { saveAs } = await import("file-saver");
    saveAs(blob, "DanhSachThiSinh.xlsx");
  }
}