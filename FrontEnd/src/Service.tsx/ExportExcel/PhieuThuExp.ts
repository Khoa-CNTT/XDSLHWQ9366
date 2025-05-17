import * as XLSX from "xlsx";
import { PhieuThu } from "../../components/Type/Types";
const isFilePickerSupported = "showSaveFilePicker" in window;

export async function exportPhieuThuToExcel(phieuthus: PhieuThu[]) {
  const rows = phieuthus.map((item) => ({
    "Mã Phiếu Thu": item.maPhieuThu,
    "Nội Dung": item.noiDung,
    "Mã Nhân Viên": item.maNhanVien,
    "Người Nộp": item.nguoiNop,
    "Số Tiền": item.soTien,
    "Ngày Thu": item.ngayThu,
    "Địa Chỉ": item.diaChi,
  }));

  const worksheet = XLSX.utils.aoa_to_sheet([]);
  XLSX.utils.sheet_add_aoa(worksheet, [["DANH SÁCH PHIẾU THU"]], { origin: "A1" });
  XLSX.utils.sheet_add_json(worksheet, rows, { origin: "A3", skipHeader: false });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "PhieuThu");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  if (isFilePickerSupported) {
    try {
      const handle = await (window as any).showSaveFilePicker({
        suggestedName: "DanhSachPhieuThu.xlsx",
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
    saveAs(blob, "DanhSachPhieuThu.xlsx");
  }
}