import * as XLSX from "xlsx";
import { ChiTietLopHoc } from "../../components/Type/Types";
const isFilePickerSupported = "showSaveFilePicker" in window;

export async function exportCTLHToExcel(ctlhList: ChiTietLopHoc[]) {
  const rows = ctlhList.map((item) => ({
    "Mã CTLH": item.maCtlh,
    "Mã Học Viên": item.maHocVien,
    "Mã Lớp Học": item.maLopHoc,
    "Học Phí": item.hocPhi,
    "Miễn Giảm Học Phí": item.mienGiamHocPhi,
    "Số Tiền Thu": item.soTienThu,
    "Điểm": item.diem,
    "Ngày Cấp Chứng Chỉ": item.ngayCapChungChi,
    "Xếp Loại": item.xepLoai,
    "Điểm Danh": item.diemDanh,
    "Ghi Chú": item.ghiChu,
  }));

  const worksheet = XLSX.utils.aoa_to_sheet([]);
  XLSX.utils.sheet_add_aoa(worksheet, [["DANH SÁCH CHI TIẾT LỚP HỌC"]], { origin: "A1" });
  XLSX.utils.sheet_add_json(worksheet, rows, { origin: "A3", skipHeader: false });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "ChiTietLopHoc");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  if (isFilePickerSupported) {
    try {
      const handle = await (window as any).showSaveFilePicker({
        suggestedName: "DanhSachChiTietLopHoc.xlsx",
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
    saveAs(blob, "DanhSachChiTietLopHoc.xlsx");
  }
}