import * as XLSX from "xlsx";
import { KhoaHoc } from "../../components/Type/Types";
const isFilePickerSupported = "showSaveFilePicker" in window;

export async function exportKhoaHocToExcel(khoahocs: KhoaHoc[]) {
  const rows = khoahocs.map((item) => ({
    "Mã Khoá Học": item.maKhoaHoc,
    "Tên Khoá Học": item.tenKhoaHoc,
    "Nội Dung": item.noiDung,
    "Học Phí": item.hocPhi,
    "Lĩnh Vực": item.maLinhVuc,
    "Số Buổi": item.soBuoi,
  }));

  const worksheet = XLSX.utils.aoa_to_sheet([]);
  XLSX.utils.sheet_add_aoa(worksheet, [["DANH SÁCH KHOÁ HỌC"]], { origin: "A1" });
  XLSX.utils.sheet_add_json(worksheet, rows, { origin: "A3", skipHeader: false });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "KhoaHoc");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  if (isFilePickerSupported) {
    try {
      const handle = await (window as any).showSaveFilePicker({
        suggestedName: "DanhSachKhoaHoc.xlsx",
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
    saveAs(blob, "DanhSachKhoaHoc.xlsx");
  }
}