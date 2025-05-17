import * as XLSX from "xlsx";
import { format } from "date-fns";
import { Employee } from "../../components/Type/Types";

// Kiểm tra trình duyệt hỗ trợ File System API
const isFilePickerSupported = "showSaveFilePicker" in window;

export async function exportNhanVienToExcel(nhanviens: Employee[]) {
  // Format lại dữ liệu
  const rows = nhanviens.map((item) => ({
    "Mã Nhân Viên": item.maNhanVien,
    "Tên Nhân Viên": item.tenNhanVien,
    "Ngày Sinh": item.dob ? format(new Date(item.dob), "dd/MM/yyyy") : "",
    "Giới Tính": item.gioiTinh,
    "CCCD": item.CCCD,
    "Số Điện Thoại": item.SDT,
    "Email": item.email,
    "Địa Chỉ": item.address,
    "Cơ Quan": item.coQuan,
    "Tình Trạng": item.tinhTrang,
    "Lĩnh Vực": item.linhVuc,
    "Ghi Chú": item.ghiChu,
  }));

  const worksheet = XLSX.utils.aoa_to_sheet([]);
  XLSX.utils.sheet_add_aoa(worksheet, [["DANH SÁCH NHÂN VIÊN"]], { origin: "A1" });
  XLSX.utils.sheet_add_json(worksheet, rows, { origin: "A3", skipHeader: false });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "NhanVien");

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
        suggestedName: "DanhSachNhanVien.xlsx",
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
    // Fallback: Dùng file-saver (tự động tải về thư mục Download)
    const { saveAs } = await import("file-saver");
    saveAs(blob, "DanhSachNhanVien.xlsx");
  }
}