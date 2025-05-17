import * as XLSX from "xlsx";
import { format } from "date-fns";
import { Lecturer,  } from "../../components/Type/Types";

// Kiểm tra trình duyệt hỗ trợ File System API
const isFilePickerSupported = "showSaveFilePicker" in window;

export async function exportGiangVienToExcel(giangviens: Lecturer[]) {
  // Format lại dữ liệu
  const rows = giangviens.map((item) => ({
    "Mã Giảng Viên": item.maGiangVien,
    "Họ Tên": item.tenGiangVien,
    "Ngày Sinh": format(new Date(item.ngaySinh), "dd/MM/yyyy"),
    "Giới Tính": item.gioiTinh ? "Nam" : "Nữ",
    "Số CMND": item.soCMND,
    "Số Điện Thoại": item.soDienThoai,
    "Email": item.email,
    "Địa Chỉ": item.diaChi,
    "Cơ Quan Công Tác": item.coQuanCongTac,
    "Tình Trạng Công Tác": item.tinhTrangCongTac,
    "Lĩnh Vực": item.maLinhVuc || "",
    "Ghi Chú": item.ghiChu, }));

  const worksheet = XLSX.utils.aoa_to_sheet([]);

  XLSX.utils.sheet_add_aoa(worksheet, [["DANH SÁCH LIÊN HỆ"]], {
    origin: "A1",
  });

  XLSX.utils.sheet_add_json(worksheet, rows, {
    origin: "A3",
    skipHeader: false,
  });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "GiangVien");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // Nếu hỗ trợ chọn thư mục (File System API)
  if (isFilePickerSupported) {
    try {
      const handle = await (window as any).showSaveFilePicker({
        suggestedName: "DanhSachGiangVien.xlsx",
        types: [
          {
            description: "Excel file",
            accept: {
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                [".xlsx"],
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
    // Fallback: Dùng file-saver (tự động tải về thư mục Download)
    const { saveAs } = await import("file-saver");
    saveAs(blob, "DanhSachGiangVien.xlsx");
  }
}
