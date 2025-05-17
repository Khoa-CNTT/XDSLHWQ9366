import * as XLSX from "xlsx";
import { format } from "date-fns";
import { LienHe } from "../../components/Type/Types";

// Kiểm tra trình duyệt hỗ trợ File System API
const isFilePickerSupported = "showSaveFilePicker" in window;

export async function exportLienHeToExcel(lienhes: LienHe[]) {
  // Format lại dữ liệu
  const rows = lienhes.map((item) => ({
    "Mã Khách": item.maKhach,
    "Họ Tên": item.hoTen,
    "Số Điện Thoại": item.soDienThoai,
    Email: item.email,
    "Ý Kiến": item.yKien,
    "Ngày Liên Hệ": format(new Date(item.ngayLienHe), "dd/MM/yyyy"),
  }));

  const worksheet = XLSX.utils.aoa_to_sheet([]);

  XLSX.utils.sheet_add_aoa(worksheet, [["DANH SÁCH LIÊN HỆ"]], {
    origin: "A1",
  });

  XLSX.utils.sheet_add_json(worksheet, rows, {
    origin: "A3",
    skipHeader: false,
  });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "LienHe");

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
        suggestedName: "DanhSachLienHe.xlsx",
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
    saveAs(blob, "DanhSachLienHe.xlsx");
  }
}
