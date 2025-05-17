import * as XLSX from "xlsx";
import { PhieuChi } from "../../components/Type/Types";
const isFilePickerSupported = "showSaveFilePicker" in window;

export async function exportPhieuChiToExcel(phieuchis: PhieuChi[]) {
  const rows = phieuchis.map((item) => ({
    "Mã Phiếu Chi": item.maPhieuChi,
    "Nội Dung": item.noiDung,
    "Mã Nhân Viên": item.maNhanVien,
    "Người Nhận": item.nguoiNhan,
    "Số Tiền": item.soTien,
    "Ngày Chi": item.ngayChi,
    "Địa Chỉ": item.diaChi,
  }));

  const worksheet = XLSX.utils.aoa_to_sheet([]);
  XLSX.utils.sheet_add_aoa(worksheet, [["DANH SÁCH PHIẾU CHI"]], { origin: "A1" });
  XLSX.utils.sheet_add_json(worksheet, rows, { origin: "A3", skipHeader: false });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "PhieuChi");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  if (isFilePickerSupported) {
    try {
      const handle = await (window as any).showSaveFilePicker({
        suggestedName: "DanhSachPhieuChi.xlsx",
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
    saveAs(blob, "DanhSachPhieuChi.xlsx");
  }
}