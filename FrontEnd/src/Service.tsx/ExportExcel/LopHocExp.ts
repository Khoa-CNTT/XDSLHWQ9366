import * as XLSX from "xlsx";
import { LopHoc } from "../../components/Type/Types";
const isFilePickerSupported = "showSaveFilePicker" in window;

export async function exportLopHocToExcel(classes: LopHoc[]) {
  const rows = classes.map((item) => ({
    "Mã Lớp Học": item.maLopHoc,
    "Tên Lớp Học": item.tenLopHoc,
    "Lịch Học": item.lichHoc,
    "Tình Trạng": item.tinhTrang,
    "Ngày Bắt Đầu": item.ngayBatDau,
    "Ngày Kết Thúc": item.ngayKetThuc,
    "Thù Lao": item.thuLao,
    "Đã Thanh Toán": item.daThanhToan,
    "Ghi Chú": item.ghiChu,
  }));

  const worksheet = XLSX.utils.aoa_to_sheet([]);
  XLSX.utils.sheet_add_aoa(worksheet, [["DANH SÁCH LỚP HỌC"]], { origin: "A1" });
  XLSX.utils.sheet_add_json(worksheet, rows, { origin: "A3", skipHeader: false });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "LopHoc");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  if (isFilePickerSupported) {
    try {
      const handle = await (window as any).showSaveFilePicker({
        suggestedName: "DanhSachLopHoc.xlsx",
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
    saveAs(blob, "DanhSachLopHoc.xlsx");
  }
}